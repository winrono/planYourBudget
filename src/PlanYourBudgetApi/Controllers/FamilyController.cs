﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanYourBudgetApi.Data;
using PlanYourBudgetApi.Models.Internal;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PlanYourBudgetApi.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class FamilyController : Controller
    {
        private readonly IFamilyRepository _familyRepository;
        public FamilyController(IFamilyRepository familyRepository)
        {
            _familyRepository = familyRepository;
        }

        [HttpPost]
        public IActionResult AddFamilyMember([FromBody] FamilyUserId familyUserId)
        {
            _familyRepository.AddFamilyMember(familyUserId);

            return Ok();
        }

        [HttpGet]
        public IActionResult GetFamilyExpenses(int id)
        {
            var result = _familyRepository.GetFamilyExpenses(id);
            return new JsonResult(result);
        }

        [HttpGet]
        public IActionResult GetFamilyByUUID(string UUID)
        {
            return new JsonResult(_familyRepository.GetFamilyByUUID(UUID));
        }

        [HttpPost]
        public IActionResult RemoveFamilyMember([FromBody] FamilyUserId familyUserId)
        {
            _familyRepository.RemoveFamilyMember(familyUserId);

            return Ok();
        }

        [HttpPut]
        public IActionResult SetBudget([FromBody] FamilyMoneyModel familyMoneyModel)
        {
            _familyRepository.SetBudget(familyMoneyModel);

            return Ok();
        }
    }
}
