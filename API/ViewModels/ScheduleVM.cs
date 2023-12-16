using API.Infrastructure.Classes;

namespace API.ViewModels {

    public class ScheduleVM {

        public int Id { get; set; }
        public string Date { get; set; }
        public SimpleEntity Destination { get; set; }
        public SimpleEntity Port { get; set; }
        public int MaxPax { get; set; }
        public bool IsActive { get; set; }

    }

}