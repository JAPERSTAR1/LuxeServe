using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Models.Entities;

[Table("Patron")]
[Index("PersonId", Name = "UQ__Patron__AA2FFB8420FC3492", IsUnique = true)]
public partial class Patron
{
    [Key]
    [Column("PatronID")]
    public int PatronId { get; set; }

    [Column("PersonID")]
    public int PersonId { get; set; }

    [StringLength(20)]
    public string PhoneNumber { get; set; } = null!;

    [InverseProperty("Patron")]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    [ForeignKey("PersonId")]
    [InverseProperty("Patron")]
    public virtual Person Person { get; set; } = null!;
}
