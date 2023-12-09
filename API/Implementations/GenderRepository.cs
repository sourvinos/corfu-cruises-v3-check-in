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

    public class GenderRepository : IGenderRepository {

        private readonly IMapper mapper;
        protected readonly AppDbContext context;

        public GenderRepository(AppDbContext context, IMapper mapper) {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<GenderAutoCompleteVM>> GetAutoCompleteAsync() {
            var genders = await context.Genders
                .AsNoTracking()
                .Where(x => x.IsActive)
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Gender>, IEnumerable<GenderAutoCompleteVM>>(genders);
        }

    }

}