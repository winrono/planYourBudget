using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanYourBudgetApi.Models;
using PlanYourBudgetApi.Data;
using PlanYourBudgetApi.Models.Internal;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace PlanYourBudgetApi.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult FindUsers(string searchTerm)
        {
            return new JsonResult(_userRepository.FindUsers(searchTerm));
        }

        [HttpPost]
        public IActionResult SetBudget([FromBody]UserBudget userBudget)
        {
            _userRepository.SetBudget(userBudget);
            return Ok();
        }
    }
}
