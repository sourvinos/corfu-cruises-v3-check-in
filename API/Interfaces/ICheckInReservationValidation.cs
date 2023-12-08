using API.Models;

namespace API.Interfaces {

    public interface ICheckInReservationValidation {

        int IsValid(Reservation reservation);

    }

}