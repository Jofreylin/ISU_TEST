using BackEnd.DTO;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoRepository _repo;
        public ToDoController(IToDoRepository repo) 
        {
            _repo = repo;
        }

        [HttpGet("List")]
        public async Task<ActionResult<PaginationManager<ToDo>>> GetList([FromQuery] QueryParameters parameters)
        {
            var result = await _repo.GetList(parameters);
            return Ok(result);
        }

        [HttpGet("ById/{taskId}")]
        public async Task<ActionResult<ToDo>> GetById(int taskId)
        {
            var result = await _repo.GetById(taskId);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ToDoDTO?>> Insert(ToDoDTO model)
        {
            var result = await _repo.Insert(model);
            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult<ToDoDTO?>> Update(ToDoDTO model)
        {
            var result = await _repo.Update(model);
            return Ok(result);
        }

        [HttpDelete("{taskId}")]
        public async Task<ActionResult> Delete(int taskId)
        {
            await _repo.Delete(taskId);
            return Ok();
        }
    }
}
