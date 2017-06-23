using PlanYourBudgetApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Data
{
    public interface IExpenseRepository
    {
        IEnumerable<Expense> GetUserExpenses(string UUID);
        void AddExpense(Expense expense);
        bool DeleteExpense(int expenseId);
        void UpdateExpense(Expense expense);
    }
}
