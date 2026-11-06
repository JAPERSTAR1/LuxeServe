using LuxeServe.Models.Entities;
using LuxeServe.Models.Enum;
using LuxeServe.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LuxeServe.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ReservationsController : ControllerBase
    {
        private readonly ReservationService _reservationService;

        public ReservationsController(ReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Reservation>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllReservations()
        {
            var reservations = await _reservationService.GetAllReservationsAsync();
            return Ok(reservations);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Reservation), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetReservationById(int id)
        {
            var reservation = await _reservationService.GetReservationByIdAsync(id);
            if (reservation == null)
            {
                return NotFound(new { Message = $"Reservation with ID {id} was not found." });
            }

            return Ok(reservation);
        }

        [HttpGet("range")]
        [ProducesResponseType(typeof(List<Reservation>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetReservationsByDateRange([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            if (end <= start)
            {
                return BadRequest(new { Message = "End date/time must be after start date/time." });
            }

            var reservations = await _reservationService.GetReservationsByDateRangeAsync(start, end);
            return Ok(reservations);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Reservation), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateReservation([FromBody] Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _reservationService.CreateReservationAsync(reservation);
            if (!success)
            {
                return BadRequest(new { Message = "Failed to create reservation. Ensure valid dates, future time slot, and that the table is not already booked." });
            }

            return CreatedAtAction(nameof(GetReservationById), new { id = reservation.ReservationId }, reservation);
        }

        [HttpPatch("{id:int}/status")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateReservationStatus(int id, [FromBody] ReservationStatus status)
        {
            var success = await _reservationService.UpdateReservationStatusAsync(id, status);
            if (!success)
            {
                return NotFound(new { Message = $"Reservation with ID {id} was not found." });
            }

            return Ok(new { Message = "Reservation status updated successfully.", ReservationId = id, Status = status });
        }

        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateReservationDetails(int id, [FromBody] Reservation reservationUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _reservationService.UpdateReservationDetailsAsync(
                id,
                reservationUpdate.StartDateTime,
                reservationUpdate.EndDateTime,
                reservationUpdate.Notes
            );

            if (!success)
            {
                return BadRequest(new { Message = $"Reservation with ID {id} was not found or is in a state that cannot be modified (e.g. Completed or Cancelled)." });
            }

            return Ok(new { Message = "Reservation details updated successfully.", ReservationId = id });
        }
    }
}