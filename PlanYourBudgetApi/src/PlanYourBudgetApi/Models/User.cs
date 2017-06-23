using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Models
{
    public class User
    {
        //user unique id aka 
        [Key]
        public string UUID { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public int? FamilyId { get; set; }
        public virtual Family Family { get; set; }
    
        [Column(TypeName = "Money")]
        public decimal Budget { get; set; }

        public virtual IEnumerable<Expense> Expenses { get; set; }
    }
}
