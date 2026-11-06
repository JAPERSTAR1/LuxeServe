using LuxeServe.Models.Entities;
using LuxeServe.Models.Enum;
using LuxeServe.Repositories;

namespace LuxeServe.Services
{
    public class OrderService
    {
        private readonly OrderRepository _orderRepository;

        public OrderService(OrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public Task<List<Order>> GetAllOrdersAsync()
        {
            return _orderRepository.GetOrdersWithDetailsAsync();
        }

        public Task<List<Order>> GetKitchenOrdersAsync()
        {
            return _orderRepository.GetKitchenOrdersAsync();
        }

        public Task<List<Order>> GetPatronOrdersAsync(int patronId)
        {
            return _orderRepository.GetOrdersByPatronIdAsync(patronId);
        }

        public Task<Order?> GetOrderByIdAsync(int orderId)
        {
            return _orderRepository.GetByIdAsync(orderId);
        }

        public async Task<bool> CreateOrderAsync(Order order)
        {
            if (order.TotalAmount < 0 || order.OrderItems == null || !order.OrderItems.Any())
                return false;

            foreach (var item in order.OrderItems)
            {
                if (item.Quantity <= 0 || item.UnitPrice < 0)
                    return false;
            }

            _orderRepository.Add(order);
            return await _orderRepository.SaveChangesAsync();
        }

        public async Task<bool> UpdateOrderStatusAsync(int orderId, OrderStatus newStatus)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(orderId);
            if (existingOrder == null) return false;

            if (existingOrder.OrderStatus == OrderStatus.Completed || existingOrder.OrderStatus == OrderStatus.Cancelled)
                return false;

            existingOrder.OrderStatus = newStatus;
            return await _orderRepository.SaveChangesAsync();
        }

        public async Task<bool> UpdatePaymentStatusAsync(int orderId, PaymentStatus newStatus)
        {
            var existingOrder = await _orderRepository.GetByIdAsync(orderId);
            if (existingOrder == null) return false;

            existingOrder.PaymentStatus = newStatus;
            return await _orderRepository.SaveChangesAsync();
        }
    }
}