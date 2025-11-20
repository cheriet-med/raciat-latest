'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { FaCircleNotch, FaStar } from "react-icons/fa"; 
import { useRouter } from "next/navigation"; // Import useRouter
import MailChecker from "mailchecker";
import Layout from "@/components/layouts/Layout-defaul";
import { signOut } from "next-auth/react";

export default function ResetPassword() {
  const params = useParams()
  const { id, token } = params
   const [email, setEmail] = useState('');
  
     const [isLoadingg, setIsLoadingg] = useState(false); // Loading state

   

     const [error1, setError1] = useState(""); // Email validation error state

  const isValidEmail = async (email: string): Promise<{ valid: boolean; message?: string }> => {
    // Step 1: Check if the email is empty or null
    if (!email || email.trim() === "") {
      return { valid: false, message: 'البريد الإلكتروني مطلوب' };
    }

    // Step 2: Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'تنسيق البريد الإلكتروني غير صالح' };
    }


    // Step 4: Check if the email is disposable using mailchecker
    if (!MailChecker.isValid(email)) {
      return { valid: false, message: 'رسائل البريد الإلكتروني التي يمكن التخلص منها' };
    }

    // If all checks pass, the email is valid
    return { valid: true };
  };



  const handleSubscribe = async () => {

  setIsLoadingg(true);

      // Validate email
      const emailValidation = await isValidEmail(email);
      if (!emailValidation.valid) {
        setError1(emailValidation.message || 'بريد إلكتروني غير صالح');
        setIsLoadingg(false); // Stop loading state
        return;
      }
    
  
   
     try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/users/reset_email_confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uid:id,
            token:token,
            new_email:email,
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
        signOut({ callbackUrl: `/register` })
    }
  };






  return (
   


     <Layout>
     <div>
      <div className="my-60 flex items-center justify-center p-4 font-montserrat ">
    <div className='  p-6 rounded-2xl'>
       <h1 className=' mb-4 text-3xl'>اكتب بريدك الإلكتروني الجديد</h1>
        <div>
        <div className="relative ">
                    <input
      type="text"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     placeholder="بريد إلكتروني جديد"
     className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-yel bg-gray-50 "
     required
   />

     
             </div>
      {error1 && <p className="text-bl text-sm mt-2">{error1}</p>}
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
    </div>
    </Layout>
  )
}