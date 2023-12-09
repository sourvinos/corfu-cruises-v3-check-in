using API.Models;
using API.ViewModels;
using AutoMapper;

namespace API.Mappings {

    public class NationalityMappingProfile : Profile {

        public NationalityMappingProfile() {
            CreateMap<Nationality, NationalityAutoCompleteVM>();
        }

    }

}