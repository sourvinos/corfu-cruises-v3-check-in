using System.Threading.Tasks;
using API.Infrastructure.Interfaces;
using API.Models;

namespace API.Interfaces {

    public interface ICheckInReadRepository : IRepository<Reservation> {

        Task<Reservation> GetByRefNoAsync(string refNo);
        Task<Reservation> GetByDateAsync(string date, int destinationId, string lastname, string firstname);
        Task<Reservation> GetByIdAsync(string reservationId, bool includeTables);

    }

}