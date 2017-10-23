using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Models.Internal
{
    public class RegisteringUser
    {
        public string UUID { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
    }
}
