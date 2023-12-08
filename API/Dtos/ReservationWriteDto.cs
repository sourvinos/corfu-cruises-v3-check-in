using System;
using System.Collections.Generic;

namespace API.Dtos {

    public class ReservationWriteDto {

        // PK
        public Guid ReservationId { get; set; }
        // Fields
        public string RefNo { get; set; }
        public string Email { get; set; }
        public string Remarks { get; set; }
        // Navigation
        public List<PassengerWriteDto> Passengers { get; set; }

    }
}