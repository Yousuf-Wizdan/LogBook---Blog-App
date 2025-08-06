import React from 'react'

const ArticleDetailPageLoading = () => {
  return (
    <div>
        <div className='min-h-screen bg-background'>
            <main className='container mx-auto py-12 px-4 sm:px-6 lg:px-8'>
            <div className='animate-pulse space-y-4'>
                <div className='h-8 bg-gray-200 rounded w-1/3'></div>
                <div className='h-6 bg-gray-200 rounded w-1/4'></div>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
            </div>
            </main>
        </div>
    </div>
  )
}

export default ArticleDetailPageLoading