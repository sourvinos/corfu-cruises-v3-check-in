using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {

    [Route("api/[controller]")]
    public class DestinationsController : ControllerBase {

        private readonly IDestinationRepository destinationRepo;

        public DestinationsController(IDestinationRepository destinationRepo) {
            this.destinationRepo = destinationRepo;
        }

        [HttpGet()]
        public async Task<IEnumerable<DestinationAutoCompleteVM>> GetAutoCompleteAsync() {
            return await destinationRepo.GetAutoCompleteAsync();
        }

    }

}