// hooks/useFetchPostListing.ts - Add this new hook
'use client';
import useSWR from "swr";

const fetcher = async <T,>(url: string): Promise<T> => {
  const controller = new AbortController();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  } 
};

interface Listing {
  id: number;
  title: string;
  description: string;
  image: string | null;
  content: string;
  user: any;
  image_owner: any;
  owner_title: any;
  category: string;
  created_at_meta: string;
  updated_at_meta: string;
}

// Hook for single post
const useFetchSinglePost = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<Listing>(
    id ? `${process.env.NEXT_PUBLIC_URL}postid/${id}` : null,
    fetcher
  );

  return { 
    post: data || null,
    error, 
    isLoading,
    mutate
  };
};

export default useFetchSinglePost;