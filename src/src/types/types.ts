type UserSession = {
  id: number;
  email: string;
  exp: number;
};

type AppVariables = {
  user: UserSession;
};

export type AppHonoType = { Bindings: Env; Variables: AppVariables };
