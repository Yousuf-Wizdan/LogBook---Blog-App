import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { Prisma } from '@/app/generated/prisma'

type AllArticlePageProps = {
    articles: Prisma.ArticleGetPayload<{
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>[]
}

const AllArticlePage = async ({ articles }: AllArticlePageProps) => {

    if (articles.length <= 0) {
        return <NoSearchResultPage />
    }

    return (
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {
                articles.map((article) => (
                    <Link key={article.id} href={`/articles/${article.id}`}>
                        <Card className='group relative overflow-hidden translate-all hover:shadow-lg'>
                            <div className='p-6'>
                                <div className='relative mb-4 h-48 w-full overflow-hidden rounded-xl'>
                                    <Image
                                        src={article.featuredImage}
                                        alt='image'
                                        fill
                                        className='object-cover'
                                    />
                                </div>

                                <h3 className='text-xl font-semibold'>{article.title}</h3>
                                <p className='mt-2 text-sm'>{article.category}</p>

                                <div className='mt-6 flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <Avatar>
                                            <AvatarImage src={article.author.imageUrl || ''} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>

                                        <span className='text-sm'>
                                            {article.author.name}
                                        </span>
                                    </div>

                                    <div className='text-sm'>
                                        {article.createdAt.toDateString()}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>

                ))
            }

        </div>
    )
}

export default AllArticlePage

const NoSearchResultPage = () => {
    return (
        <div className='flex flex-col items-center justify-center p-8 text-center'>
            <div className='mb-4 rounded-full bg-muted p-4'>
                <SearchIcon className='h-8 w-8' />
            </div>
            <div>
                <h1 className='font-bold'>No Result Found!</h1>
            </div>

            <p className='mt-2 text-sm'>
                We could not find any article matching your search. Try different keywords or phrase
            </p>
        </div>
    )
}