using API.Infrastructure.Interfaces;

namespace API.Models {

    public class Gender : IBaseEntity {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public bool IsActive { get; set; }

    }


}