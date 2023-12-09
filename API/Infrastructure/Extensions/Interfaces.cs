using API.Implementations;
using API.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class Interfaces {

        public static void AddInterfaces(IServiceCollection services) {
            services.AddTransient<IDestinationRepository, DestinationRepository>();
            services.AddTransient<IGenderRepository, GenderRepository>();
            services.AddTransient<INationalityRepository, NationalityRepository>();
            services.AddTransient<ICheckInReadRepository, CheckInReadRepository>();
            services.AddTransient<ICheckInReservationValidation, CheckInReservationValidation>();
            services.AddTransient<ICheckInUpdateRepository, CheckInUpdateRepository>();
            services.AddTransient<ICheckInEmailSender, CheckInEmailSender>();
        }

    }

}

