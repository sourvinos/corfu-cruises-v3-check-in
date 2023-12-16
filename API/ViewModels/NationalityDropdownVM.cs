using API.Infrastructure.Classes;

namespace API.ViewModels {

    public class NationalityDropdownVM : SimpleEntity {

        public string Code { get; set; }
        public bool IsActive { get; set; }

    }

}