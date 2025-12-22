"use client";

import { useSession} from "next-auth/react";
import DashboardAdmin from "@/components/admin-dashboard/dashboard";
import AddHotelListingDashboard from "@/components/partner-dashboard/add-hotel-listing";
import AddProduct from "@/components/admin-dashboard/add-listing";
import AddOrderForm from "@/components/requests/addOrder";
import EditeOrderDashboard from "@/components/user-dashboard/editeOrder";
import EditeOrderAdmin from "@/components/admin-dashboard/editeOrder";
export default function ProtectedPage() {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
 return ( <div className="h-screen">
      <div className="grid lg:grid-cols-4 gap-10 mt-6">
      <div className=" lg:col-span-1 h-screen bg-gray-200 animate-pulse">
      
      </div>
      <div className="lg:col-span-3 h-screen bg-gray-200 animate-pulse">
       
       
      </div>
    </div>  
    </div>);
  }
  return session?.user?.is_superuser? <EditeOrderAdmin/> :  ( session?.user?.is_staff? <AddHotelListingDashboard/>:<EditeOrderDashboard/>)
}