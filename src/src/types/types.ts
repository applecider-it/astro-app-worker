type AuthSession = {
  exp: number;
  user: {
    id: number;
    email: string;
    name: string;
  };
};

type AppVariables = {
  auth: AuthSession;
};

type Bindings = {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK: string;
  DB: D1Database;
};

export type AppHonoType = { Bindings: Bindings; Variables: AppVariables };
