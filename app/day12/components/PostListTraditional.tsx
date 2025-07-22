'use client';

import { Post } from '../types';
import LikeButton from './LikeButton';

interface PostListProps {
    initialPosts: Post[];
    likePostAction: (postId: number) => Promise<void>;
}

export default function PostListTraditional({ initialPosts, likePostAction }: PostListProps) {
    // ★ useOptimistic は使わない
    const posts = initialPosts;

    return (
        <ul className="space-y-4">
            {posts.map(post => (
                <li key={post.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                    <p className="font-semibold">{post.title}</p>

                    <form action={async () => {
                        // ★ サーバーのアクションを呼び出すだけ
                        await likePostAction(post.id);
                    }}>
                        <div className="flex items-center space-x-4">
                            <span>{post.likes} いいね</span>
                            <LikeButton isOptimistic={false} />
                        </div>
                    </form>
                </li>
            ))}
        </ul>
    );
}