using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PlanYourBudgetApi.Migrations
{
    public partial class adding_budget : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Budget",
                table: "Users",
                type: "Money",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<double>(
                name: "Budget",
                table: "Families",
                type: "Money",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Budget",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Budget",
                table: "Families");
        }
    }
}
