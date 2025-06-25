import DataLoader from "dataloader";
import { Post, User } from "./types";
import { cache } from "react";

export async function getPosts(): Promise<{ posts: Post[] }> {
    const res = await fetch("https://dummyjson.com/posts");
    return res.json();
}

const getUserLoader = cache(
    () => new DataLoader<number, User | null>(batchGetUsers)
);

export async function getUser(id: number): Promise<User | null> {
    return getUserLoader().load(id);
}

async function batchGetUsers(
    keys: readonly number[]
): Promise<(User | null)[]> {
    const query = keys.map((id) => `id=${id}`).join("&");
    const res = await fetch(`https://dummyjson.com/users?${query}`);
    const data = await res.json();
    const users: User[] = data.users ?? [];

    return keys.map((key) => users.find((u) => u.id === key) ?? null);
}
