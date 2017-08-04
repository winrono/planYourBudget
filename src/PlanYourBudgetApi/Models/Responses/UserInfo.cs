using PlanYourBudgetApi.Models.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Models.Responses
{
    public class UserInfo
    {
        public string Token { get; set; }
        public RegisteredUser User { get; set; }
    }
}
