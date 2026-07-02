export interface projectMemberResponse {
  id: string;
  projectId: string;
  userId: string;
  notes: string | null;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
  user: ProjectMemberUser;
  project: ProjectInfo;
}

export interface ProjectMemberUser {
  profileImageUrl: string | null;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
  status: string;
}

export interface ProjectInfo {
  name: string;
}
