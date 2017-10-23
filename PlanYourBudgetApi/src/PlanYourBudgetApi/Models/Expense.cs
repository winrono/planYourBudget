using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Models
{
    public class Expense
    {
        [Key]
        public int ExpenseId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }

        [ForeignKey("UUID")]
        public string UUID { get; set; }
        public DateTime? CreatedDateTime { get; set; }
    }
}
