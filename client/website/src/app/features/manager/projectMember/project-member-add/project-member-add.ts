import { Component } from '@angular/core';

@Component({
  selector: 'app-project-member-add',
  imports: [],
  templateUrl: './project-member-add.html',
  styleUrl: './project-member-add.scss',
})
export class ProjectMemberAdd {
  ngOnInit() {
    this.getProjectById();
  }

  async getProjectById() {
    
  }
}
