import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-manager-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './manager-layout.html',
  styleUrl: './manager-layout.scss',
})
export class ManagerLayout {
  router = inject(Router);
  authService = inject(AuthService);
}
