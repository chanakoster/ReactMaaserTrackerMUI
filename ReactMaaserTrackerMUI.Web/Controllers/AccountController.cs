using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;
using ReactMaaserTrackerMUI.Web.Models;

namespace ReactMaaserTrackerMUI.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _connectionString;

        public AccountController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost("addaccount")]
        public IActionResult AddAccount(Account account)
        {
            var repo = new AccountRepository(_connectionString);
            repo.AddAccount(account);
            return Ok();
        }

        [HttpPost("updateaccount")]
        public IActionResult UpdateAccount(Account account)
        {
            var repo = new AccountRepository(_connectionString);
            repo.UpdateAccount(account);
            return Ok();
        }

        [HttpPost("deleteaccount")]
        public IActionResult DeleteAccount(Account account)
        {
            Console.WriteLine(account.Id);
            var transactionRepo = new TransactionRepository(_connectionString);
            transactionRepo.DeleteTransactionsForAccount(account.Id);
            var repo = new AccountRepository(_connectionString);
            repo.DeleteAccount(account);
            return Ok();
        }

        [HttpGet("getallaccounts")]
        public IActionResult GetAllAccounts()
        {
            var repo = new AccountRepository(_connectionString);
            return Ok(repo.GetAllAccounts());
        }

        [HttpGet("getaccountswithtransactions")]
        public IActionResult GetAllAccountsWithTransactions()
        {
            var repo = new AccountRepository(_connectionString);
            return Ok(repo.GetAccountsWithTransactions());
        }

        [HttpPost("addincome")]
        public IActionResult AddIncome(Transaction transaction)
        {
            transaction.Type = "income";
            var repo = new TransactionRepository(_connectionString);
            repo.AddTransaction(transaction);
            return Ok();
        }

        [HttpGet("getaccountswithtransactionsbytype")]
        public IActionResult GetAccountsWithTransactionsByType(string type)
        {
            var repo = new AccountRepository(_connectionString);
            return Ok(repo.GetAccountsWithTransactionsByType(type));
        }
    }
}
