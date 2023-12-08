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
    public class CheckInController : ControllerBase {

        #region variables

        private readonly ICheckInEmailSender checkInEmailSender;
        private readonly ICheckInReadRepository checkInReadRepo;
        private readonly ICheckInReservationValidation checkInValidReservation;
        private readonly ICheckInUpdateRepository checkInUpdateRepo;
        private readonly IMapper mapper;

        #endregion

        public CheckInController(ICheckInEmailSender checkInEmailSender, ICheckInReadRepository checkInReadRepo, ICheckInReservationValidation checkInValidReservation, ICheckInUpdateRepository checkInUpdateRepo, IMapper mapper) {
            this.checkInEmailSender = checkInEmailSender;
            this.checkInReadRepo = checkInReadRepo;
            this.checkInUpdateRepo = checkInUpdateRepo;
            this.checkInValidReservation = checkInValidReservation;
            this.mapper = mapper;
        }

        [HttpGet("refNo/{refNo}")]
        public async Task<ResponseWithBody> GetByRefNoAsync(string refNo) {
            var x = await checkInReadRepo.GetByRefNoAsync(refNo);
            if (x != null) {
                var z = checkInValidReservation.IsValid(x);
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
        public async Task<ResponseWithBody> GetByDateAsync(string date, int destinationId, string lastname, string firstname) {
            var x = await checkInReadRepo.GetByDateAsync(date, destinationId, lastname, firstname);
            if (x != null) {
                var z = checkInValidReservation.IsValid(x);
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

        [HttpPatch("reservationId/{reservationId}")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Patch(string reservationId, [FromBody] ReservationWriteDto reservation) {
            var x = await checkInReadRepo.GetByIdAsync(reservationId.ToString(), false);
            if (x != null) {
                var z = checkInValidReservation.IsValid(x);
                if (z == 200) {
                    checkInUpdateRepo.Update(reservation.ReservationId, mapper.Map<ReservationWriteDto, Reservation>(reservation));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = null,
                        Message = reservation.RefNo
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
        public SendEmailResponse SendCheckInReservation([FromBody] ReservationVM reservation) {
            return checkInEmailSender.SendEmail(reservation);
        }

    }

}