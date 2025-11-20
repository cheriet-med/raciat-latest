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
  user: string;     
  name: string | null;    
  phone: string | null;              
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  image: string | null;             
  address: string | null;
  reason: string | null;
  price: string | null;
  types: string | null;
  hurry: string | null;
  surface: string | null;
  latitude: string | null;
  longtitude: string | null;
  description: string | null;
  representative: string | null;
  potential_client: string | null;
  min_price: string | null;
  max_price: string | null;
  badrooms_number: string | null;
  rooms_number: string | null;
  region: string | null;
  location: string | null;
  is_read: boolean;
}


const useFetchBooking = (id:any) => {
  const { data, error, isLoading, mutate } = useSWR<Bookings[]>(
    `${process.env.NEXT_PUBLIC_URL}order/?product=${id}`,
    fetcher // No need to explicitly pass generic here
  );

  return { Booking: data || [], error, isLoading, mutate  };
};

export default useFetchBooking;