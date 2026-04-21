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

export type AppHonoType = { Bindings: Env; Variables: AppVariables };
