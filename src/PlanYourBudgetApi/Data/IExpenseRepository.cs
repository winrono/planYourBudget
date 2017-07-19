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
        int AddExpense(Expense expense);
        bool DeleteExpense(int expenseId);

        bool DeleteExpenses(int[] expenseIds);
        void UpdateExpense(Expense expense);
    }
}
