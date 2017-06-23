using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PlanYourBudgetApi.Migrations
{
    public partial class user_expense : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UUID",
                table: "Expences",
                newName: "UserUUID");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Expences",
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "UserUUID",
                table: "Expences",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Expences_UserUUID",
                table: "Expences",
                column: "UserUUID");

            migrationBuilder.AddForeignKey(
                name: "FK_Expences_Users_UserUUID",
                table: "Expences",
                column: "UserUUID",
                principalTable: "Users",
                principalColumn: "UUID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expences_Users_UserUUID",
                table: "Expences");

            migrationBuilder.DropIndex(
                name: "IX_Expences_UserUUID",
                table: "Expences");

            migrationBuilder.RenameColumn(
                name: "UserUUID",
                table: "Expences",
                newName: "UUID");

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Expences",
                nullable: false);

            migrationBuilder.AlterColumn<string>(
                name: "UUID",
                table: "Expences",
                nullable: true);
        }
    }
}
