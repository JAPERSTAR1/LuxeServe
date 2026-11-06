using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Models.Entities;

public partial class Dish
{
    [Key]
    [Column("DishID")]
    public int DishId { get; set; }

    public string? Description { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Price { get; set; }

    public int? Calories { get; set; }

    [StringLength(100)]
    public string? Categories { get; set; }

    [InverseProperty("Dish")]
    public virtual ICollection<DishImage> DishImages { get; set; } = new List<DishImage>();

    [InverseProperty("Dish")]
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
