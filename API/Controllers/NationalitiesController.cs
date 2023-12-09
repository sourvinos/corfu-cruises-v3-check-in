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

        [HttpGet("[action]")]
        public async Task<IEnumerable<NationalityAutoCompleteVM>> GetAutoCompleteAsync() {
            return await nationalityRepo.GetAutoCompleteAsync();
        }

    }

}