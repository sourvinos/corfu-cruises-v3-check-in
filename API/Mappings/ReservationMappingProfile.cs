using System;
using System.Linq;
using API.Dtos;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using API.Models;
using API.ViewModels;
using AutoMapper;

namespace API.Mappings {

    public class ReservationMappingProfile : Profile {

        public ReservationMappingProfile() {
            // Read reservation
            CreateMap<Reservation, ReservationReadDto>()
                .ForMember(x => x.Date, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Date)))
                .ForMember(x => x.Customer, x => x.MapFrom(x => new SimpleEntity { Id = x.Customer.Id, Description = x.Customer.Description }))
                .ForMember(x => x.Destination, x => x.MapFrom(x => new SimpleEntity { Id = x.Destination.Id, Description = x.Destination.Description }))
                .ForMember(x => x.Driver, x => x.MapFrom(x => x.Driver == null ? new SimpleEntity { Id = 0, Description = "(EMPTY)" } : new SimpleEntity { Id = x.Driver.Id, Description = x.Driver.Description }))
                .ForMember(x => x.Ship, x => x.MapFrom(x => x.Ship == null ? new SimpleEntity { Id = 0, Description = "(EMPTY)" } : new SimpleEntity { Id = x.Ship.Id, Description = x.Ship.Description }))
                .ForMember(x => x.PickupPoint, x => x.MapFrom(r => new PickupPointActiveVM {
                    Id = r.PickupPoint.Id,
                    Description = r.PickupPoint.Description,
                    ExactPoint = r.PickupPoint.ExactPoint,
                    Time = r.PickupPoint.Time
                }))
                .ForMember(x => x.Passengers, x => x.MapFrom(x => x.Passengers.Select(passenger => new Dtos.PassengerReadDto {
                    Id = passenger.Id,
                    ReservationId = passenger.ReservationId,
                    Lastname = passenger.Lastname,
                    Firstname = passenger.Firstname,
                    Birthdate = DateHelpers.DateToISOString(passenger.Birthdate),
                    Remarks = passenger.Remarks,
                    SpecialCare = passenger.SpecialCare,
                    IsCheckedIn = passenger.IsCheckedIn,
                    Nationality = new Dtos.NationalityDto {
                        Id = passenger.Nationality.Id,
                        Code = passenger.Nationality.Code,
                        Description = passenger.Nationality.Description
                    },
                    Gender = new Infrastructure.Classes.SimpleEntity {
                        Id = passenger.Gender.Id,
                        Description = passenger.Gender.Description
                    }
                })));
            // Read passenger
            CreateMap<Passenger, Dtos.PassengerReadDto>()
                .ForMember(x => x.Birthdate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Birthdate)))
                .ForMember(x => x.Nationality, x => x.MapFrom(x => new Dtos.NationalityDto {
                    Id = x.Nationality.Id,
                    Description = x.Nationality.Description,
                    Code = x.Nationality.Code
                }));
            // Write reservation
            CreateMap<ReservationWriteDto, Reservation>()
                .ForMember(x => x.LastUpdate, x => x.MapFrom(x => DateHelpers.DateTimeToISOString(DateTime.Now)));
            // Write passenger
            CreateMap<PassengerWriteDto, Passenger>()
                .ForMember(x => x.OccupantId, x => x.MapFrom(x => 2));
        }

    }

}