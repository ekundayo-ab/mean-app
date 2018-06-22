export interface AuthResponse {
  user: {
    _id: string,
    email: string
  },
  token: string;
}
