using API.Infrastructure.Classes;

namespace API.ViewModels {

    public class PickupPointVM : SimpleEntity {

        public string ExactPoint { get; set; }
        public string Time { get; set; }

    }

}