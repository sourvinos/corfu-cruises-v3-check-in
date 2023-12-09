using System.Collections.Generic;
using System.Threading.Tasks;
using API.ViewModels;

namespace API.Interfaces {

    public interface IGenderRepository {

        Task<IEnumerable<GenderAutoCompleteVM>> GetAutoCompleteAsync();

    }

}