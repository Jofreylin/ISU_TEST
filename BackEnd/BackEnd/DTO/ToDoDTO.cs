using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.DTO;

public class ToDoDTO
{
    public int? TaskId { get; set; }

    [StringLength(200)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime? DueDate { get; set; }

    public bool IsCompleted { get; set; }
}
