export const API_ROUTES = {
  login: {
    base: 'auth/login',
    forgotPassword: 'auth/forgot-password',
  },
  dept: {
    deptView: 'department/view',
    deptAdd: 'department/add',
    deleteDept: (id: string) => `department/delete/${id}`,
    getById: (id: string | null) => `department/view/${id}`,
    editDept: (id: string | null) => `department/edit/${id}`,
  },
  user: {
    userView: 'user/view',
    userAdd: 'user/add',
    userDelete: (id: string) => `user/delete/${id}`,
    getById: (id: string | null) => `user/view/${id}`,
    userEdit: (id: string | null) => `user/edit/${id}`,
    getByToken: 'user/viewByToken',
    userEditByToken: 'user/editByToken',
  },
  project: {
    projectView: 'project/view',
    projectAdd: 'project/add',
    getByManger: 'project/viewByManager',
    getById: (id: string) => `project/view/${id}`,
    projectEdit: (id: string | null) => `project/edit/${id}`,
    projectDelete:(id:string)=>`project/delete/${id}`
  },
  projectMember: {
    memberAdd: 'project-member/add',
    getByProject: (projectId: string | undefined | null) =>
      `project-member/view-byProjectId/${projectId}`,
  },
  task: {
    taskAdd: 'task/add',
    getByManagerAndProjectId: (projectId: string | undefined) =>
      `task/viewBy-manager-projectId/${projectId}`,
    getByToken: 'task/viewByEmp',
  },
};
