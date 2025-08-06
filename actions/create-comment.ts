'use server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const createCommentSchema = z.object({
    body: z.string().min(1)
})

type CreateCommentFormState = {
    errors: {
        body?: string[],
        formError?: string[]
    }
}

export const createComment = async (articleId: string, prevState: CreateCommentFormState, formData: FormData): Promise<CreateCommentFormState> => {
    const result = createCommentSchema.safeParse({ body: formData.get('body') })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const { userId } = await auth();

    if (!userId) {
        return {
            errors: {
                formError: ['You have to login First!!']
            }
        }
    }

    const existingUser = await prisma.user.findUnique({
        where: { clerkId: userId }
    })

    if (!existingUser) {
        return {
            errors: {
                formError: ['User Not Found. Please register before adding comment']
            }
        }
    }

    try {
        await prisma.comment.create({
            data: {
                content: result.data.body,
                authorId: existingUser.id,
                articleId
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    formError: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    formError: ['Error Occured While adding comment']
                }
            }
        }
    }

    revalidatePath(`/articles/${articleId}`)
    return { errors: {} }
} 