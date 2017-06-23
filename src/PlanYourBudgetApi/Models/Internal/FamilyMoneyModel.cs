using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Models.Internal
{
    public class FamilyMoneyModel
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string CurrencyCode { get; set; }
    }
}
