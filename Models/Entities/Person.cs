using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Models.Entities;

[Table("Person")]
public partial class Person
{
    [Key]
    [Column("PersonID")]
    public int PersonId { get; set; }

    [StringLength(50)]
    public string FirstName { get; set; } = null!;

    [StringLength(50)]
    public string LastName { get; set; } = null!;

    [InverseProperty("Person")]
    public virtual LoginInfo? LoginInfo { get; set; }

    [InverseProperty("Person")]
    public virtual Patron? Patron { get; set; }

    [InverseProperty("Person")]
    public virtual Staff? Staff { get; set; }
}
