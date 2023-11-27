using System.Collections.Generic;

namespace API.Models {

    public class Driver {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Phones { get; set; }
        public bool IsActive { get; set; }
        public string LastUpdate { get; set; }
        // FKs
        public string UserId { get; set; }

    }

}