using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Interfaces;
using API.Models;
using API.ViewModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Implementations {

    public class NationalityRepository : INationalityRepository {

        private readonly IMapper mapper;
        protected readonly AppDbContext context;

        public NationalityRepository(AppDbContext context, IMapper mapper) {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<NationalityDropdownVM>> GetDropdown() {
            var nationalities = await context.Nationalities
                .AsNoTracking()
                .Where(x => x.IsActive)
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Nationality>, IEnumerable<NationalityDropdownVM>>(nationalities);
        }

    }

}