'use client'
import React, { useOptimistic, useTransition } from 'react'
import { Button } from '../ui/button'
import { Bookmark, Share2, ThumbsUp } from 'lucide-react'
import { likeDislikeToggle } from '@/actions/like-dislike'
import { Like } from '@/app/generated/prisma'

type LikeButtonProps = {
    articleId: string,
    likes: Like[],
    isLiked: boolean
}

const LikeButton = ({ articleId, likes, isLiked }: LikeButtonProps) => {

    const [optimisticLike, setOptimisticLike] = useOptimistic(likes.length)
    const [isPending, startTransition] = useTransition();

    const handleLikeDislile = async () => {
        startTransition(async () => {
            setOptimisticLike(isLiked ? optimisticLike - 1 : optimisticLike + 1)
            await likeDislikeToggle(articleId)
        })
    }

    return (
        <div className='flex gap-4 mb-12 border-t pt-8'>


            <form action={handleLikeDislile}>
                <Button disabled={isPending} type='submit' className='gap-2' variant={'ghost'}>
                    <ThumbsUp className='h-5 w-5' />
                    {optimisticLike}
                </Button>

                <Button variant={'ghost'} className='gap-2'>
                    <Bookmark className='w-5 h-5' />
                </Button>

                <Button variant={'ghost'} className='gap-2'>
                    <Share2 className='w-5 h-5' />
                </Button>
            </form>
        </div>
    )
}

export default LikeButton