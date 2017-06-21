using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using PlanYourBudgetApi.Data;

namespace PlanYourBudgetApi.Migrations
{
    [DbContext(typeof(BudgetContext))]
    partial class BudgetContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PlanYourBudgetApi.Models.Currency", b =>
                {
                    b.Property<string>("CurrencyCode")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("MaxLength", 3);

                    b.Property<string>("CurrencyName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 100);

                    b.Property<string>("Symbol")
                        .HasAnnotation("MaxLength", 5);

                    b.HasKey("CurrencyCode");

                    b.ToTable("Currency");
                });

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

                    b.Property<double>("Budget")
                        .HasColumnType("Money");

                    b.Property<string>("CurrencyCode");

                    b.HasKey("FamilyId");

                    b.HasIndex("CurrencyCode");

                    b.ToTable("Families");
                });

            modelBuilder.Entity("PlanYourBudgetApi.Models.User", b =>
                {
                    b.Property<string>("UUID")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Budget")
                        .HasColumnType("Money");

                    b.Property<int?>("FamilyId");

                    b.Property<string>("FullName");

                    b.Property<string>("Password");

                    b.HasKey("UUID");

                    b.HasIndex("FamilyId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PlanYourBudgetApi.Models.Family", b =>
                {
                    b.HasOne("PlanYourBudgetApi.Models.Currency", "Currency")
                        .WithMany()
                        .HasForeignKey("CurrencyCode");
                });

            modelBuilder.Entity("PlanYourBudgetApi.Models.User", b =>
                {
                    b.HasOne("PlanYourBudgetApi.Models.Family", "Family")
                        .WithMany("FamilyMembers")
                        .HasForeignKey("FamilyId");
                });
        }
    }
}
