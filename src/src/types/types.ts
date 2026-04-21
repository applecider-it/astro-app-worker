type UserSession = {
  exp: number;
  user: {
    id: number;
    email: string;
    name: string;
  };
};

type AppVariables = {
  user: UserSession;
};

export type AppHonoType = { Bindings: Env; Variables: AppVariables };
