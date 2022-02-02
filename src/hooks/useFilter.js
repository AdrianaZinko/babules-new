import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => { 
        if(sort) {
            return [...posts].sort((a, b) => a[sort].toString().localeCompare(b[sort].toString()))
        }
        return posts;
    }, [sort, posts])

    return sortedPosts;
} 

export const useSearched = (categories, query) => { 

    const useSearched = useMemo(() => {
        return categories.filter(category => category.name.toLowerCase().includes(query.toLowerCase()))
    }, [query, categories])

    return useSearched;
}