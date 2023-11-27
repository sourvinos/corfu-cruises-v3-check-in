using System.Collections.Generic;

namespace API.Models {

    public class PickupPoint {

        // PK
        public int Id { get; set; }
        // FKs
        public int CoachRouteId { get; set; }
        // Fields
        public string Description { get; set; }
        public string ExactPoint { get; set; }
        public string Time { get; set; }
        public string Remarks { get; set; }
        public bool IsActive { get; set; }
        public string LastUpdate { get; set; }
        // FKs
        public string UserId { get; set; }
        // Navigation
        public CoachRoute CoachRoute { get; set; }

    }

}