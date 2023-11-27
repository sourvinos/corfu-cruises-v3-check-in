using API.Dtos;
using API.Models;

namespace API.Interfaces {

    public interface ICheckInReservationValidation {

        int GetPortIdFromPickupPointId(int pickupPointId);
        int IsValid(Reservation reservation, IScheduleRepository scheduleRepo);
        int IsValid(ReservationWriteDto reservation, IScheduleRepository scheduleRepo);

    }

}