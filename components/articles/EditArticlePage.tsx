'use client'
import React, { FormEvent, startTransition, useActionState, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import dynamic from 'next/dynamic'
import { Button } from '../ui/button'
import 'react-quill-new/dist/quill.snow.css';
import { createArticle } from '@/actions/create-article'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import type { Article } from '../../app/generated/prisma'
import Image from 'next/image'
import { editArticle } from '@/actions/edit-article'

type EditArticleProps = {
    article: Article
}

const EditArticlesPage = ({ article }: EditArticleProps) => {
    const [content, setContent] = useState(article.content)
    const [formState, action, isPending] = useActionState(editArticle.bind(null , article.id), { errors: {} })
    console.log(formState)
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append("content", content)

        startTransition(() => {
            action(formData)
        })
    }

    return (
        <div className='max-w-4xl mx-auto p-6'>
            <Card>
                <CardHeader>
                    <CardTitle>Create New Article</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-2'>
                            <Input
                                type='text'
                                name='title'
                                placeholder='Enter a article title'
                                defaultValue={article.title}
                            />
                            {formState.errors.title && <span className='text-red-600 text-sm'>{formState.errors.title}</span>}
                        </div>
                        <div className='space-y-2'>
                            <Label>Category</Label>
                            <select defaultValue={article.category} name='category' id='category' className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                <option value={""}>Select Category</option>
                                <option value={"technology"}>Technology</option>
                                <option value={"programming"}>Programming</option>
                                <option value={"webdevelopment"}>Web Development</option>
                            </select>
                            {formState.errors.category && <span className='text-red-600 text-sm'>{formState.errors.category}</span>}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='featuredImage'>Featured Image</Label>
                            <Input
                                type='file'
                                id='featuredImage'
                                name='featuredImage'
                                accept='image/*'
                            />
                            {article.featuredImage && (
                                <Image
                                    src={article.featuredImage}
                                    alt='image'
                                    width={100}
                                    height={100}
                                    className='object-cover rounded-md'
                                />
                            )}
                        </div>
                        <div className='space-y-2'>
                            <Label>Content</Label>
                            <ReactQuill
                                theme='snow'
                                value={content}
                                onChange={setContent}
                            />
                            {/* <input type='hidden' name='content' value={content} /> */}
                            {formState.errors.content && (
                                <span className="font-medium text-sm text-red-500">
                                    {formState.errors.content[0]}
                                </span>
                            )}
                        </div>
                        {formState.errors.formErrors && (
                            <div className="dark:bg-transparent bg-red-100 p-2 border border-red-600">
                                <span className="font-medium text-sm text-red-500">
                                    {formState.errors.formErrors}
                                </span>
                            </div>
                        )}

                        <div className='flex justify-end gap-4'>
                            {/* <Button variant={'outline'}>Cancel</Button> */}
                            <Button variant={'outline'} type='submit' disabled={isPending}>
                                {
                                    isPending ? "Loading..." : "Edit Article"
                                }
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditArticlesPage