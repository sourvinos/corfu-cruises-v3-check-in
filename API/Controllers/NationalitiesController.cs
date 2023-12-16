using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Nationalities {

    [Route("api/[controller]")]
    public class NationalitiesController : ControllerBase {

        private readonly INationalityRepository nationalityRepo;

        public NationalitiesController(INationalityRepository nationalityRepo) {
            this.nationalityRepo = nationalityRepo;
        }

        [HttpGet()]
        public async Task<IEnumerable<NationalityDropdownVM>> GetDropdown() {
            return await nationalityRepo.GetDropdown();
        }

    }

}