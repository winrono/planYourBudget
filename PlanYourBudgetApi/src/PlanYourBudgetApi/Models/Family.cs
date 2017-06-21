using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Models
{
    public class Family
    {
        public int FamilyId { get; set; }
        public IEnumerable<User> FamilyMembers { get; set; }
        [Column(TypeName = "Money")]
        public double Budget { get; set; }
        [ForeignKey("CurrencyCode")]
        public string CurrencyCode { get; set; }
        public virtual Currency Currency { get; set; }
    }
}
