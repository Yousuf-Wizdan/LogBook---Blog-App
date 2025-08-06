import { Suspense } from 'react'
import AllArticlePage from '@/components/articles/AllArticlePage'
import ArticleSearhBar from '@/components/articles/ArticleSearhBar'
import { Button } from '@/components/ui/button'
import { fetchArticleByQuery } from '@/lib/query/fetch-article-by-query'
import Link from 'next/link'

interface PageProps {
  searchParams?: Promise<{ 
    search?: string; 
    page?: string; 
  }>;
}

const Page = async ({ searchParams }: PageProps) => {

  const searchText = (await searchParams)?.search ?? '';
  const currentPage = Number((await searchParams)?.page ?? 1);
  const skip = (currentPage - 1) * 3;
  const take = 3;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / 3);

  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-12 sm:px-6 lg:text-5xl'>
        <div className='mb-12 space-y-6 text-center'>
          <h1 className='text-4xl font-bold sm:text-5xl'>All Articles</h1>

          <ArticleSearhBar />

          <Suspense fallback={
            <div>
              <div className="flex items-center justify-center h-64">
                <svg className="animate-spin h-10 w-10 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.93A8.003 8.003 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.008zM12 20a8.003 8.003 0 01-6.93-4.07L2.07 17A10.002 10.002 0 0012 22v-2zm6.93-1.07A8.003 8.003 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.07-.008zM20 12a8.003 8.003 0 01-4.07-6.93L17 .07A10.002 10.002 0 0022 12h-2z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-300">Loading articles...</p>
            </div>
          }>
            <AllArticlePage articles={articles} />
          </Suspense>

          <div className='mt-12 flex justify-center gap-2'>
            <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
              <Button disabled={currentPage === 1} variant={'ghost'} size={'sm'}>Prev</Button>
            </Link>
            {
              Array.from({ length: totalPages }).map((_, index) => (
                <Link
                  key={index}
                  href={`?search=${searchText}&page=${index + 1}`}
                  passHref
                >
                  <Button variant={currentPage === index + 1 ? "destructive" : 'ghost'} size={'sm'}>
                    {index + 1}
                  </Button>
                </Link>
              ))
            }
            <Link href={`?search=${searchText}&page=${currentPage + 1}`}>
              <Button disabled={currentPage === totalPages} variant={'ghost'} size={'sm'}>Next</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page;
