'use server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { redirect } from 'next/navigation'
import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const editArticleSchema = z.object({
    title: z.string().min(3).max(100),
    category: z.string().min(3).max(50),
    content: z
        .string()
        .transform((val) => val.trim())
        .refine(
            (val) => {
                const stripped = val.replace(/<[^>]*>?/gm, "").trim();
                return stripped.length > 0;
            },
            { message: "Content cannot be empty" }
        ),
})

type CreateArticlesFormState = {
    errors: {
        title?: string[],
        category?: string[],
        featuredImage?: string[],
        content?: string[],
        formErrors?: string[]
    }
}

export const editArticle = async (articleId: string, prevState: CreateArticlesFormState, formData: FormData): Promise<CreateArticlesFormState> => {
    //  ));

    const result = editArticleSchema.safeParse({
        title: formData.get('title'),
        category: formData.get('category'),
        content: formData.get('content')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    console.log(result)

    const { userId } = await auth();

    if (!userId) {
        return {
            errors: {
                formErrors: ['You have to login first']
            }
        }
    }

    const exisitingArticle = await prisma.article.findUnique({
        where: { id: articleId }
    })

    if (!exisitingArticle) {
        return {
            errors: {
                formErrors: ['Article Not Found']
            }
        }
    }

    const exisitingUser = await prisma.user.findUnique({
        where: { clerkId: userId }
    })
    if (!exisitingUser || exisitingArticle.authorId != exisitingUser.id) {
        return {
            errors: {
                formErrors: ["User Not Found! Please Register Before Creating an Article"]
            }
        }
    }

    let imageUrl = exisitingArticle.featuredImage;


    const imageFile = formData.get('featuredImage') as File | null
    if (imageFile && imageFile.name !== "undefined") {
        try {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResponse: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            resolve(result)
                        }
                    }
                );
                uploadStream.end(buffer);

                if (uploadResponse?.secure_url) {
                    imageUrl = uploadResponse.secure_url
                } else {
                    return {
                        errors: {
                            featuredImage: ['Failed to upload the image! Please Try Again']
                        }
                    }
                }
            })
        } catch (err) {
            return {
                errors: {
                    formErrors: ['Error Uploading image. Please Try Again']
                }
            }
        }
    }

    if (!imageUrl) {
        return {
            errors: {
                featuredImage: ["Failed to upload image. Please try again"]
            }
        }
    }

    try {
        await prisma.article.update({
            where: { id: articleId },
            data: {
                title: result.data.title,
                category: result.data.category,
                content: result.data.content,
                featuredImage: imageUrl,
            }
        })

    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    formErrors: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    formErrors: ['Some Internal Server Error Occured']
                }
            }
        }

    }

    revalidatePath('/dashboard')
    redirect("/dashboard")
}