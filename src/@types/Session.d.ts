interface Session {
  accessToken: string;
  user: {
    id: string;
    name: string;
    username: string;
  }
}