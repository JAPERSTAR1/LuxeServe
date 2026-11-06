namespace LuxeServe.Models.Enum
{
    public enum Role : byte
    {
        Staff = 1,
        Patron = 2
    }


    public enum OrderStatus : byte
    {
        Pending = 1,
        Preparing = 2,
        Ready = 3,
        Served = 4,
        Completed = 5,
        Cancelled = 6
    }

    public enum OrderType : byte
    {
        DineIn = 1,
        Takeaway = 2
    }

    public enum PaymentStatus : byte
    {
        Unpaid = 1,
        Paid = 2,
        Refunded = 3
    }

    public enum ReservationStatus : byte
    {
        Pending = 1,
        Confirmed = 2,
        Seated = 3,
        Completed = 4,
        Cancelled = 5,
        NoShow = 6
    }
}
