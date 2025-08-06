'use server'

import { auth } from "@clerk/nextjs/server"
import {prisma} from '../lib/prisma'
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
    const {userId} = await auth();

    if(!userId){
        return {
            errors: {
                formErrors: ['You have to login first']
            }
        }
    }

    await prisma.article.delete({
        where: {id: articleId}
    }) 

    revalidatePath('/dashboard')

}