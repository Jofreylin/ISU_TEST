import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITaskView } from 'src/app/models/task.model';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  task: ITaskView | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const taskId = +this.route.snapshot.paramMap.get('taskId')!;
    this.loadTaskDetails(taskId);
  }

  loadTaskDetails(taskId: number): void {

    if(!taskId){
      return;
    }

    this.taskService.getTask(taskId).subscribe({
      next: (res) => {
        this.task = res;
      },
      error: () => {
        this.alertService.showErrorAlert('Error', 'Failed to retrieve task information.');
      }
    });
  }

}
