using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Models.Entities;

public partial class Table
{
    [Key]
    [Column("TableID")]
    public int TableId { get; set; }

    public int Seats { get; set; }

    [InverseProperty("Table")]
    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
