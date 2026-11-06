using LuxeServe.Data;
using LuxeServe.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace LuxeServe.Repositories
{
    public class AuthRepository
    {
        private readonly LuxeServeDbContext _context;

        public AuthRepository(LuxeServeDbContext context)
        {
            _context = context;
        }

        public async Task<LoginInfo?> GetLoginInfoByEmailAsync(string email)
        {
            return await _context.LoginInfos
                .AsNoTracking()
                .Include(l => l.Person)
                .FirstOrDefaultAsync(l => l.Email.ToLower() == email.ToLower());
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.LoginInfos
                .AsNoTracking()
                .AnyAsync(l => l.Email.ToLower() == email.ToLower());
        }

        public void AddPatronUser(Person person, LoginInfo loginInfo, Patron patron)
        {
            _context.People.Add(person);
            _context.LoginInfos.Add(loginInfo);
            _context.Patrons.Add(patron);
        }

        public void AddStaffUser(Person person, LoginInfo loginInfo, Staff staff)
        {
            _context.People.Add(person);
            _context.LoginInfos.Add(loginInfo);
            _context.Staff.Add(staff);
        }

        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}