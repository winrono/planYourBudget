using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PlanYourBudgetApi.Migrations
{
    public partial class expense_uuid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expences_Users_UserUUID",
                table: "Expences");

            migrationBuilder.RenameColumn(
                name: "UserUUID",
                table: "Expences",
                newName: "UUID");

            migrationBuilder.RenameIndex(
                name: "IX_Expences_UserUUID",
                table: "Expences",
                newName: "IX_Expences_UUID");

            migrationBuilder.AddForeignKey(
                name: "FK_Expences_Users_UUID",
                table: "Expences",
                column: "UUID",
                principalTable: "Users",
                principalColumn: "UUID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expences_Users_UUID",
                table: "Expences");

            migrationBuilder.RenameColumn(
                name: "UUID",
                table: "Expences",
                newName: "UserUUID");

            migrationBuilder.RenameIndex(
                name: "IX_Expences_UUID",
                table: "Expences",
                newName: "IX_Expences_UserUUID");

            migrationBuilder.AddForeignKey(
                name: "FK_Expences_Users_UserUUID",
                table: "Expences",
                column: "UserUUID",
                principalTable: "Users",
                principalColumn: "UUID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
