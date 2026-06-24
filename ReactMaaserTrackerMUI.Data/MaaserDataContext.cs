using Microsoft.EntityFrameworkCore;
using System;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserDataContext : DbContext
    {
        private readonly string _connectionString;

        public MaaserDataContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Account> Accounts { get; set; }
    }
}
