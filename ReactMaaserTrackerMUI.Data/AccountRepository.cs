using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
