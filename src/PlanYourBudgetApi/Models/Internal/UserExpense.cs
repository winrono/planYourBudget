using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Models.Internal
{
    public class UserExpense
    {
        public string UUID { get; set; }
        public decimal MoneySpent { get; set; }
    }
}
