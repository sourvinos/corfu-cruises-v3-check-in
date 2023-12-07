using API.ViewModels;

namespace API.Interfaces {

    public interface ICheckInEmailSender {

        SendEmailResponse SendEmail(ReservationVM email);

    }

    public class SendEmailResponse {

        public bool Successful => ErrorMsg == null;
        public string ErrorMsg;

    }


}