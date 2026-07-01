import { Component, inject, signal } from '@angular/core';
import { MembersView } from '../projectWorkSpace/members-view/members-view';
import { RouterOutlet, RouterLinkWithHref, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-workspace',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './project-workspace.html',
  styleUrl: './project-workspace.scss',
})
export class ProjectWorkspace {
  activatedRoutes = inject(ActivatedRoute);
  projectId = signal<string>('');
  ngOnInit() {
    const id = this.activatedRoutes.snapshot.paramMap.get('projectId');
    this.projectId.set(id ?? '');
  }
}
