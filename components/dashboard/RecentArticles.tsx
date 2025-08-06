'use client'
import React, { useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Prisma } from '../../app/generated/prisma'
import { deleteArticle } from '@/actions/delete-article'

type RecentArticlesProp = {
    articles: Prisma.ArticleGetPayload<{
        include: {
            comments: true,
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>[];
}

const RecentArticles = ({ articles }: RecentArticlesProp) => {
    return (
        <Card className='mb-8'>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle>Recent Articles</CardTitle>
                    <Button className='text-muted-foreground' size={'sm'} variant={'ghost'}>View All</Button>
                </div>
            </CardHeader>

            {
                !articles.length ? (
                    <CardContent>No Article Found</CardContent>
                ) : (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Comments</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {
                                    articles.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell>{article.title}</TableCell>
                                            <TableCell>
                                                <Badge variant={'outline'} className='rounded-full bg-green-100 text-green-800'>Published</Badge>
                                            </TableCell>
                                            <TableCell>{article.comments.length}</TableCell>
                                            <TableCell>{article.createdAt.toDateString()}</TableCell>
                                            <TableCell>
                                                <div className='flex gap-2'>
                                                    <Link href={`/dashboard/articles/${article.id}/edit`}>
                                                        <Button variant={'ghost'} size={'sm'}>
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <DeleteButton articleId={article.id} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                )
            }

        </Card>

    )
}

export default RecentArticles

type DeleteButtonProps = {
    articleId: string
}

const DeleteButton = ({ articleId }: DeleteButtonProps) => {
    const [isPending , startTransition] = useTransition();
    return (
        <form action={() => {
            startTransition(async () => {
                deleteArticle(articleId)
            })
        }}>
            <Button disabled={isPending} variant={'ghost'} size={'sm'} type='submit'>
                {isPending ? "Loading..." : "Delete"}
            </Button>
        </form>
    )
}