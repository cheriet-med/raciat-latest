'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useRouter } from "next/navigation"; // Import useRouter
import Layout from "@/components/layouts/Layout-defaul";
import { FaEye, FaEyeSlash, FaCircleNotch, FaCopy } from "react-icons/fa"; // Import FaCopy
import { useSession } from "next-auth/react";

export default function ResetPassword() {
  const params = useParams()
  const { id, token } = params
  const { data: session } = useSession();
   const [password, setPassword] = useState('');
    const [error2, setError2] = useState(""); // Password validation error state
     const [isLoadingg, setIsLoadingg] = useState(false); // Loading state

     const router = useRouter(); // Initialize the router


     const [showPassword, setShowPassword] = useState(false); // Show password state
     const validatePassword = (password: string): string | null => {
      // Check if password is at least 8 characters long
      if (password.length < 8) {
        return 'أكتب على اﻷقل 8 أرقام و أعداد ورموز';
      }
  
      // Check if password contains at least one uppercase letter
      if (!/[A-Z]/.test(password)) {
        return '  أكتب حروف كبيرة';
      }
  
      // Check if password contains at least one lowercase letter
      if (!/[a-z]/.test(password)) {
        return 'أكتب حروف صغيرة';
      }
  
      // Check if password contains at least one digit
      if (!/[0-9]/.test(password)) {
        return 'أكتب أرقام';
      }
  
      // Check if password contains at least one special character
      if (!/[!@#$%^&*]/.test(password)) {
        return 'أكتب رموز';
      }
  
      // If all conditions are met, return null (no error)
      return null;
    };




  const handleSubscribe = async () => {
   
  
       setIsLoadingg(true);
       // Validate password
       const passwordError = validatePassword(password);
       if (passwordError) {
         setError2(passwordError);
         setIsLoadingg(false); // Stop loading state
         return;
       }
  
   
     try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/users/reset_password_confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uid:id,
            token:token,
            new_password:password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
    } catch (error) {
      console.error('Error updates', error);
      return false;
    }finally{
        setIsLoadingg(false);
        {session?.user ? router.push(`/account`): router.push(`/login`)}
        
    }
  };






  return (
     <Layout>
     <div>
      <div className="my-60 flex items-center justify-center p-4 font-montserrat ">
    <div className='  p-6 rounded-2xl'>
        <h1 className=' mb-4 text-3xl'>اكتب كلمة المرور الجديدة الخاصة بك</h1>
        <div>
        <div className="relative ">
                    <input
     type={showPassword ? "text" : "password"}
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     placeholder="كلمة المرور الجديدة"
     className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yel bg-gray-50 "
     required
   />
<button
               type="button"
               onClick={() => setShowPassword(!showPassword)}
               className="absolute left-4 top-7 text-gray-400 hover:text-gray-300 flex items-center justify-center w-6 h-6"
             >
               {showPassword ? <FaEyeSlash className="w-6 h-6"/> : <FaEye className="w-6 h-6 " />}
             </button>
             
             </div>
    {error2 && <p className="text-bl text-sm mt-2">{error2}</p>}
                </div>

                <div className='mt-8'> 
                    {isLoadingg ? (
                                    <button
                                      onClick={handleSubscribe}
                                      className="w-full hover:bg-sec hover:text-yel font-bold py-4 rounded-lg bg-prim text-white transition-colors uppercase flex gap-3 justify-center items-center"
                                    >
                                       {'تعديل'}
                                      <FaCircleNotch className="animate-spin w-5 h-5"/>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={handleSubscribe}
                                      className="w-full bg-sec text-white py-4 font-bold  rounded-lg hover:bg-prim  transition-colors uppercase"
                                    >
                                     {'تعديل'}
                                    </button>
                                  )}
                </div>
    </div>
    </div>
    </div></Layout>
  )
}