export type User = {
  id: string;
  name: string;
  email: string;
  links: Link[];
};

export type Link = {
  id: string;
  createdAt?: string;
  description: string;
  url: string;
  postedBy?: User;
  votes?: Vote[];
};

export type Vote = {
  id: string;
  link: Link;
  user: User;
};

export type AuthPayload = {
  token?: string;
  user?: User
};

export enum LinkOrderByInput {
  description_ASC,
  description_DESC,
  url_ASC,
  url_DESC,
  createdAt_ASC,
  createdAt_DESC,
}

export type Feed = {
  links: Link[];
  count: number;
};
