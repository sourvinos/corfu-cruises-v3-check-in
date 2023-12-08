using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces {

    public interface ICheckInReadRepository  {

        Task<Reservation> GetByRefNoAsync(string refNo);
        Task<Reservation> GetByDateAsync(string date, int destinationId, string lastname, string firstname);
        Task<Reservation> GetByIdAsync(string reservationId, bool includeTables);

    }

}