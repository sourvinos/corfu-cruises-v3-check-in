using API.Models;

namespace API.Interfaces {

    public interface IReservationValidation {

        int IsValid(Reservation reservation);

    }

}