using LuxeServe.Models.Entities;
using LuxeServe.Models.Enum;
using LuxeServe.Repositories;

namespace LuxeServe.Services
{
    public class ReservationService
    {
        private readonly ReservationRepository _reservationRepository;
        private readonly TableRepository _tableRepository;

        public ReservationService(ReservationRepository reservationRepository, TableRepository tableRepository)
        {
            _reservationRepository = reservationRepository;
            _tableRepository = tableRepository;
        }

        public Task<List<Reservation>> GetAllReservationsAsync()
        {
            return _reservationRepository.GetAllWithTablesAsync();
        }

        public Task<Reservation?> GetReservationByIdAsync(int reservationId)
        {
            return _reservationRepository.GetByIdAsync(reservationId);
        }

        public Task<List<Reservation>> GetReservationsByDateRangeAsync(DateTime start, DateTime end)
        {
            return _reservationRepository.GetByDateRangeAsync(start, end);
        }

        public async Task<bool> CreateReservationAsync(Reservation reservation)
        {
            if (reservation.EndDateTime <= reservation.StartDateTime || reservation.StartDateTime < DateTime.Now)
                return false;

            var table = await _tableRepository.GetByIdAsync(reservation.TableId);
            if (table == null)
                return false;

            var existingReservations = await _reservationRepository.GetByDateRangeAsync(
                reservation.StartDateTime.AddHours(-3),
                reservation.EndDateTime.AddHours(3)
            );

            bool isOverlapping = existingReservations.Any(r =>
                r.TableId == reservation.TableId &&
                r.ReservationStatus != ReservationStatus.Cancelled &&
                r.ReservationStatus != ReservationStatus.NoShow &&
                (reservation.StartDateTime < r.EndDateTime && reservation.EndDateTime > r.StartDateTime)
            );

            if (isOverlapping)
                return false;

            _reservationRepository.Add(reservation);
            return await _reservationRepository.SaveChangesAsync();
        }

        public async Task<bool> UpdateReservationStatusAsync(int reservationId, ReservationStatus newStatus)
        {
            var existingReservation = await _reservationRepository.GetByIdAsync(reservationId);
            if (existingReservation == null) return false;

            existingReservation.ReservationStatus = newStatus;
            return await _reservationRepository.SaveChangesAsync();
        }

        public async Task<bool> UpdateReservationDetailsAsync(int reservationId, DateTime start, DateTime end, string? notes)
        {
            if (end <= start)
                return false;

            var existingReservation = await _reservationRepository.GetByIdAsync(reservationId);
            if (existingReservation == null) return false;

            if (existingReservation.ReservationStatus == ReservationStatus.Completed ||
                existingReservation.ReservationStatus == ReservationStatus.Cancelled)
            {
                return false;
            }

            existingReservation.StartDateTime = start;
            existingReservation.EndDateTime = end;
            existingReservation.Notes = notes;

            return await _reservationRepository.SaveChangesAsync();
        }
    }
}