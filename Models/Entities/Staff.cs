using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Models.Entities;

[Index("PersonId", Name = "UQ__Staff__AA2FFB842303AC0C", IsUnique = true)]
public partial class Staff
{
    [Key]
    [Column("StaffID")]
    public int StaffId { get; set; }

    [Column("PersonID")]
    public int PersonId { get; set; }

    public DateTime JoinedAt { get; set; }

    [ForeignKey("PersonId")]
    [InverseProperty("Staff")]
    public virtual Person Person { get; set; } = null!;
}
