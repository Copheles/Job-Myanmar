declare namespace Express {
  export interface Request {
    user: UserPayload;
  }
}


interface UserPayload {
  userId: string;
}
