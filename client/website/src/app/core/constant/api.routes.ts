export const API_ROUTES = {
  login: {
    base: 'auth/login',
  },
  dept: {
    deptView: 'department/view',
    deleteDept: (id: string) => `department/delete/${id}`,
  },
};
