'use client'
import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { SearchAction } from '@/actions/search'
import { useSearchParams } from 'next/navigation'

const ArticleSearhBar = () => {

  const searchParams = useSearchParams();

  return (
    <form action={SearchAction} className='mx-auto max-w-2xl'>
      <div className='relative'>
        <Search className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2' />
        <Input defaultValue={searchParams.get('search') || ''} type='text' name='search' placeholder='Search Articles...' className='w-full pl-10 pr-4 py-6 text-lg' />
      </div>
    </form>
  )
}

export default ArticleSearhBar