'use client'
import { SearchAction } from '@/actions/search'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const SearchInput = () => {

  const params = useSearchParams();

  return (
    <form action={SearchAction}>
        <div className='relative'>
            <SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'/>
            <Input
                className='pl-10 w-48 focus-visible:ring-1'
                type='text'
                name='search'
                placeholder='Search Article...' 
                defaultValue={params.get('search') || ''}
                />
        </div>
    </form>
  )
}

export default SearchInput