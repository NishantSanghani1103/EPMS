import { Routes } from '@angular/router';
import { AdminLayouts } from './features/admin/admin-layouts/admin-layouts';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { DepartmentView } from './features/admin/department/department-view/department-view';
import { DepartmentAdd } from './features/admin/department/department-add/department-add';
import { Login } from './auth/login/login';
import { authGuard } from './core/guard/auth-guard';
import { ManagerLayout } from './features/manager/manager-layout/manager-layout';
import { UserView } from './features/admin/user/user-view/user-view';
import { UserAdd } from './features/admin/user/user-add/user-add';

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

  // for the admin

  {
    path: 'admin',
    component: AdminLayouts,
    canActivate: [authGuard],
    data: {
      role: ['admin'],
    },
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
      {
        path: 'user',
        children: [
          {
            path: 'add',
            component: UserAdd,
          },
          {
            path: 'view',
            component: UserView,
          },
        ],
      },
    ],
  },

  // for the manager

  {
    path: 'manager',
    component: ManagerLayout,
    canActivate: [authGuard],
    data: {
      role: ['manager'],
    },
  },
];
