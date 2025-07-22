'use client';

import { useOptimistic } from 'react';
import { Post } from '../types';
import LikeButton from './LikeButton';

interface PostListProps {
    initialPosts: Post[];
    likePostAction: (postId: number) => Promise<void>;
}

export default function PostListOptimistic({ initialPosts, likePostAction }: PostListProps) {
    // ★ useOptimistic を使う
    const [optimisticPosts, addOptimisticLike] = useOptimistic(
        initialPosts,
        (state, postId: number) =>
            state.map(p => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );

    return (
        <ul className="space-y-4">
            {optimisticPosts.map(post => (
                <li key={post.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                    <p className="font-semibold">{post.title}</p>

                    <form action={async () => {
                        // ★ UIを即時更新してから、サーバーのアクションを呼び出す
                        addOptimisticLike(post.id);
                        await likePostAction(post.id);
                    }}>
                        <div className="flex items-center space-x-4">
                            <span>{post.likes} いいね</span>
                            <LikeButton isOptimistic={true} />
                        </div>
                    </form>
                </li>
            ))}
        </ul>
    );
}