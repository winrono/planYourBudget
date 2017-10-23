using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using PlanYourBudgetApi.Data;
using PlanYourBudgetApi.Models;
using PlanYourBudgetApi.Models.Enums;
using PlanYourBudgetApi.Models.Internal;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AuthorizationController : Controller
    {
        private readonly IUserRepository _userRepository;
        public AuthorizationController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        public JsonResult Login([FromBody] LoginUser user)
        {
            var dbUser = _userRepository.GetUser(user);
            JsonResult response = null;

            if (dbUser == null)
            {
                Response.StatusCode = 400;
                response = new JsonResult("Invalid username or password.");
            }
            else
            {
                response = new JsonResult(GetUserInfo(dbUser));
            }

            return response;
        }

        [HttpPost]
        public JsonResult Register([FromBody] RegisteringUser registeringUser)
        {
            User registeredUser = null;
            var result = _userRepository.Register(registeringUser, ref registeredUser);

            JsonResult response = null;

            switch (result)
            {
                case RegistrationResult.Registered:
                    var userInfo = GetUserInfo(registeredUser);
                    response = new JsonResult(userInfo);
                    break;
                case RegistrationResult.UserExists:
                    Response.StatusCode = 500;
                    response = new JsonResult("User already exists");
                    break;
            }

            return response;
        }

        private ClaimsIdentity GetIdentity(User user)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.UUID)
                };
            ClaimsIdentity claimsIdentity =
            new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }

        private object GetUserInfo(User user)
        {
            var identity = GetIdentity(user);

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    expires: now.AddMonths(1),
                    claims: identity.Claims,
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var userInfo = new
            {
                token = encodedJwt,
                user = new
                {
                    uuid = identity.Name,
                    budget = user.Budget,
                    fullName = user.FullName,
                    family = user.Family
                }
            };

            return userInfo;
        }
    }
}
