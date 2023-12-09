using System.Collections.Generic;
using System.Threading.Tasks;
using API.ViewModels;

namespace API.Interfaces {

    public interface IDestinationRepository {

        Task<IEnumerable<DestinationAutoCompleteVM>> GetAutoCompleteAsync();

    }

}