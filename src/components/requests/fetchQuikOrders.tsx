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

interface Orders {
  id: number;
  name: string;
  phone_number: string;
  listing_id: string;
  agent:string;
  date: string | null;
  is_read: boolean;
}

const useFetchQuikeOrders = () => {
  const { data, error, isLoading, mutate } = useSWR<Orders[]>(
    `${process.env.NEXT_PUBLIC_URL}test/`,
    fetcher // No need to explicitly pass generic here
  );

  return { 
    orders: data || null, // Return single user object instead of array
    error, 
    isLoading,
    mutate // Export mutate function for manual revalidation
  };
};

export default useFetchQuikeOrders;