export const API_ROUTES = {
  login: {
    base: 'auth/login',
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
  },
  project: {
    projectView: 'project/view',
    projectAdd: 'project/add',
    getByManger: 'project/viewByManager',
  },
};
