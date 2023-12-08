using System.Collections.Generic;
using API.Infrastructure.Interfaces;

namespace API.Models {

    public class PickupPoint : IBaseEntity {

        // PK
        public int Id { get; set; }
        // FKs
        // Fields
        public string Description { get; set; }
        // Navigation
        public Port Port { get; set; }


    }

}