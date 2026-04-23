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

  APP_GOOGLE_CLIENT_ID: string;
  APP_GOOGLE_CLIENT_SECRET: string;
  APP_GOOGLE_CALLBACK: string;

  APP_GOOGLE_AUTH_REDIRECT: string;
};

export type AppHonoType = { Bindings: Bindings; Variables: AppVariables };
