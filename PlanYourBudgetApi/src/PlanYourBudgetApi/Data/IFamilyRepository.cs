using PlanYourBudgetApi.Models;
using PlanYourBudgetApi.Models.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Data
{
    public interface IFamilyRepository
    {
        void AddFamilyMember(FamilyUserId familyUserId);
        void RemoveFamilyMember(FamilyUserId familyUserId);
        void SetBudget(FamilyMoneyModel familyMoneyModel);
        Family GetFamilyByUUID(string UUID);
        IEnumerable<UserExpense> GetFamilyExpenses(int familyId);
    }
}
