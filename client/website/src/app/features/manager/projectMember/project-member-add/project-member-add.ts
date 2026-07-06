import { Component, inject } from '@angular/core';
import { ApiService } from '../../../../core/service/api.service';

@Component({
  selector: 'app-project-member-add',
  imports: [],
  templateUrl: './project-member-add.html',
  styleUrl: './project-member-add.scss',
})
export class ProjectMemberAdd {
  apiService = inject(ApiService);
  
  ngOnInit() {
    this.getProjectById();
  }

  async getProjectById() {}
}
