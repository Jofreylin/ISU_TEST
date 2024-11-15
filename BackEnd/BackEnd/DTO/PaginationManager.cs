namespace BackEnd.DTO
{
    public class PaginationManager<T> where T : class
    {
        public int TotalRecords { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int SelectedPageSize { get; set; }
        public int TotalItemsShowing { get; set; }
        public List<T> Items { get; set; } = new List<T>();
    }

    public static class Pagination
    {
        public static int MaxPageSize { get; } = 300;
        public static int CommonPageSize { get; } = 50;

        public static int CalculateTotalPages(int totalRecords, int pageSize)
        {
            pageSize = pageSize <= 0 ? 1 : pageSize;
            return (totalRecords + pageSize - 1) / pageSize;
        }
    }
}
