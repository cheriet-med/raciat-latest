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
  hero_1: string;
  hero_2: string;
  
  section_features: string;
  awards: string;
  agents: string;
  visites: string;
  place_image_1: string;
  place_title_1: string;
  place_image_2: string;
  place_title_2: string;
  place_image_3: string;
  place_title_3: string;
  place_image_4: string;
  place_title_4: string;
  place_image_5: string;
  place_title_5: string;
  place_image_6: string;
  place_title_6: string;
  section_steps: string;
}

// Hook for single post
const useFetchHomepage = () => {
  const { data, error, isLoading, mutate } = useSWR<Listing>(
    `${process.env.NEXT_PUBLIC_URL}homepageid/1`,
    fetcher
  );

  return { 
    post: data || null,
    error, 
    isLoading,
    mutate
  };
};

export default useFetchHomepage;