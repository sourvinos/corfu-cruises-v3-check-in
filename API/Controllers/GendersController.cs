using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {

    [Route("api/[controller]")]
    public class GendersController : ControllerBase {

        private readonly IGenderRepository genderRepo;

        public GendersController(IGenderRepository genderRepo) {
            this.genderRepo = genderRepo;
        }

        [HttpGet()]
        public async Task<IEnumerable<GenderDropdownVM>> GetDropdown() {
            return await genderRepo.GetDropdown();
        }

    }

}