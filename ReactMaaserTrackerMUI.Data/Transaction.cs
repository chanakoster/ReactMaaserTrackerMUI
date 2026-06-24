using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class Transaction
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Memo { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public int AccountId { get; set; }


        public Account Account { get; set; }
    }
}
