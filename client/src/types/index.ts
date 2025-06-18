export interface Story {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
}

export interface Rating {
  userId: string;
  storyId: number;
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  userId: string;
  storyId: number;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  userId: string;
  username: string;
}
