import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../../core/service/api.service';
import { API_ROUTES } from '../../../core/constant/api.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emp-task-view',
  imports: [CommonModule],
  templateUrl: './emp-task-view.html',
  styleUrl: './emp-task-view.scss',
})
export class EmpTaskView {
  apiService = inject(ApiService);

  taskData = signal<any>([]);
  ngOnInit() {
    this.getTask();
  }
  async getTask() {
    const res = await this.apiService.request('GET', API_ROUTES.task.getByToken, null, null, {
      showLoader: true,
      useToken: true,
    });
    this.taskData.set(res.data);
  }
}
