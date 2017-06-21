using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanYourBudgetApi.Models;
using PlanYourBudgetApi.Data;
using PlanYourBudgetApi.Models.Internal;

namespace PlanYourBudgetApi.Controllers
{
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
        public IActionResult Login([FromBody] LoginUser user)
        {
            var result = _userRepository.GetUser(user);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Register([FromBody] User user)
        {
            var isRegistered = _userRepository.Register(user);
            if (isRegistered)
            {
                return Ok();
            }
            else
            {
                return StatusCode(304);
            }
        }

        [HttpPost]
        public IActionResult SetBudget([FromBody]UserBudget userBudget)
        {
            _userRepository.SetBudget(userBudget);
            return Ok();
        }
    }
}
