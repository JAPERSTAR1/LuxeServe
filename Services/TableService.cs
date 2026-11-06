using LuxeServe.Models.Entities;
using LuxeServe.Repositories;

namespace LuxeServe.Services
{
    public class TableService
    {
        private readonly TableRepository _tableRepository;

        public TableService(TableRepository tableRepository)
        {
            _tableRepository = tableRepository;
        }

        public Task<List<Table>> GetAllTablesAsync()
        {
            return _tableRepository.GetAllAsync();
        }

        public Task<Table?> GetTableByIdAsync(int tableId)
        {
            return _tableRepository.GetByIdAsync(tableId);
        }

        public async Task<bool> CreateTableAsync(Table table)
        {
            if (table.Seats <= 0)
                return false;

            _tableRepository.Add(table);
            return await _tableRepository.SaveChangesAsync();
        }

        public async Task<bool> UpdateTableSeatsAsync(int tableId, int newSeats)
        {
            if (newSeats <= 0)
                return false;

            var existingTable = await _tableRepository.GetByIdAsync(tableId);
            if (existingTable == null) return false;

            existingTable.Seats = newSeats;
            return await _tableRepository.SaveChangesAsync();
        }
    }
}