import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manager-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './manager-layout.html',
  styleUrl: './manager-layout.scss',
})
export class ManagerLayout {
  router=inject(Router)
}
