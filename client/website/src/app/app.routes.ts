import { Routes } from '@angular/router';
import { AdminLayouts } from './features/admin/admin-layouts/admin-layouts';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { DepartmentView } from './features/admin/department/department-view/department-view';
import { DepartmentAdd } from './features/admin/department/department-add/department-add';
import { Login } from './auth/login/login';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Login,
  },
  {
    path: 'admin',
    component: AdminLayouts,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboard,
      },
      {
        path: 'department',
        children: [
          {
            path: 'add',
            component: DepartmentAdd,
          },
          {
            path: 'view',
            component: DepartmentView,
          },
        ],
      },
    ],
  },
];
