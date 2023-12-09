using API.Models;
using API.ViewModels;
using AutoMapper;

namespace API.Mappings {

    public class DestinationMappingProfile : Profile {

        public DestinationMappingProfile() {
            CreateMap<Destination, DestinationAutoCompleteVM>();
        }

    }

}