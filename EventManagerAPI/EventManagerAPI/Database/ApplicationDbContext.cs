using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Numerics;
using System.Reflection.Emit;
using System;
using Microsoft.EntityFrameworkCore;
using EventManagerAPI.Models;

namespace EventManagerAPI.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Add any additional configuration here
        }
    }
}
