
namespace ReactMaaserTrackerMUI.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllersWithViews();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseStaticFiles();
            if (app.Environment.IsDevelopment())
            {
                var psi = new System.Diagnostics.ProcessStartInfo
                {
                    FileName = "npm",
                    Arguments = "run dev",
                    WorkingDirectory = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp"),
                    UseShellExecute = true
                };

                var spaProcess = System.Diagnostics.Process.Start(psi);
                app.Lifetime.ApplicationStopping.Register(() =>
                {
                    if (spaProcess is { HasExited: false })
                    {
                        spaProcess.Kill(true);
                    }
                });
            }
            app.UseRouting();


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}