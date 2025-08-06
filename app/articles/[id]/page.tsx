import React from 'react'
import {prisma} from '@/lib/prisma'
import ArticleDetailPage from '@/components/articles/ArticleDetailPage'

type ArticleDetailsPageProp = {
    params: Promise<{id: string}>
}

const page = async ({params}:  ArticleDetailsPageProp) => {
    const {id} = await params;

    const article = await prisma?.article.findUnique({
        where: {id},
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

    if(!article){
        return <h1>Article Not Found!!</h1>
    }
  return (
    <div>
        <ArticleDetailPage article={article} />
    </div>
  )
}

export default page