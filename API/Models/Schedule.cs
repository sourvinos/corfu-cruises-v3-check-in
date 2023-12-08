using System;
using API.Infrastructure.Interfaces;

namespace API.Models {

    public class Schedule : IBaseEntity {

        // PK
        public int Id { get; set; }
        // FKs
        public int DestinationId { get; set; }
        public int PortId { get; set; }
        // Fields
        public DateTime Date { get; set; }

        public string Time { get; set; }

    }

}