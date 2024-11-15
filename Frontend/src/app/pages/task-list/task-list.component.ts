import { Component, ElementRef, ViewChild } from '@angular/core';
import { IQueryParameters, ViewsEnum } from 'src/app/models/response.model';
import { ITaskView } from 'src/app/models/task.model';
import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  tasks: ITaskView[] = [];
  totalRecords = 0;
  pageSize = 5;
  currentPage = 1;
  searchValue!: string;
  displayedColumns: string[] = ['title', 'dueDate', 'isCompleted', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("searchInput") searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private taskService: TaskService,
    private alertService: AlertService, // Assuming you have this service for alerts
    private cdf: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getList(this.currentPage, this.pageSize);
  }

  getList(pageNumber: number = 1, pageSize: number = 5): void {
    const params: IQueryParameters = {
      searchValue: this.searchValue ?? "",
      pageNumber: pageNumber,
      pageSize: pageSize
    };


    this.taskService.getList(params).subscribe({
      next: (res) => {
        this.tasks = [...res.items];
        this.totalRecords = res.totalRecords;
        this.currentPage = res.currentPage;
        this.pageSize = res.selectedPageSize;

        this.cdf.detectChanges();
      },
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1; 
    this.pageSize = event.pageSize;
    this.getList(this.currentPage, this.pageSize);
  }

  doSearch(): void{
    this.searchValue = this.searchInput.nativeElement.value;
    this.getList(this.currentPage, this.pageSize);
  }

  navigateToAdd(): void {
    this.router.navigate(['/task-form', ViewsEnum.Create ]);
  }

  navigateToEdit(taskId: number): void {
    this.router.navigate(['/task-form',  ViewsEnum.Edit, taskId ]);
  }

  navigateToDetails(taskId: number): void {
    this.router.navigate(['/task-details', taskId ]);
  }

  deleteTask(taskId: number) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(taskId).subscribe({
          next: (res) => {
            this.alertService.showSuccessAlert('Success', 'Task deleted successfully.');
            this.getList(this.currentPage, this.pageSize);
          },
          error: () => {
            this.alertService.showErrorAlert('Error', 'Failed to update task.');
          }
        });
      }
    });

    
  }
}
