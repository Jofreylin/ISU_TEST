import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { ITaskPost, ITaskView } from '../models/task.model';
import { IQueryParameters, PaginatedItems } from '../models/response.model';
import { environment } from 'src/environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  let dynamicTaskId: number = 0;

  const BASE_URL = environment.API_URL; 
  const mockTasks: PaginatedItems<ITaskView> = {
    totalRecords: 2,
    totalPages: 1,
    currentPage: 1,
    selectedPageSize: 5,
    totalItemsShowing: 2,
    items: [
      { taskId: 1, title: 'Mock Task 1', description: 'Description 1', dueDate: '2023-11-01', isCompleted: false, isRecordActive: true, createdAt: '', modifiedAt: '' },
      { taskId: 2, title: 'Mock Task 2', description: 'Description 2', dueDate: '2023-11-02', isCompleted: true, isRecordActive: true, createdAt: '', modifiedAt: '' },
    ],
  };

  const mockTask: ITaskView = {
    taskId: 1,
    title: 'Mock Task 1',
    description: 'Description 1',
    dueDate: '2023-11-01',
    isCompleted: false,
    isRecordActive: true,
    createdAt: '',
    modifiedAt: '',
  };

  const mockTaskPost: ITaskPost = {
    taskId: dynamicTaskId,
    title: 'Mock Task 1',
    description: 'Description 1',
    dueDate: '2023-11-01',
    isCompleted: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should insert a task', () => {
    service.insert(mockTaskPost).subscribe((response) => {
      expect(response).toEqual(mockTaskPost);
      dynamicTaskId = response.taskId;
    });

    const req = httpMock.expectOne(`${BASE_URL}/ToDo`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTaskPost);
    req.flush(mockTaskPost);
  });

  it('should fetch a single task by ID', () => {
    if (dynamicTaskId === null) {
      fail('dynamicTaskId is not set. Insert test must run first.');
    }

    service.getTask(dynamicTaskId).subscribe((response) => {
      expect(response).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${BASE_URL}/ToDo/ById/${dynamicTaskId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTask);
  });
  

  it('should update a task', () => {

    if (dynamicTaskId === null) {
      fail('dynamicTaskId is not set. Insert test must run first.');
    }

    const mockFetchedTask = { ...mockTaskPost, taskId: dynamicTaskId, description: 'Description 1 Modified'};

    service.update(mockFetchedTask).subscribe((response) => {
      expect(response).toEqual(mockFetchedTask);
      expect(req.request.body).toEqual(mockFetchedTask);
    });

    const req = httpMock.expectOne(`${BASE_URL}/ToDo`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockFetchedTask);
    req.flush(mockFetchedTask);
  });

  it('should delete a task', () => {
    if (dynamicTaskId === null) {
      fail('dynamicTaskId is not set. Insert test must run first.');
    }

    service.delete(dynamicTaskId).subscribe((response) => {
      expect(response).toBeNull(); // DELETE requests usually return null
    });

    const req = httpMock.expectOne(`${BASE_URL}/ToDo/${dynamicTaskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

});
