'use client';

import useSWR from "swr";

// Explicitly define the fetcher's return type
const fetcher = async <T,>(url: string): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20-second timeout

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
  } finally {
    clearTimeout(timeoutId);
  }
};
interface Bookings {
 id: number;
  user: number;
  name: string;
  address?: string;
  badrooms_number?: string;
  created_at: string;
  description?: string | null ;
  hurry?: string;
  image?: string;
  is_read: boolean;
  latitude?: string;
  location?: string;
  longtitude?: string;
  max_price?: string;
  min_price?: string;
  phone?: string;
  potential_client?: any;
  price: string;
  reason: string;
  region?: string;
  representative?: any;
  rooms_number?: string;
  status: string;
  surface?: string;
  types?: string;
  updated_at?: string;
  responsable?: string;
}


const useFetchAllBookings = () => {
  const { data, error, isLoading , mutate} = useSWR<Bookings[]>(
    `${process.env.NEXT_PUBLIC_URL}order/`,
    fetcher // No need to explicitly pass generic here
  );

  return { AllBookings: data || [], error, isLoading, mutate  };
};

export default useFetchAllBookings;
