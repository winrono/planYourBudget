using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PlanYourBudgetApi.Models;

namespace PlanYourBudgetApi.Data
{
    public class BudgetContext : DbContext
    {
        public BudgetContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
        }

        public DbSet<Family> Families { get; set; }
        public DbSet<Expense> Expences { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
