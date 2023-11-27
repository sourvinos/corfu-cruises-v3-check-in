using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Models {

    public class UserExtended : IdentityUser {

        // Fields
        public string Displayname { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
        // FKs
        public int? CustomerId { get; set; }
        // Navigation
        public Customer Customer { get; set; }
        public List<CoachRoute> CoachRoutes { get; set; }
        public List<Customer> Customers { get; set; }
        public List<Destination> Destinations { get; set; }
        public List<Driver> Drivers { get; set; }
        public List<Gender> Genders { get; set; }
        public List<Nationality> Nationalities { get; set; }
        public List<Occupant> Occupants { get; set; }
        public List<PickupPoint> PickupPoints { get; set; }
        public List<Port> Ports { get; set; }
        public List<Registrar> Registrars { get; set; }
        public List<Reservation> Reservations { get; set; }
        public List<Schedule> Schedules { get; set; }
        public List<Ship> Ships { get; set; }
        public List<ShipCrew> ShipCrews { get; set; }
        public List<ShipOwner> ShipOwners { get; set; }
        public List<ShipRoute> ShipRoutes { get; set; }

    }

}