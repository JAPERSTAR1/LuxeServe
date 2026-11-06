using LuxeServe.Data;
using LuxeServe.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Repositories
{
    public class ReservationRepository
    {
        private readonly LuxeServeDbContext _context;

        public ReservationRepository(LuxeServeDbContext context)
        {
            _context = context;
        }

        public async Task<List<Reservation>> GetAllWithTablesAsync()
        {
            return await _context.Reservations
                .AsNoTracking()
                .Include(r => r.Table)
                .OrderByDescending(r => r.StartDateTime)
                .ToListAsync();
        }

        public async Task<Reservation?> GetByIdAsync(int reservationId)
        {
            return await _context.Reservations
                .Include(r => r.Table)
                .FirstOrDefaultAsync(r => r.ReservationId == reservationId);
        }

        public async Task<List<Reservation>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .AsNoTracking()
                .Include(r => r.Table)
                .Where(r => r.StartDateTime >= startDate && r.EndDateTime <= endDate)
                .OrderBy(r => r.StartDateTime)
                .ToListAsync();
        }

        public void Add(Reservation reservation) => _context.Reservations.Add(reservation);

        public void Update(Reservation reservation) => _context.Reservations.Update(reservation);

        public void Delete(Reservation reservation) => _context.Reservations.Remove(reservation);

        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}