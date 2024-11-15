using System.Net;
using System.Net.Http.Json;
using Azure;
using BackEnd.DTO;
using BackEnd.Models;
using FluentAssertions;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Xunit;

public class ToDoControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ToDoControllerTests(CustomWebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetList_ShouldReturnTasks()
    {
        await SeedDatabase();

        var response = await _client.GetAsync("/api/ToDo/List?pageNumber=1&pageSize=5");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var result = await response.Content.ReadFromJsonAsync<PaginationManager<ToDo>>();
        result.Should().NotBeNull();
        result?.Items.Should().HaveCountGreaterThan(0);
    }

    [Fact]
    public async Task Insert_ShouldAddTask()
    {
        var newTask = new ToDoDTO
        {
            Title = "Test Task",
            Description = "Test Description",
            DueDate = DateTime.UtcNow.AddDays(1),
            IsCompleted = false
        };

        var response = await _client.PostAsJsonAsync("/api/ToDo", newTask);

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var result = await response.Content.ReadFromJsonAsync<ToDoDTO>();
        result.Should().NotBeNull();
        result?.Title.Should().Be(newTask.Title);
    }

    [Fact]
    public async Task Update_ShouldModifyTask()
    {
        var task = await SeedDatabase();
        task.Title = "Updated Task";
        task.IsCompleted = true;

        var response = await _client.PutAsJsonAsync("/api/ToDo", task);

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var updatedTask = await response.Content.ReadFromJsonAsync<ToDoDTO>();
        updatedTask?.Title.Should().Be("Updated Task");
        updatedTask?.IsCompleted.Should().BeTrue();
    }

    [Fact]
    public async Task Delete_ShouldSoftDeleteTask()
    {
        var task = await SeedDatabase();

        var response = await _client.DeleteAsync($"/api/ToDo/{task.TaskId}");

        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var getResponse = await _client.GetAsync($"/api/ToDo/ById/{task.TaskId}");
        var deletedTask = await getResponse.Content.ReadFromJsonAsync<ToDo>();
        deletedTask?.IsRecordActive.Should().BeFalse();
    }

    private async Task<ToDoDTO> SeedDatabase()
    {
        var task = new ToDoDTO
        {
            Title = "Seed Task",
            Description = "Seed Description",
            DueDate = DateTime.UtcNow.AddDays(1),
            IsCompleted = false
        };

        var response = await _client.PostAsJsonAsync("/api/ToDo", task);

        Console.WriteLine($"SeedDatabase Response: {response.StatusCode}");
        var result = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"Response Content: {result}");

        response.EnsureSuccessStatusCode(); // Ensure the seed task is added correctly
        return await response.Content.ReadFromJsonAsync<ToDoDTO>();
    }
}
