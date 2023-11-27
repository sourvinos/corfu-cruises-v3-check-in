using System.Collections.Generic;

namespace API.Models {

    public class Occupant {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public bool IsActive { get; set; }
        // FKs
        public string UserId { get; set; }

    }

}