using BackEnd.Models;
using BackEnd.DTO;
using BackEnd.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace BackEnd.Services
{
    public interface IToDoRepository
    {
        Task<PaginationManager<ToDo>> GetList(QueryParameters parameters);
        Task<ToDo?> GetById(int taskId);
        Task<ToDoDTO> Insert(ToDoDTO model);
        Task<ToDoDTO> Update(ToDoDTO model);
        Task Delete(int taskId);
    }

    public class ToDoService : IToDoRepository
    {
        private readonly IsuDbContext _context;
        public ToDoService(IsuDbContext context)
        {
            _context = context;
        }

        public async Task<PaginationManager<ToDo>> GetList(QueryParameters parameters)
        {
            var pageNumber = parameters.PageNumber;
            var pageSize = parameters.PageSize;

            if (pageNumber < 1)
            {
                pageNumber = 1;
            }

            if (pageSize > Pagination.MaxPageSize)
            {
                pageSize = Pagination.MaxPageSize;
            }

            IQueryable<ToDo> query = _context.ToDos.Where(x=> x.IsRecordActive == true);

            int totalRecords = await query.CountAsync();
            int totalPages = Pagination.CalculateTotalPages(totalRecords, pageSize);

            var list = await query
                        .OrderByDescending(x => x.CreatedAt)
                        .ThenByDescending(x => x.TaskId)
                        .Skip((pageNumber - 1) * pageSize)
                        .Take(pageSize)
                        .ToListAsync();

            var response = new PaginationManager<ToDo>
            {
                Items = list,
                TotalPages = totalPages,
                TotalRecords = totalRecords,
                CurrentPage = pageNumber,
                SelectedPageSize = pageSize,
                TotalItemsShowing = list.Count
            };

            return response;
        }

        public async Task<ToDo?> GetById(int taskId)
        {
            var item = await _context.ToDos
                .SingleOrDefaultAsync(x => x.TaskId == taskId);

            return item;
        }

        public async Task<ToDoDTO> Insert(ToDoDTO model)
        {
            var taskInfo = new ToDo()
            {
                Title = model.Title,
                Description = model.Description,
                DueDate = model.DueDate,
                IsCompleted = model.IsCompleted,
                CreatedAt = DateTime.UtcNow,
                IsRecordActive = true
            };

            await _context.ToDos.AddAsync(taskInfo);
            await _context.SaveChangesAsync();

            model.TaskId = taskInfo.TaskId;

            return model;
        }

        public async Task<ToDoDTO> Update(ToDoDTO model)
        {
            await _context.ToDos.Where(x => x.TaskId == model.TaskId)
                .ExecuteUpdateAsync(s => s
                .SetProperty(p => p.Title, model.Title)
                .SetProperty(p => p.Description, model.Description)
                .SetProperty(p => p.DueDate, model.DueDate)
                .SetProperty(p => p.IsCompleted, model.IsCompleted)
                .SetProperty(p => p.ModifiedAt, DateTime.UtcNow));

            await _context.SaveChangesAsync();

            return model;
        }

        public async Task Delete(int taskId)
        {
            await _context.ToDos.Where(x => x.TaskId == taskId)
                .ExecuteUpdateAsync(s => s
                .SetProperty(p => p.IsRecordActive,  false)
                .SetProperty(p => p.ModifiedAt, DateTime.UtcNow));

            await _context.SaveChangesAsync();
        }
    }
}
