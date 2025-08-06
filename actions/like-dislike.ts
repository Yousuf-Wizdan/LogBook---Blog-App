'use server'

import { auth } from "@clerk/nextjs/server"
import { prisma } from '@/lib/prisma'
import { revalidatePath } from "next/cache";

export const likeDislikeToggle = async (articleId: string) => {
    const {userId} = await auth();

    if(!userId){
        throw new Error('User Not Authenticated!!')
    }

    const user = await prisma.user.findUnique({
        where: {clerkId: userId}
    })

    if(!user){
        throw new Error('User does not exist in the DB!!')
    }

    const existingLike = await prisma.like.findFirst({
        where: {articleId, userId: user.id}
    })

    if(existingLike){
        // dislike
        await prisma.like.delete({
            where: {id: existingLike.id}
        })
    }else{
        // like
        await prisma.like.create({
            data: {
                articleId,
                userId: user.id
            }
        })
    }

    revalidatePath(`/articles/${articleId}`)
}