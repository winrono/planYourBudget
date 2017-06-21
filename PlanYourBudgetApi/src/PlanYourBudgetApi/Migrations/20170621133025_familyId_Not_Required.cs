using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PlanYourBudgetApi.Migrations
{
    public partial class familyId_Not_Required : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Families_FamilyId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "FamilyId",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Families_FamilyId",
                table: "Users",
                column: "FamilyId",
                principalTable: "Families",
                principalColumn: "FamilyId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Families_FamilyId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "FamilyId",
                table: "Users",
                nullable: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Families_FamilyId",
                table: "Users",
                column: "FamilyId",
                principalTable: "Families",
                principalColumn: "FamilyId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
