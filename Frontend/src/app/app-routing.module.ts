import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'task-list',
    pathMatch: 'full'
  },
  {
    path: 'task-list',
    component: TaskListComponent
  },
  {
    path: 'task-form/:viewType',
    component: TaskFormComponent
  },
  {
    path: 'task-form/:viewType/:taskId',
    component: TaskFormComponent
  },
  {
    path: 'task-details/:taskId',
    component: TaskDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
