'use client'
import React, { useActionState } from 'react'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { createComment } from '@/actions/create-comment'
import { useUser } from '@clerk/nextjs'

type CommentInputFeildProps = {
    articleId: string
}

const CommentInputFeild = ({articleId}: CommentInputFeildProps) => {

    const {user} = useUser();
    const [formState , action , isPending] = useActionState(createComment.bind(null , articleId), {errors: {}})

    return (
        <form action={action} className='mb-8'>
            <div className='flex gap-4'>
                <Avatar>
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                    <Input
                        type='text'
                        name='body'
                        placeholder='Add A Comment'
                    />
                    {
                        formState.errors.body && (<p className='text-red-600 text-sm'>{formState.errors.body}</p>)
                    }
                    <div className='mt-4 flex justify-end '>
                        <Button type='submit' disabled={isPending}>
                            {
                                isPending ? 'Loading...' : 'Post Comment'
                            }
                        </Button>
                    </div>
                    {
                        formState.errors.formError && (
                            <div className='p-2 border border-red-600 bg-red-100'>
                                {formState.errors.formError}
                            </div>
                        )
                    }
                </div>
            </div>
        </form >
    )
}

export default CommentInputFeild