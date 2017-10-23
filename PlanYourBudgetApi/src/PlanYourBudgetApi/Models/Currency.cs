using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PlanYourBudgetApi.Models
{
    public class Currency
    {
        [Key]
        [Required, StringLength(3)]
        [Display(Name = "Currency code")]
        public string CurrencyCode { get; set; }

        [Required, StringLength(100)]
        [Display(Name = "Currency name")]
        public string CurrencyName { get; set; }

        [StringLength(5)]
        public string Symbol { get; set; }
    }
}
