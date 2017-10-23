using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using PlanYourBudgetApi.Data;

namespace PlanYourBudgetApi.Migrations
{
    [DbContext(typeof(BudgetContext))]
    [Migration("20170621144225_unite_firstname_secondname")]
    partial class unite_firstname_secondname
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PlanYourBudgetApi.Models.Expense", b =>
                {
                    b.Property<int>("ExpenseId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<double>("Price");

                    b.Property<string>("UUID");

                    b.HasKey("ExpenseId");

                    b.ToTable("Expences");
                });

            modelBuilder.Entity("PlanYourBudgetApi.Models.Family", b =>
                {
                    b.Property<int>("FamilyId")
                        .ValueGeneratedOnAdd();

                    b.HasKey("FamilyId");

                    b.ToTable("Families");
                });

            modelBuilder.Entity("PlanYourBudgetApi.Models.User", b =>
                {
                    b.Property<string>("UUID")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("FamilyId");

                    b.Property<string>("FullName");

                    b.Property<string>("Password");

                    b.HasKey("UUID");

                    b.HasIndex("FamilyId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PlanYourBudgetApi.Models.User", b =>
                {
                    b.HasOne("PlanYourBudgetApi.Models.Family")
                        .WithMany("FamilyMembers")
                        .HasForeignKey("FamilyId");
                });
        }
    }
}
