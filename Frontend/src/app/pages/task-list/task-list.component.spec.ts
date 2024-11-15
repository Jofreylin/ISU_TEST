import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from 'src/app/services/task.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { PaginatedItems } from 'src/app/models/response.model';
import { ITaskView } from 'src/app/models/task.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;
  let mockAlertService: jasmine.SpyObj<AlertService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockResponse : PaginatedItems<ITaskView> = {
    items: [
      { taskId: 1, title: 'Test Task 1',  dueDate: '2023-11-01', isCompleted: false, isRecordActive: true },
      { taskId: 2, title: 'Test Task 2', dueDate: '2023-11-02', isCompleted: true, isRecordActive: true },
    ],
    totalRecords: 2,
    totalPages: 1,
    currentPage: 1,
    selectedPageSize: 5,
    totalItemsShowing: 2
  };

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getList']);
    mockAlertService = jasmine.createSpyObj('AlertService', ['showSuccessAlert', 'showErrorAlert']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    mockTaskService.getList.and.returnValue(of(mockResponse));

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    component.ngOnInit();

    expect(mockTaskService.getList).toHaveBeenCalledOnceWith({
      searchValue: '',
      pageNumber: 1,
      pageSize: 5,
    });

    expect(component.tasks.length).toBe(2);
    expect(component.totalRecords).toBe(2);
  });

  it('should display task data in the table', () => {
    component.ngOnInit();
    fixture.detectChanges(); // Trigger change detection to update the view

    const compiled = fixture.nativeElement as HTMLElement;

    // Verify the task titles are displayed in the table
    expect(compiled.querySelector('table')?.textContent).toContain('Test Task 1');
    expect(compiled.querySelector('table')?.textContent).toContain('Test Task 2');
  });
});
