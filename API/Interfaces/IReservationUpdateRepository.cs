using System;
using API.Models;

namespace API.Interfaces {

    public interface IReservationUpdateRepository {

        Reservation Update(Guid id, Reservation reservation);

    }

}