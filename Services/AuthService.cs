using LuxeServe.DTOs;
using LuxeServe.Models.Entities;
using LuxeServe.Models.Enum;
using LuxeServe.Repositories;
using LuxeServe.Utilities;

namespace LuxeServe.Services
{
    public class AuthService
    {
        private readonly AuthRepository _authRepository;
        private readonly JwtTokenGenerator _tokenGenerator;

        public AuthService(AuthRepository authRepository, JwtTokenGenerator tokenGenerator)
        {
            _authRepository = authRepository;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<string?> LoginAsync(string email, string password)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                return null;

            var loginInfo = await _authRepository.GetLoginInfoByEmailAsync(email);
            if (loginInfo == null) return null;

            bool isValid = PasswordHasher.VerifyPassword(password, loginInfo.HashPassword);
            if (!isValid) return null;

            // Generate JWT Token
            return _tokenGenerator.GenerateToken(loginInfo);
        }

        public async Task<bool> RegisterPatronAsync(string firstName, string lastName, string phoneNumber, string email, string password)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(firstName))
                return false;

            bool exists = await _authRepository.EmailExistsAsync(email);
            if (exists) return false;

            var person = new Person { FirstName = firstName, LastName = lastName };

            var loginInfo = new LoginInfo
            {
                Person = person,
                Email = email,
                HashPassword = PasswordHasher.HashPassword(password),
                Role = Role.Patron
            };

            var patron = new Patron { Person = person, PhoneNumber = phoneNumber };

            _authRepository.AddPatronUser(person, loginInfo, patron);
            return await _authRepository.SaveChangesAsync();
        }

        public async Task<bool> RegisterStaffAsync(string firstName, string lastName, string email, string password, Role role)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(firstName))
                return false;

            bool exists = await _authRepository.EmailExistsAsync(email);
            if (exists) return false;

            var person = new Person { FirstName = firstName, LastName = lastName };

            var loginInfo = new LoginInfo
            {
                Person = person,
                Email = email,
                HashPassword = PasswordHasher.HashPassword(password),
                Role = role
            };

            var staff = new Staff { Person = person, JoinedAt = DateTime.Now };

            _authRepository.AddStaffUser(person, loginInfo, staff);
            return await _authRepository.SaveChangesAsync();
        }
    }
}