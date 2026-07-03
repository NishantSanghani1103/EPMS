import { Component, effect, inject } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  imports: [],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.scss',
})
export class EmployeeDashboard {
  employee = inject<any>(ROUTER_OUTLET_DATA);


  constructor() {
    effect(() => {
      console.log(this.employee());
    });
  }
}
