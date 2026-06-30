import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-admin-layouts',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layouts.html',
  styleUrl: './admin-layouts.scss',
})
export class AdminLayouts {
  router = inject(Router);
  authService = inject(AuthService);
}
