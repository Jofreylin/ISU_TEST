import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewsEnum } from 'src/app/models/response.model';
import { TaskService } from 'src/app/services/task.service';
import { ITaskPost } from 'src/app/models/task.model';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  viewType = ViewsEnum.Create;
  taskId?: number;
  viewsEnum = ViewsEnum

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.viewType = +this.route.snapshot.paramMap.get('viewType')!;
    this.taskId = +this.route.snapshot.paramMap.get('taskId')!;
    
    this.taskForm = this.fb.group({
      taskId: [0],
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: [''],
      dueDate: ['', Validators.required],
      isCompleted: [false],
    });

    if (this.viewType === ViewsEnum.Edit && this.taskId) {
      this.loadTask(this.taskId);
    }
  }

  loadTask(taskId: number) {
    this.taskService.getTask(taskId).subscribe({
      next: (res) => {
        if(res){
          this.taskForm.patchValue(res);
        }
      },
      error: () => {
        this.alertService.showErrorAlert('Error', 'Failed to retrieve task information.');
      }
    });
  }

  onSubmit() {

    if(this.taskForm.invalid){
      this.alertService.showErrorAlert('Error', 'You have to fill all the required fields.');
      return;
    }

    if (this.viewType === ViewsEnum.Create) {
      this.insertData();
    } else {
      this.updateData();
    }
    
  }

  private insertData(){
    const task: ITaskPost = this.taskForm.getRawValue();
    this.taskService.insert(task).subscribe({
      next: (res) => {
        this.alertService.showSuccessAlert('Success', 'Task created successfully.');
        this.router.navigate(['/task-list']);
      },
      error: () => {
        this.alertService.showErrorAlert('Error', 'Failed to update task.');
      }
    });
  }

  private updateData(){
    const task: ITaskPost = this.taskForm.getRawValue();
    this.taskService.update(task).subscribe({
      next: (res) => {
        this.alertService.showSuccessAlert('Success', 'Task updated successfully.');
        this.router.navigate(['/task-list' ]);
      },
      error: () => {
        this.alertService.showErrorAlert('Error', 'Failed to update task.');
      }
    });
  }
}
