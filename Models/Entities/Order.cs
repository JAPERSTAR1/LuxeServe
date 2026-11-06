using LuxeServe.Models.Enum;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LuxeServe.Models.Entities;

public partial class Order
{
    [Key]
    [Column("OrderID")]
    public int OrderId { get; set; }

    [Column("PatronID")]
    public int? PatronId { get; set; }

    [Column("ReservationID")]
    public int? ReservationId { get; set; }

    public OrderStatus OrderStatus { get; set; }

    public DateTime OrderDate { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal TotalAmount { get; set; }

    public OrderType OrderType { get; set; }

    public PaymentStatus PaymentStatus { get; set; }

    [InverseProperty("Order")]
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    [ForeignKey("PatronId")]
    [InverseProperty("Orders")]
    public virtual Patron? Patron { get; set; }

    [ForeignKey("ReservationId")]
    [InverseProperty("Orders")]
    public virtual Reservation? Reservation { get; set; }
}
