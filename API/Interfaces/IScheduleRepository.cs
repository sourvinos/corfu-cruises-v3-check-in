using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Interfaces;
using API.Models;
using API.ViewModels;

namespace API.Interfaces {

    public interface IScheduleRepository : IRepository<Schedule> {

        Task<IEnumerable<ScheduleListVM>> GetAsync();
        Task<Schedule> GetByIdAsync(int id, bool includeTables);

    }

}