﻿namespace BackEnd.DTO
{
    public class QueryParameters
    {
        public string? SearchValue { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
