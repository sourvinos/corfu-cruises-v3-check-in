using System.Threading.Tasks;
using API.Dtos;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using API.Interfaces;
using API.Models;
using API.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {

    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase {

        #region variables

        private readonly IEmailSender emailSender;
        private readonly IReservationReadRepository reservationReadRepo;
        private readonly IReservationValidation reservationValidation;
        private readonly IReservationUpdateRepository reservationUpdateRepo;
        private readonly IMapper mapper;

        #endregion

        public ReservationsController(IEmailSender emailSender, IMapper mapper, IReservationReadRepository reservationReadRepo, IReservationUpdateRepository reservationUpdateRepo, IReservationValidation reservationValidation) {
            this.emailSender = emailSender;
            this.mapper = mapper;
            this.reservationReadRepo = reservationReadRepo;
            this.reservationUpdateRepo = reservationUpdateRepo;
            this.reservationValidation = reservationValidation;
        }

        [HttpGet("refNo/{refNo}")]
        public async Task<ResponseWithBody> GetByRefNo(string refNo) {
            var x = await reservationReadRepo.GetByRefNo(refNo);
            if (x != null) {
                var z = reservationValidation.IsValid(x);
                if (z == 200) {
                    return new ResponseWithBody {
                        Code = 200,
                        Icon = Icons.Info.ToString(),
                        Message = ApiMessages.OK(),
                        Body = mapper.Map<Reservation, ReservationReadDto>(x)
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = 402
                    };
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpGet("date/{date}/destinationId/{destinationId}/lastname/{lastname}/firstname/{firstname}")]
        public async Task<ResponseWithBody> GetByDate(string date, int destinationId, string lastname, string firstname) {
            var x = await reservationReadRepo.GetByDate(date, destinationId, lastname, firstname);
            if (x != null) {
                var z = reservationValidation.IsValid(x);
                if (z == 200) {
                    return new ResponseWithBody {
                        Code = 200,
                        Icon = Icons.Info.ToString(),
                        Message = ApiMessages.OK(),
                        Body = mapper.Map<Reservation, ReservationReadDto>(x)
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = 402
                    };
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPut]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] ReservationWriteDto reservation) {
            var x = await reservationReadRepo.GetById(reservation.ReservationId.ToString(), false);
            if (x != null) {
                var z = reservationValidation.IsValid(x);
                if (z == 200) {
                    reservationUpdateRepo.Update(reservation.ReservationId, mapper.Map<ReservationWriteDto, Reservation>(reservation));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = null,
                        Message = x.RefNo
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = 402
                    };
                }
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost("[action]")]
        public SendEmailResponse EmailReservation([FromBody] ReservationVM reservation) {
            return emailSender.SendEmail(reservation);
        }

    }

}