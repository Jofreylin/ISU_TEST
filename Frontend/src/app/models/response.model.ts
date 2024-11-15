export interface PaginatedItems<T> {
    totalRecords: number
    totalPages: number
    currentPage: number
    selectedPageSize: number
    totalItemsShowing: number
    items: T[]
}

export interface IQueryParameters {
    searchValue?: string;
    pageNumber: number;
    pageSize: number;
}

export enum ViewsEnum{ 
    Create = 1, 
    Edit = 2 
} 