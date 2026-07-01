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
import { Unauthorized } from './shared/compoments/unauthorized/unauthorized';
import { ProjectView } from './features/admin/project/project-view/project-view';
import { ProjectAdd } from './features/admin/project/project-add/project-add';
import { ManagerDashboard } from './features/manager/manager-dashboard/manager-dashboard';
import { ManagerProjectListing } from './features/manager/project/manager-project-listing/manager-project-listing';
import { TaskCreate } from './features/manager/task-create/task-create';
import { ProjectMemberView } from './features/manager/projectMember/project-member-view/project-member-view';
import { ProjectMemberAdd } from './features/manager/projectMember/project-member-add/project-member-add';
import { ProjectWorkspace } from './features/manager/project/project-workspace/project-workspace';

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
    path: 'unauthorized',
    component: Unauthorized,
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
            path: 'edit/:id',
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
            path: 'edit/:id',
            component: UserAdd,
          },
          {
            path: 'view',
            component: UserView,
          },
        ],
      },
      {
        path: 'project',
        children: [
          {
            path: 'add',
            component: ProjectAdd,
          },
          {
            path: 'view',
            component: ProjectView,
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
    children: [
      {
        path: 'dashboard',
        component: ManagerDashboard,
      },
      {
        path: 'myProject',
        component: ManagerProjectListing,
      },
      {
        path: 'project-workSpace/:projectId',
        component: ProjectWorkspace,
        children: [
          {
            path: 'member',
            children: [
              {
                path: 'add',
                component: ProjectMemberAdd,
              },
              {
                path: 'view',
                component: ProjectMemberView,
              },
            ],
          },
        ],
      },

      {
        path: 'task',
        children: [
          {
            path: 'add',
            component: TaskCreate,
          },
        ],
      },
    ],
  },
];
