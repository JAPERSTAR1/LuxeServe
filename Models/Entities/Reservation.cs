using System;
using System.Collections.Generic;
using LuxeServe.Models.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Models.Entities;

public partial class Reservation
{
    [Key]
    [Column("ReservationID")]
    public int ReservationId { get; set; }

    [Column("TableID")]
    public int TableId { get; set; }

    public ReservationStatus ReservationStatus { get; set; }

    public DateTime StartDateTime { get; set; }

    public DateTime EndDateTime { get; set; }

    [StringLength(500)]
    public string? Notes { get; set; }

    [InverseProperty("Reservation")]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    [ForeignKey("TableId")]
    [InverseProperty("Reservations")]
    public virtual Table Table { get; set; } = null!;
}
