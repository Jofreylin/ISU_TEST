import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITaskPost, ITaskView } from '../models/task.model';
import { IQueryParameters, PaginatedItems } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly BASE_URL = environment.API_URL;
  
  constructor(private httpClient: HttpClient) { }

  getList(params: IQueryParameters) {
    return this.httpClient.get<PaginatedItems<ITaskView>>(`${this.BASE_URL}/ToDo/List`, {
      params: <any>{
        searchValue: params.searchValue,
        pageNumber: params.pageNumber,
        pageSize: params.pageSize
      }
    });
  }

  getTask(taskId: number) {
    return this.httpClient.get<ITaskView | null>(`${this.BASE_URL}/ToDo/ById/${taskId}`);
  }

  insert(model: ITaskPost){
    return this.httpClient.post<ITaskPost>(`${this.BASE_URL}/ToDo`,model);
  }

  update(model: ITaskPost){
    return this.httpClient.put<ITaskPost>(`${this.BASE_URL}/ToDo`,model);
  }

  delete(taskId: number){
    return this.httpClient.delete<null>(`${this.BASE_URL}/ToDo/${taskId}`);
  }
}
