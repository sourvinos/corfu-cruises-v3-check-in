using API.Infrastructure.Interfaces;

namespace API.Models {

    public class Nationality : IBaseEntity {

        // PK
        public int Id { get; set; }
        // Fields
        public string Code { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

    }

}