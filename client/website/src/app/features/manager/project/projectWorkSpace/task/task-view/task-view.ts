import { Component, Input, signal } from '@angular/core';
import { ApiService } from '../../../../../../core/service/api.service';
import { API_ROUTES } from '../../../../../../core/constant/api.routes';
import { taskType } from '../../../../../../core/models/task.model';
import { CommonModule, NgClass } from '@angular/common';


@Component({
  selector: 'app-task-view',
  imports: [NgClass,CommonModule],
  templateUrl: './task-view.html',
  styleUrl: './task-view.scss',
})
export class TaskView {
  @Input() projectId!: string | undefined;
  taskData = signal<taskType[]>([]);
  constructor(private apiSerivce: ApiService) {}

  ngOnInit() {
    this.getTask();
  }

  async getTask() {
    const res = await this.apiSerivce.request<taskType[]>(
      'GET',
      API_ROUTES.task.getByManagerAndProjectId(this.projectId),
      null,
      null,
      {
        showLoader: true,
        useToken: true,
      },
    );
    console.log(res);

    this.taskData.set(res.data ?? []);
  }
}
