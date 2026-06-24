using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI.Data;
using ReactMaaserTrackerMUI.Web.Models;

namespace ReactMaaserTrackerMUI.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        //test
        private string _connectionString;

        public TransactionController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet("getallincome")]
        public IActionResult GetAllIncomeTransactions()
        {
            Console.WriteLine("geting income");
            var repo = new TransactionRepository(_connectionString);
            foreach (var tr in repo.GetAllTransactionsByType("income"))
            {
                Console.WriteLine(tr.Account.Name);
            }
            return Ok(repo.GetAllTransactionsByType("income"));
        }

        [HttpGet("getallmaaser")]
        public IActionResult GetAllMaaserTransactions()
        {
            var repo = new TransactionRepository(_connectionString);
            return Ok(repo.GetAllTransactionsByType("maaser"));
        }

        [HttpPost("addincome")]
        public IActionResult AddIncome(Transaction transaction)
        {
            Console.WriteLine("adding income");
            transaction.Type = "income";
            var repo = new TransactionRepository(_connectionString);
            repo.AddTransaction(transaction);
            return Ok();
        }

        [HttpPost("addmaaser")]
        public IActionResult AddMaaser(Transaction transaction)
        {
            transaction.Type = "maaser";
            var repo = new TransactionRepository(_connectionString);
            repo.AddTransaction(transaction);
            return Ok();
        }

        [HttpGet("gettotals")]
        public IActionResult GetTotals()
        {
            Console.WriteLine("heyyy");
            var repo = new TransactionRepository(_connectionString);
            var totals = new TotalsViewModel
            {
                totalIncome = repo.GetTotalByType("income"),
                totalMaaser = repo.GetTotalByType("maaser")
            };
            return Ok(totals);
        }

    }
}
