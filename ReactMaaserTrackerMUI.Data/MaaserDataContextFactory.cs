using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI.Data
{
    public class MaaserDataContextFactory : IDesignTimeDbContextFactory<MaaserDataContext>
    {
        public MaaserDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
              .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(),
              $"..{Path.DirectorySeparatorChar}ReactMaaserTrackerMUI.Web"))
              .AddJsonFile("appsettings.json")
              .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new MaaserDataContext(config.GetConnectionString("ConStr"));
        }
    }
}
