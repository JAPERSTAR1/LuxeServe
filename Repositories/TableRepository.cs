using LuxeServe.Data;
using LuxeServe.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Repositories
{
    public class TableRepository
    {
        private readonly LuxeServeDbContext _context;

        public TableRepository(LuxeServeDbContext context)
        {
            _context = context;
        }

        public async Task<List<Table>> GetAllAsync()
        {
            return await _context.Tables
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Table?> GetByIdAsync(int tableId)
        {
            return await _context.Tables
                .FirstOrDefaultAsync(t => t.TableId == tableId);
        }

        public void Add(Table table) => _context.Tables.Add(table);

        public void Update(Table table) => _context.Tables.Update(table);

        public void Delete(Table table) => _context.Tables.Remove(table);

        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}