import EditArticlePage from '@/components/articles/EditArticlePage'
import React from 'react'
import {prisma} from '../../../../../lib/prisma'

type EditArticleParams = {
    params: Promise<{id: string}>
}

const page = async ({params}: EditArticleParams) => {
  const {id} = await params;
  const article = await prisma.article.findUnique({
    where: {id}
  })

  if(!article){
    return <h1>Article Not Found For this ID</h1>
  }

  return (
    <div>
        <EditArticlePage article={article}/>
    </div>
  )
}

export default page