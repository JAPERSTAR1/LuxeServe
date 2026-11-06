using System;
using System.Collections.Generic;
using LuxeServe.Models.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Models.Entities;

[Table("LoginInfo")]
[Index("Email", Name = "UQ__LoginInf__A9D10534988CA336", IsUnique = true)]
[Index("PersonId", Name = "UQ__LoginInf__AA2FFB84654CC1E2", IsUnique = true)]
public partial class LoginInfo
{
    [Key]
    [Column("LoginID")]
    public int LoginId { get; set; }

    [Column("PersonID")]
    public int PersonId { get; set; }

    [StringLength(255)]
    public string Email { get; set; } = null!;

    [StringLength(255)]
    public string HashPassword { get; set; } = null!;

    public Role Role { get; set; }

    [ForeignKey("PersonId")]
    [InverseProperty("LoginInfo")]
    public virtual Person Person { get; set; } = null!;
}
