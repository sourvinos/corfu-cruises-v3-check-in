using API.Infrastructure.Interfaces;

namespace API.Models {

    public class PickupPoint : IBaseEntity {

        // PK
        public int Id { get; set; }
        // FK
        public int PortId { get; set; }
        // Fields
        public string Description { get; set; }
        public string ExactPoint { get; set; }
        public string Time { get; set; }

    }

}