'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import useFetchAllBookings from '@/components/requests/fetchAllBookings';
import useFetchAllUser from '@/components/requests/fetchAllUsers';
import PrivacyDialog from '@/components/Data/privacyDialog';
import { RiCloseLargeLine } from "react-icons/ri";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { 
  Calendar as CalendarIcon,
  CalendarDays,
  CreditCard,
  DollarSign,
  Users,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Grid3X3,
  List,
  X,
  Building2,
  MapPin,
  Clock,
  User
} from 'lucide-react';

export interface User {
  id: string;
  name: string;
  title: string;
  profileImage: string;
}

export interface Reservation {
  id: string;
  user: User;
  reservationDate: Date;
  service: string;
  destination: string;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  amount: number;
  currency: string;
  createdAt: Date;
  image:string;
  category:string,
  total_guests:string,
  room_quantity:string,
  cancellation_policy:string,
}

export type SortField = keyof Reservation | 'user.name' | 'user.title';
export type SortDirection = 'asc' | 'desc';

export interface TableFilters {
  search: string;
  status: string;
  paymentMethod: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}


const ReservationsTable = () => {
return(
  <div></div>
)
};

export default ReservationsTable;







/**
 *  {
                            label: 'Edit',
                            icon: <Edit className="mr-2 h-4 w-4" />,
                            onClick: () => handleEdit(reservation)
                          },
 */