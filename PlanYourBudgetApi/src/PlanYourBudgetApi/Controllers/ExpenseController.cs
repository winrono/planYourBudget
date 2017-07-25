using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanYourBudgetApi.Data;
using PlanYourBudgetApi.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PlanYourBudgetApi.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ExpenseController : Controller
    {
        private IExpenseRepository _expenseRepository;
        public ExpenseController(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetUserExpenses(string UUID)
        {
            return new JsonResult(_expenseRepository.GetUserExpenses(UUID));
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddExpense([FromBody] Expense expense)
        {
            var expenseId = _expenseRepository.AddExpense(expense);
            return Ok(expenseId);
        }

        [Authorize]
        [HttpDelete]
        public IActionResult DeleteExpense(int id)
        {
            var isDeleted = _expenseRepository.DeleteExpense(id);
            if (isDeleted)
            {
                return Ok();
            }
            else
            {
                return StatusCode(304);
            }
        }

        [Authorize]
        [HttpDelete]
        public IActionResult DeleteExpenses([FromBody] int[] ids)
        {
            var isDeleted = _expenseRepository.DeleteExpenses(ids);
            if (isDeleted)
            {
                return Ok();
            }
            else
            {
                return StatusCode(304);
            }
        }

        [Authorize]
        [HttpPut]
        public IActionResult UpdateExpense([FromBody] Expense expense)
        {
            _expenseRepository.UpdateExpense(expense);

            return Ok();
        }

    }
}
