using PlanYourBudgetApi.Models;
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
        bool Register(RegisteringUser user);
        void SetBudget(UserBudget userBudget);
    }
}
