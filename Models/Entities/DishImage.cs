using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Models.Entities;

public partial class DishImage
{
    [Key]
    [Column("DishImageID")]
    public int DishImageId { get; set; }

    [Column("DishID")]
    public int DishId { get; set; }

    [Column("URL")]
    [StringLength(2083)]
    public string Url { get; set; } = null!;

    [ForeignKey("DishId")]
    [InverseProperty("DishImages")]
    public virtual Dish Dish { get; set; } = null!;
}
