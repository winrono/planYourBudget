﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlanYourBudgetApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PlanYourBudgetApi.Data
{
    public class ExpenseRepository : IExpenseRepository
    {
        private BudgetContext _db;
        public ExpenseRepository(BudgetContext db)
        {
            _db = db;
        }

        private IEnumerable<User> Users
        {
            get
            {
                return _db.Users.Include(x => x.Expenses);
            }
        }

        public IEnumerable<Expense> GetUserExpenses(string UUID)
        {
            var user = Users.SingleOrDefault(x => x.UUID == UUID);
            if (user != null)
            {
                return user.Expenses;
            }
            else
            {
                return null;
            }
        }

        public int AddExpense(Expense expense)
        {
            _db.Expences.Add(expense);
            _db.SaveChanges();

            return expense.ExpenseId;
        }

        public bool DeleteExpense(int expenseId)
        {
            var expense = GetExpenseById(expenseId);
            if (expense != null)
            {
                _db.Expences.Remove(expense);
                _db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool DeleteExpenses(int[] expenseIds)
        {
            var expenses = _db.Expences.Where(x => expenseIds.Contains(x.ExpenseId));
            _db.Expences.RemoveRange(expenses);
            _db.SaveChanges();
            return true;
        }

        public void UpdateExpense(Expense expense)
        {
            _db.Expences.Attach(expense);
            _db.Entry(expense).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _db.Entry(expense).Property(x => x.UUID).IsModified = false;
            _db.SaveChanges();
        }

        private Expense GetExpenseById(int id)
        {
            var expense = _db.Expences.SingleOrDefault(x => x.ExpenseId == id);
            return expense;
        }
    }
}
