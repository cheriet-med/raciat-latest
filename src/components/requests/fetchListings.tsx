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
  user: any; // ForeignKey typically translates to the ID of the related model
  name: string | null;
  description: string | null;
  category: string | null;
  types: string | null;
  price: string | null;
  currency: string | null;
  video_link: string | null;
  rooms_number: string | null;
  badrooms_number: string | null;
  image: string | null; // Assuming CloudinaryField returns a string URL
  latitude: string | null;
  longtitude: string | null; // Fixed typo from original
  location: string | null;
  created_at_meta: string | null;
  updated_at_meta: string | null;
  size: string | null;
  capacity: string | null;
  established: string | null;
  garages: string | null;
  region: string | null;
  // Removed fields that don't exist in the Django model:
  // rating, price_per_night, cancellation_policy, price_range, 
  // average_cost, chef, receipt, opening_hours fields,
  // organic_ingredients, sustainable_seafood, is_inwishlist
}

const useFetchListing = () => {
  const { data, error, isLoading, mutate } = useSWR<Listing[]>(
    `${process.env.NEXT_PUBLIC_URL}product/`,
    fetcher // No need to explicitly pass generic here
  );

  return { 
    listings: data || null, // Return single user object instead of array
    error, 
    isLoading,
    mutate // Export mutate function for manual revalidation
  };
};

export default useFetchListing;