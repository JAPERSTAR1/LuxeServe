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
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrdersController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("kitchen")]
        [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetKitchenOrders()
        {
            var orders = await _orderService.GetKitchenOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("patron/{patronId:int}")]
        [ProducesResponseType(typeof(List<Order>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPatronOrders(int patronId)
        {
            var orders = await _orderService.GetPatronOrdersAsync(patronId);
            return Ok(orders);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Order), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound(new { Message = $"Order with ID {id} was not found." });
            }

            return Ok(order);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Order), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateOrder([FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _orderService.CreateOrderAsync(order);
            if (!success)
            {
                return BadRequest(new { Message = "Failed to create order. Verify that total amount, item quantities, and unit prices are valid." });
            }

            return CreatedAtAction(nameof(GetOrderById), new { id = order.OrderId }, order);
        }

        [HttpPatch("{id:int}/status")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] OrderStatus status)
        {
            var success = await _orderService.UpdateOrderStatusAsync(id, status);
            if (!success)
            {
                return BadRequest(new { Message = $"Order with ID {id} was not found or is in a state that cannot be modified (e.g. Completed or Cancelled)." });
            }

            return Ok(new { Message = "Order status updated successfully.", OrderId = id, Status = status });
        }

        [HttpPatch("{id:int}/payment")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdatePaymentStatus(int id, [FromBody] PaymentStatus status)
        {
            var success = await _orderService.UpdatePaymentStatusAsync(id, status);
            if (!success)
            {
                return NotFound(new { Message = $"Order with ID {id} was not found." });
            }

            return Ok(new { Message = "Payment status updated successfully.", OrderId = id, PaymentStatus = status });
        }
    }
}