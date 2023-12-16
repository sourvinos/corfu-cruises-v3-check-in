using API.ViewModels;

namespace API.Interfaces {

    public interface IEmailSender {

        SendEmailResponse SendEmail(ReservationVM email);

    }

    public class SendEmailResponse {

        public bool Successful => ErrorMsg == null;
        public string ErrorMsg;

    }


}