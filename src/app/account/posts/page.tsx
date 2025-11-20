"use client";

import { useSession} from "next-auth/react";
import AddPost from "@/components/admin-dashboard/add-post";
import Blogger from "@/components/user-dashboard/add-post";

export default function ProtectedPage() {
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
    return ( <div className="font-sans mx-6 md:mx-16 custom:mx-60 py-12">
      <div className="grid lg:grid-cols-4 gap-10 mt-6">
      <div className=" lg:col-span-1 h-60 bg-gray-200 animate-pulse">
      
      </div>
      <div className="lg:col-span-3 h-96 bg-gray-200 animate-pulse">
       
       
      </div>
    </div>  
    </div>);
  }
  return session?.user?.is_superuser? <AddPost/> :  ( session?.user?.is_staff? <AddPost/>:<Blogger/>)
}