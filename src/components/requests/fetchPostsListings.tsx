'use client';
import useSWR from "swr";

// Explicitly define the fetcher's return type
const fetcher = async <T,>(url: string): Promise<T> => {
  const controller = new AbortController();
  //const timeoutId = setTimeout(() => controller.abort(), 20000); // 20-second timeout

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

    return (await response.json()) as T; // Explicit type assertion
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
  // Removed fields that don't exist in the Django model:
  // rating, price_per_night, cancellation_policy, price_range, 
  // average_cost, chef, receipt, opening_hours fields,
  // organic_ingredients, sustainable_seafood, is_inwishlist
}

const useFetchPostListing = () => {
  const { data, error, isLoading, mutate } = useSWR<Listing[]>(
    `${process.env.NEXT_PUBLIC_URL}post/`,
    fetcher // No need to explicitly pass generic here
  );

  return { 
    listingsp: data || null, // Return single user object instead of array
    error, 
    isLoading,
    mutate // Export mutate function for manual revalidation
  };
};

export default useFetchPostListing;