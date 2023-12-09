using System;
using API.Features.Nationalities;
using API.Implementations;
using API.Infrastructure.Classes;
using API.Infrastructure.Extensions;
using API.Infrastructure.Middleware;
using API.Interfaces;
using API.Models;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

// dotnet watch run --environment LocalDevelopment | ProductionLive | ProductionDemo
// dotnet publish /p:Configuration=Release /p:EnvironmentName=ProductionDemo | ProductionLive

namespace API {

    public class Startup {

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment environment) {
            Configuration = configuration;
            Environment = environment;
        }

        public void ConfigureLocalDevelopmentServices(IServiceCollection services) {
            services.AddDbContextFactory<AppDbContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("LocalDevelopment"), new MySqlServerVersion(new Version(8, 0, 19)), builder => {
                    builder.EnableStringComparisonTranslations();
                }));
            ConfigureServices(services);
        }

        public void ConfigureProductionLiveServices(IServiceCollection services) {
            services.AddDbContextFactory<AppDbContext>(options => options.UseMySql(Configuration.GetConnectionString("ProductionLive"), new MySqlServerVersion(new Version(8, 0, 19)), builder =>
                builder.EnableStringComparisonTranslations()));
            ConfigureServices(services);
        }

        public void ConfigureProductionDemoServices(IServiceCollection services) {
            services.AddDbContextFactory<AppDbContext>(options => options.UseMySql(Configuration.GetConnectionString("ProductionDemo"), new MySqlServerVersion(new Version(8, 0, 19)), builder => {
                builder.EnableStringComparisonTranslations();
            }));
            ConfigureServices(services);
        }

        public void ConfigureServices(IServiceCollection services) {
            Cors.AddCors(services);
            services.AddTransient<IDestinationRepository, DestinationRepository>();
            services.AddTransient<IGenderRepository, GenderRepository>();
            services.AddTransient<INationalityRepository, NationalityRepository>();
            services.AddTransient<ICheckInReadRepository, CheckInReadRepository>();
            services.AddTransient<ICheckInReservationValidation, CheckInReservationValidation>();
            services.AddTransient<ICheckInUpdateRepository, CheckInUpdateRepository>();
            services.AddTransient<ICheckInEmailSender, CheckInEmailSender>();
            services.AddTransient<ResponseMiddleware>();
            services.AddAntiforgery(options => { options.Cookie.Name = "_af"; options.Cookie.HttpOnly = true; options.Cookie.SecurePolicy = CookieSecurePolicy.Always; options.HeaderName = "X-XSRF-TOKEN"; });
            services.AddAutoMapper(typeof(Startup));
            services.AddDbContext<AppDbContext>();
            services.AddScoped<ModelValidationAttribute>();
            services.AddControllersWithViews()
                    .AddNewtonsoftJson(options => {
                        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                        options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                    });
            services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
            ModelValidations.AddModelValidation(services);
            services.Configure<CookiePolicyOptions>(options => { options.CheckConsentNeeded = _ => true; options.MinimumSameSitePolicy = SameSiteMode.None; });
            services.Configure<EmailSettings>(options => Configuration.GetSection("EmailSettings").Bind(options));
            services.Configure<DirectoryLocations>(options => Configuration.GetSection("DirectoryLocations").Bind(options));
        }

        public void ConfigureLocalDevelopment(IApplicationBuilder app) {
            app.UseDeveloperExceptionPage();
            Configure(app);
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }

        public void ConfigureProductionLive(IApplicationBuilder app) {
            app.UseHsts();
            Configure(app);
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }

        public void ConfigureProductionDemo(IApplicationBuilder app) {
            app.UseHsts();
            Configure(app);
            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }

        public virtual void Configure(IApplicationBuilder app) {
            app.UseMiddleware<ResponseMiddleware>();
            app.UseDefaultFiles();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();
        }

    }

}
