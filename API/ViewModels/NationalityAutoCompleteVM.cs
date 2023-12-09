using API.Infrastructure.Classes;

namespace API.ViewModels {

    public class NationalityAutoCompleteVM : SimpleEntity {

        public string Code { get; set; }
        public bool IsActive { get; set; }

    }

}