import React from 'react'
import {Prisma} from '../../app/generated/prisma'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import LikeButton from './LikeButton'
import { CommentList } from '../comments/CommentList'
import CommentInputFeild from '../comments/CommentInputFeild'
import {prisma} from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

type ArticleDetailsPageProp = {
    article: Prisma.ArticleGetPayload<{
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>
}

const ArticleDetailPage = async ({article}: ArticleDetailsPageProp) => {
    
    const {userId} = await auth();

    const comments = await prisma.comment.findMany({
        where: {articleId: article.id},
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    })
    
    const likes = await prisma.like.findMany({
        where: {articleId: article.id}
    })

    const user = await prisma.user.findUnique({
        where: {clerkId: userId as string}
    })

    const isLiked: boolean = likes.some((like) => like.userId === user?.id);

  return (
    <div className='min-h-screen bg-background'>
        <main className='container mx-auto py-12 px-4 sm:px-6 lg:px-8'>
            <article className='mx-auto max-w-3xl'>
                <header className='mb-12'>
                    <div className='flex flex-wrap gap-2 mb-4'>
                        <span className='px-3 py-1 text-sm'>
                            {article.category}
                        </span>
                    </div>

                    <h1 className='text-4xl font-bold mb-4'>{article.title}</h1>

                    <div className='flex items-center gap-4'>
                        <Avatar>
                            <AvatarImage src={article.author.imageUrl || ''} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div>
                            <p className='font-medium'>{article.author.name}</p>
                            <p className='text-sm'>{article.createdAt.toDateString()}</p>
                        </div>
                    </div>
                </header>

                <section className='mb-12 max-w-none' dangerouslySetInnerHTML={{__html:article.content}}/>

                {/* Article Action Button */}

                <LikeButton 
                    articleId={article.id}
                    likes={likes}
                    isLiked={isLiked}
                    />

                <CommentInputFeild articleId={article.id} />

                <CommentList comments={comments} />
            </article>
        </main>
    </div>
  )
}

export default ArticleDetailPage