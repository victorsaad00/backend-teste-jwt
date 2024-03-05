declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      DB_CONNECTION: string;
      DB_NAME: string;
      JWT_SECRET: string;
    }
  }
}

export {};
