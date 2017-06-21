using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PlanYourBudgetApi.Migrations
{
    public partial class budget : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrencyCode",
                table: "Families",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Currency",
                columns: table => new
                {
                    CurrencyCode = table.Column<string>(maxLength: 3, nullable: false),
                    CurrencyName = table.Column<string>(maxLength: 100, nullable: false),
                    Symbol = table.Column<string>(maxLength: 5, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currency", x => x.CurrencyCode);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Families_CurrencyCode",
                table: "Families",
                column: "CurrencyCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Families_Currency_CurrencyCode",
                table: "Families",
                column: "CurrencyCode",
                principalTable: "Currency",
                principalColumn: "CurrencyCode",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Families_Currency_CurrencyCode",
                table: "Families");

            migrationBuilder.DropTable(
                name: "Currency");

            migrationBuilder.DropIndex(
                name: "IX_Families_CurrencyCode",
                table: "Families");

            migrationBuilder.DropColumn(
                name: "CurrencyCode",
                table: "Families");
        }
    }
}
