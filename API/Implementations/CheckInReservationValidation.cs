using System;
using System.Linq;
using API.Dtos;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using API.Infrastructure.Implementations;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Implementations {

    public class CheckInReservationValidation : Repository<Reservation>, ICheckInReservationValidation {

        public CheckInReservationValidation(AppDbContext context, IHttpContextAccessor httpContext, IOptions<TestingEnvironment> testingEnvironment) : base(context, httpContext, testingEnvironment) { }

        public int IsValid(Reservation reservation, IScheduleRepository scheduleRepo) {
            return true switch {
                var x when x == CheckInNotAllowedAfterDeparture(reservation) => 402,
                _ => 200,
            };
        }

        private bool CheckInNotAllowedAfterDeparture(Reservation reservation) {
            return IsAfterDeparture(reservation);
        }

        private bool IsAfterDeparture(Reservation reservation) {
            var timeNow = DateHelpers.GetLocalDateTime();
            var departureTime = GetScheduleDepartureTime(reservation);
            return DateTime.Compare(timeNow, departureTime) > 0;
        }

        private DateTime GetScheduleDepartureTime(Reservation reservation) {
            var schedule = context.Schedules
                .AsNoTracking()
                .Where(x => x.Date == reservation.Date && x.DestinationId == reservation.DestinationId && x.PortId == reservation.PortId)
                .SingleOrDefault();
            var departureTime = schedule.Date.ToString("yyyy-MM-dd") + " " + schedule.Time;
            var departureTimeAsDate = DateTime.Parse(departureTime);
            return departureTimeAsDate;
        }

    }

}