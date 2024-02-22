import { User } from "./UserTypes";

export type Organization = {
    id: string;
    name: string;
    owner: User;
    members: string[];
    createdAt: string;
    memberCount: number;
};
