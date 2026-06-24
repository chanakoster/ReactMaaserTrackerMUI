using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactMaaserTrackerMUI.Data
{
    public class AccountRepository
    {
        private string _connectionString;

        public AccountRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddAccount(Account account)
        {
            var context = new MaaserDataContext(_connectionString);
            context.Accounts.Add(account);
            context.SaveChanges();
        }

        public void DeleteAccount(Account account)
        {
            var context = new MaaserDataContext(_connectionString);
            context.Accounts.Remove(account);
            context.SaveChanges();
        }

        public void UpdateAccount(Account account)
        {
            var context = new MaaserDataContext(_connectionString);
            context.Accounts.Update(account);
            context.SaveChanges();
        }

        public List<Account> GetAllAccounts()
        {
            var context = new MaaserDataContext(_connectionString);
            return context.Accounts.ToList();
        }

        public List<AccountWithTransactions> GetAccountsWithTransactions()
        {
            var context = new MaaserDataContext(_connectionString);

            return context.Accounts
                .Include(a => a.Transactions)
                .Select(a => new AccountWithTransactions
                {
                    Id = a.Id,
                    Name = a.Name,
                    Transactions = a.Transactions.ToList()
                })
                .ToList();
        }

        public List<AccountWithTransactions> GetAccountsWithTransactionsByType(string type)
        {
            var context = new MaaserDataContext(_connectionString);

            return context.Accounts
                .Select(a => new AccountWithTransactions
                {
                    Id = a.Id,
                    Name = a.Name,
                    Transactions = a.Transactions
                        .Where(t => t.Type == type.ToLower())
                        .ToList()
                })
                .ToList();
        }
    }
}
