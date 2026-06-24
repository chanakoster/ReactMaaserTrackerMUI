using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class TransactionRepository
    {
        private string _connectionString;

        public TransactionRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddTransaction(Transaction transaction)
        {
            var context = new MaaserDataContext(_connectionString);
            context.Transactions.Add(transaction);
            context.SaveChanges();
        }

        public List<Transaction> GetAllTransactionsByType(string type)
        {
            var context = new MaaserDataContext(_connectionString);
            return context.Transactions.Where(t => t.Type == type).Include(t => t.Account).ToList();
        }

        public decimal GetTotalByType(string type)
        {
            var context = new MaaserDataContext(_connectionString);
            return context.Transactions.Where(t => t.Type == type).Sum(trans => trans.Amount);
        }

        public void DeleteTransactionsForAccount(int accountId)
        {
            var context = new MaaserDataContext(_connectionString);
            var transactions = context.Transactions .Where(t => t.AccountId == accountId);
            context.Transactions.RemoveRange(transactions);
            context.SaveChanges();
        }
    }
}
