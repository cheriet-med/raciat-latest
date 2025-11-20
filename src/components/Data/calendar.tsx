'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { EventContentArg, EventClickArg } from '@fullcalendar/core';
import { useState, useEffect } from 'react';
import useFetchAllBookings from "@/components/requests/fetchAllBookings";
import { useSession } from 'next-auth/react';
interface CalendarEvent {
  id: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  allDay?: boolean;
  color?: string;
  location?: string;
  category?: string;
  status?: string;
  totalPrice?: string | null;
  guests?: string;
  paymentMethod?: string;
  roomNumber?: string;
}

interface EventPopup {
  show: boolean;
  event: CalendarEvent | null;
  x: number;
  y: number;
}

interface Booking {
  id: number;
  user: number;
  product: number;
  status: string;
  created_at: string;
  updated_at: string | null;
  image: string;
  check_in_date: string | null;
  check_out_date: string | null;
  total_guests: string;
  adults: string;
  children: string;
  room_quantity: string | null;
  base_price: string | null;
  tax_amount: string | null;
  service_fee: string | null;
  discount_amount: string | null;
  total_price: string | null;
  payment_method: string;
  cancellation_date: string | null;
  refund_amount: string | null;
  restaurat_check_in_date: string | null;
  restaurat_check_in_time: string | null;
  name: string | null;
  category: string | null;
  cancellation_policy: string | null;
  location: string | null;
}

export default function Calendar() {
  

  return (
    <div className="w-full overflow-x-hidden">
     <p>hello</p>
    </div>
  );
}