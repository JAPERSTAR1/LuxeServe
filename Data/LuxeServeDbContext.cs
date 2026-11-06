using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using LuxeServe.Models.Entities;
using LuxeServe.Models.Enum;

namespace LuxeServe.Data
{
    public partial class LuxeServeDbContext : DbContext
    {
        public LuxeServeDbContext()
        {
        }

        public LuxeServeDbContext(DbContextOptions<LuxeServeDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Dish> Dishes { get; set; }
        public virtual DbSet<DishImage> DishImages { get; set; }
        public virtual DbSet<LoginInfo> LoginInfos { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<Patron> Patrons { get; set; }
        public virtual DbSet<Person> People { get; set; }
        public virtual DbSet<Reservation> Reservations { get; set; }
        public virtual DbSet<Staff> Staff { get; set; }
        public virtual DbSet<Table> Tables { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Left empty to allow appsettings.json connection string injection
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dish>(entity =>
            {
                entity.HasKey(e => e.DishId).HasName("PK__Dishes__18834F70686F015A");
            });

            modelBuilder.Entity<DishImage>(entity =>
            {
                entity.HasKey(e => e.DishImageId).HasName("PK__DishImag__9C040409E1DAE505");
                entity.HasOne(d => d.Dish).WithMany(p => p.DishImages).HasConstraintName("FK_DishImages_Dishes");
            });

            modelBuilder.Entity<LoginInfo>(entity =>
            {
                entity.HasKey(e => e.LoginId).HasName("PK__LoginInf__4DDA2838E8DD4E7F");
                entity.Property(e => e.Role).HasConversion<byte>();
                entity.HasOne(d => d.Person).WithOne(p => p.LoginInfo).HasConstraintName("FK_LoginInfo_Person");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BAF8522BFFB");
                entity.Property(e => e.OrderDate).HasDefaultValueSql("(getdate())");

                // Enum Conversions
                entity.Property(e => e.OrderStatus).HasDefaultValue(OrderStatus.Pending).HasConversion<byte>();
                entity.Property(e => e.OrderType).HasConversion<byte>();
                entity.Property(e => e.PaymentStatus).HasDefaultValue(PaymentStatus.Unpaid).HasConversion<byte>();

                entity.HasOne(d => d.Patron).WithMany(p => p.Orders).HasConstraintName("FK_Orders_Patron");
                entity.HasOne(d => d.Reservation).WithMany(p => p.Orders).HasConstraintName("FK_Orders_Reservations");
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(e => e.OrderItemId).HasName("PK__OrderIte__57ED06A17236D73E");

                entity.HasOne(d => d.Dish).WithMany(p => p.OrderItems)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderItems_Dishes");

                entity.HasOne(d => d.Order).WithMany(p => p.OrderItems).HasConstraintName("FK_OrderItems_Orders");
            });

            modelBuilder.Entity<Patron>(entity =>
            {
                entity.HasKey(e => e.PatronId).HasName("PK__Patron__14EC661A60BD8FB1");
                entity.HasOne(d => d.Person).WithOne(p => p.Patron).HasConstraintName("FK_Patron_Person");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasKey(e => e.PersonId).HasName("PK__Person__AA2FFB85D2C34DF2");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.HasKey(e => e.ReservationId).HasName("PK__Reservat__B7EE5F041BE74370");
                entity.Property(e => e.ReservationStatus).HasDefaultValue(ReservationStatus.Pending).HasConversion<byte>();

                entity.HasOne(d => d.Table).WithMany(p => p.Reservations)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Reservations_Tables");
            });

            modelBuilder.Entity<Staff>(entity =>
            {
                entity.HasKey(e => e.StaffId).HasName("PK__Staff__96D4AAF763984DDE");
                entity.Property(e => e.JoinedAt).HasDefaultValueSql("(getdate())");
                entity.HasOne(d => d.Person).WithOne(p => p.Staff).HasConstraintName("FK_Staff_Person");
            });

            modelBuilder.Entity<Table>(entity =>
            {
                entity.HasKey(e => e.TableId).HasName("PK__Tables__7D5F018E81282AC9");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}