using System;
using API.Infrastructure.Interfaces;
using API.Models;

namespace API.Interfaces {

    public interface ICheckInUpdateRepository : IRepository<Reservation> {

        void Update(Guid reservationId, Reservation reservation);

    }

}