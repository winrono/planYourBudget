using Microsoft.EntityFrameworkCore;
using PlanYourBudgetApi.Models;
using PlanYourBudgetApi.Models.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Data
{
    public class FamilyRepository : IFamilyRepository
    {
        private BudgetContext _db;
        public FamilyRepository(BudgetContext db)
        {
            _db = db;
        }

        public void AddFamilyMember(FamilyUserId familyUserId)
        {
            var user = _db.Users.Find(familyUserId.UUID);
            if (user != null)
            {
                user.FamilyId = familyUserId.Id;
                _db.SaveChanges();
            }
        }

        public IEnumerable<UserExpense> GetFamilyExpenses(int id)
        {
            var users = _db.Users.Include(x => x.Expenses).Where(x => x.FamilyId == id);

            var grouped = new List<UserExpense>();

            foreach (var user in users)
            {
                grouped.Add(new UserExpense()
                {
                    UUID = user.UUID,
                    MoneySpent = user.Expenses.Select(x => x.Price).Sum()
                });
            }
            return grouped;
        }

        public Family GetFamilyByUUID(string UUID)
        {
            var user = GetUserByUUID(UUID);
            var family = _db.Families.Include(x => x.Currency).SingleOrDefault(x => x.FamilyId == user.FamilyId);
            return family;
        }

        public void RemoveFamilyMember(FamilyUserId familyUserId)
        {
            var user = GetUserByUUID(familyUserId.UUID);
            if (user.FamilyId == familyUserId.Id)
            {
                user.Family = null;
                _db.SaveChanges();
            }
        }

        public void SetBudget(FamilyMoneyModel familyMoneyModel)
        {
            var family = _db.Families.Find(familyMoneyModel.Id);
            family.Budget = familyMoneyModel.Amount;
            family.CurrencyCode = familyMoneyModel.CurrencyCode;
            _db.SaveChanges();
        }

        private User GetUserByUUID(string UUID)
        {
            return _db.Users.Include(x => x.Family).SingleOrDefault(x => x.UUID == UUID);
        }
    }
}