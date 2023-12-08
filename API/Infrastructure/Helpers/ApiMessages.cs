namespace API.Infrastructure.Helpers {

    public enum Icons {
        Success,
        Info,
        Warning,
        Error
    }

    public static class ApiMessages {

        #region Generic Messages

        public static string OK() { return "OK"; }
        public static string RecordNotFound() { return "Record not found"; }
        public static string UnknownError() { return "Something bad has happened."; }
        public static string EmailNotSent() { return "Email not sent."; }

        #endregion

        #region  App Specific Messages

        public static string InvalidNationality() { return "The nationality doesn't exist or is inactive."; }
        public static string InvalidGender() { return "The gender doesn't exist or is inactive."; }
        public static string InvalidOccupant() { return "The occupant doesn't exist or is inactive."; }
        public static string CheckInAfterDepartureIsNotAllowed() { return "Check-in after departure is not allowed"; }

        #endregion

    }

}