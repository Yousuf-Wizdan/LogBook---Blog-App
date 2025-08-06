'use server'

import { redirect } from "next/navigation"

export const SearchAction = async (formData: FormData) => {

    const searchText = formData.get('search')

    if(typeof searchText !== 'string' || !searchText){
        redirect('/')
    }

    redirect(`/articles?search=${searchText}`)
}