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
  DB: D1Database;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK: string;

  APP_GOOGLE_AUTH_REDIRECT: string;
};

export type AppHonoType = { Bindings: Bindings; Variables: AppVariables };
