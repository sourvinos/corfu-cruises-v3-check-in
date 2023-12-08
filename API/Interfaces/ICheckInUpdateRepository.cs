using System;
using API.Models;

namespace API.Interfaces {

    public interface ICheckInUpdateRepository  {

        void Update(Guid reservationId, Reservation reservation);

    }

}