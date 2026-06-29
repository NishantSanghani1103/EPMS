import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layouts',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-layouts.html',
  styleUrl: './admin-layouts.scss',
})
export class AdminLayouts {}
