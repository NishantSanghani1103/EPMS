import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = inject(ToastrService);

  success(msg: string) {
    this.toast.success(msg);
  }
  error(msg: string) {
    console.log(msg);
    
    this.toast.error(msg);
  }
}
