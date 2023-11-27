using System.Collections.Generic;

namespace API.Models {

    public class CoachRoute {

        // PK
        public int Id { get; set; }
        // FKs
        public int PortId { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public bool HasTransfer { get; set; }
        public bool IsActive { get; set; }
        public string LastUpdate { get; set; }
        // FKs
        public string UserId { get; set; }

    }

}