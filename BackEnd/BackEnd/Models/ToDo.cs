using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Models;

[Table("ToDo")]
public partial class ToDo
{
    [Key]
    public int TaskId { get; set; }

    [StringLength(200)]
    [Unicode(false)]
    public string Title { get; set; } = null!;

    [Unicode(false)]
    public string? Description { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? DueDate { get; set; }

    public bool IsCompleted { get; set; }

    [Required]
    public bool? IsRecordActive { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ModifiedAt { get; set; }
}
