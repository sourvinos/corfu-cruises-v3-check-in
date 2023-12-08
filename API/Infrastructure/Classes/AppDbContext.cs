using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Classes {

    public class AppDbContext : IdentityDbContext<IdentityUser> {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        #region DbSets

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<Nationality> Nationalities { get; set; }
        public DbSet<Occupant> Occupants { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<PickupPoint> PickupPoints { get; set; }
        public DbSet<Port> Ports { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Schedule> Schedules { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    }

}