import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailsComponent } from './task-details.component';
import { TaskService } from 'src/app/services/task.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { ITaskView } from 'src/app/models/task.model';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockAlertService: jasmine.SpyObj<AlertService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockTask: ITaskView = {
    taskId: 1,
    title: 'Test Task',
    description: 'Test Description',
    dueDate: '2023-11-15',
    isCompleted: false,
    createdAt: '2023-11-10T10:00:00Z',
    modifiedAt: '2023-11-11T12:00:00Z',
    isRecordActive: true
  };

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTask']);
    mockAlertService = jasmine.createSpyObj('AlertService', ['showErrorAlert']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [TaskDetailsComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1', // Mock the taskId parameter
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve and display task details', () => {
    // Arrange
    mockTaskService.getTask.and.returnValue(of(mockTask));

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    expect(mockTaskService.getTask).toHaveBeenCalledWith(1);
    expect(component.task).toEqual(mockTask);

    fixture.detectChanges();

    const titleInput = fixture.debugElement.nativeElement.querySelector('#title-input ');
    const descriptionTextarea = fixture.debugElement.nativeElement.querySelector('#description-input ');
    const completedInput = fixture.debugElement.nativeElement.querySelector('#completed-input ');

    expect(titleInput.value).toBe('Test Task');
    expect(descriptionTextarea.value).toBe('Test Description');
    expect(completedInput.value).toBe('No');
  });

  it('should handle error when task retrieval fails', () => {
    mockTaskService.getTask.and.returnValue(throwError(() => new Error('Failed')));

    component.ngOnInit();

    expect(mockTaskService.getTask).toHaveBeenCalledWith(1);
    expect(mockAlertService.showErrorAlert).toHaveBeenCalledWith('Error', 'Failed to retrieve task information.');
  });
});
