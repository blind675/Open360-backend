export type Project = {
  _id: string;
  url: string;
  title: string;
  description: string;
  iconImg?: string;
  tagLine: string;
  backgroundImg: string;
  progress: string;
  followersEmails?: string[];
  lastUpdatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type NewProject = {
  url: string;
  title: string;
  description: string;
  iconImg?: string;
  tagLine: string;
  backgroundImg: string;
  progress: string;
  followersEmails?: string[];
};
