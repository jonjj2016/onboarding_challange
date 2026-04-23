declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      sub: string;
      name: string;
      email: string;
    };
  }
}

export {};
