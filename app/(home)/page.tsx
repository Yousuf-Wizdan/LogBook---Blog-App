import { BlogFooter } from "@/components/home/blog-footer";
import Navbar from "@/components/home/header/Navbar";
import HeroSection from "@/components/home/hero-section";
import TopArticles from "@/components/home/top-articles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

function Home() {
  return (
    <div>
      <Navbar />

      <HeroSection />

      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Featured Articles
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Discover our most popular and trending content
            </p>
          </div>

          <Suspense fallback={
            <div>
              <div className="flex items-center justify-center h-64">
                <svg
                  className="animate-spin h-10 w-10 text-gray-900 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.93A8.003 8.003 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.008zM12 20a8.003 8.003 0 01-6.93-4.07L2.07 17A10.002 10.002 0 0012 22v-2zm6.93-1.07A8.003 8.003 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.07-.008zM20 12a8.003 8.003 0 01-4.07-6.93L17 .07A10.002 10.002 0 0022 12h-2z"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-300">Loading articles...</p>
            </div>}>
            <TopArticles />
          </Suspense>

          <div className="text-center mt-12">
            <Link href={'/articles'}>
              <Button variant="outline"
                className="rounded-full px-8 py-6 text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900">
                View all articles
              </Button>
            </Link>
          </div>
        </div>
      </section>


      <BlogFooter />

    </div>
  );
}

export default Home;
