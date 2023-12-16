using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces {

    public interface IReservationReadRepository  {

        Task<Reservation> GetByRefNo(string refNo);
        Task<Reservation> GetByDate(string date, int destinationId, string lastname, string firstname);
        Task<Reservation> GetById(string reservationId, bool includeTables);

    }

}