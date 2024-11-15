using System;
using System.Collections.Generic;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Context;

public partial class IsuDbContext : DbContext
{
    public IsuDbContext()
    {
    }

    public IsuDbContext(DbContextOptions<IsuDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ToDo> ToDos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:DB");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ToDo>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PK__ToDo__7C6949B178E910D4");

            entity.Property(e => e.IsRecordActive).HasDefaultValueSql("((1))");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
