declare namespace Express {
  interface Request {
    user?: {
      sub: string;
      name: string;
      email: string;
    };
  }
}
