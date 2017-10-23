using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Models.Internal
{
    public class RegisteredUser : RegisteringUser
    {
        public Family Family { get; set; }
        public decimal Budget { get; set; }
    }
}
