using API.Models;
using API.ViewModels;
using AutoMapper;

namespace API.Mappings {

    public class GenderMappingProfile : Profile {

        public GenderMappingProfile() {
            CreateMap<Gender, GenderDropdownVM>();
        }

    }

}