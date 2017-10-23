using PlanYourBudgetApi.Models;
using PlanYourBudgetApi.Models.Enums;
using PlanYourBudgetApi.Models.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Data
{
    public interface IUserRepository
    {
        User GetUser(LoginUser user);
        IEnumerable<FoundUser> FindUsers(string searchTerm);
        RegistrationResult Register(RegisteringUser registeringUser, ref User user);
        void SetBudget(UserBudget userBudget);
    }
}
