import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../core/service/loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  loading = inject(LoaderService);
}
