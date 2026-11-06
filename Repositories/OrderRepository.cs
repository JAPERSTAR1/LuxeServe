using LuxeServe.Data;
using LuxeServe.Models.Entities;
using LuxeServe.Models.Enum;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Repositories
{
    public class OrderRepository
    {
        private readonly LuxeServeDbContext _context;

        public OrderRepository(LuxeServeDbContext context)
        {
            _context = context;
        }

        public async Task<List<Order>> GetOrdersWithDetailsAsync()
        {
            return await _context.Orders
                .AsNoTracking()
                .Include(o => o.Patron).ThenInclude(p => p.Person)
                .Include(o => o.OrderItems).ThenInclude(oi => oi.Dish)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }

        public async Task<Order?> GetByIdAsync(int orderId)
        {
            return await _context.Orders
                .Include(o => o.OrderItems).ThenInclude(oi => oi.Dish)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);
        }

        public async Task<List<Order>> GetKitchenOrdersAsync()
        {
            return await _context.Orders
                .AsNoTracking()
                .Include(o => o.OrderItems).ThenInclude(oi => oi.Dish)
                .Where(o => o.OrderStatus == OrderStatus.Pending || o.OrderStatus == OrderStatus.Preparing)
                .OrderBy(o => o.OrderDate)
                .ToListAsync();
        }

        public async Task<List<Order>> GetOrdersByPatronIdAsync(int patronId)
        {
            return await _context.Orders
                .AsNoTracking()
                .Include(o => o.OrderItems).ThenInclude(oi => oi.Dish)
                .Where(o => o.PatronId == patronId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
        }

        public void Add(Order order) => _context.Orders.Add(order);

        public void Update(Order order) => _context.Orders.Update(order);

        public void Delete(Order order) => _context.Orders.Remove(order);

        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}