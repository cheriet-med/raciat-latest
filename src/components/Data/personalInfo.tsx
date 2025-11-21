'use client'

import { GoPencil } from "react-icons/go";
import { MdOutlineSecurity } from "react-icons/md";
import useFetchUser from "@/components/requests/fetchUser";
import EditUsername from "@/components/requests/editeUsername";
import EditPhone from "@/components/requests/editePhoneNumber";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { AiOutlineUserDelete } from "react-icons/ai";
import { RiCloseLargeLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { MdOutlineVerified } from "react-icons/md";
import Image from "next/image";
import VerifyPhoneOTP from "../requests/verifyPhoneNumber";


interface ProfileData {
  id?: number;
  name?: string;
  full_name?: string;
  username?: string;
  title?: string;
  category?: string;
  amenities?: string;
  email?: string;
  location?: string;
  profile_image?: string;
  identity_verified?: boolean;
  about?: any;
  website?: string;
  joined?: string;
  address_line_1?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  latitude?: string;
  longtitude?: string;
  // New fields added below
  want_to_go?: string;
  time_spend?: string;
  born?: string;
  pets?: string;
  obsessed?: string;
  language?: string;
  is_staff?:Boolean;
  is_email_verified?:Boolean;
  status?:string;
  is_phone_number_verified?:Boolean;
}

interface PersonalInfo {
  legalName: string;
  preferredName: string;
  email: string;
  phone: string;
  identityVerification: string;
  residentialAddress: string;
  mailingAddress: string;
  emergencyContact: string;
}

// Custom popup types
interface PopupState {
  isOpen: boolean;
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface Subscription {
  cancelAtPeriodEnd: boolean;
  customerId: string;
  id: string;
  priceId: string;
  status: string;
}


export default function PersonalInformation() {
  const [emailsend, setEmailsend] = useState(false);
  const [emailsenderror, setEmailsenderror] = useState(false);
  const [emailsendvalidation, setEmailsendvalidation] = useState(false);
  const [emailsenderrorvalidation, setEmailsenderrorvalidation] = useState(false);
  const [passwordsend, setPasswordsend] = useState(false);
  const [passwordsenderror, setPasswordsenderror] = useState(false);
  const { data: session, status } = useSession({ required: true });
  const userId = session?.user?.id;
  const { Users,  isLoading, mutate } = useFetchUser(userId);

  const [loading, setLoading] = useState(false);

  const [fetchingSubscriptions, setFetchingSubscriptions] = useState(true);

  const [isOpendelete, setIsOpenDelete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Custom popup state
  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });





const sendVerificationEmail = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_URL}send-verification-email/`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${session?.accessToken}`,
      },
      body: JSON.stringify({
        email: session?.user.email,
      }),
    });

    console.log("Verification email request sent successfully");
     setEmailsendvalidation(true);
  } catch (err) {
    console.error("Failed to send verification email:", err);
    setEmailsenderrorvalidation(true);
  }
};




  // Custom popup functions
  const showPopup = (type: 'success' | 'error' | 'confirm', title: string, message: string, onConfirm?: () => void, confirmText?: string, cancelText?: string) => {
    setPopup({
      isOpen: true,
      type,
      title,
      message,
      onConfirm,
      confirmText: confirmText || 'OK',
      cancelText: cancelText || 'Cancel'
    });
  };

  const closePopup = () => {
    setPopup(prev => ({ ...prev, isOpen: false }));
  };

  const handleDelete = () => {
    setIsOpenDelete(true);
  };

  const handleDeleteConfirm = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}infoid/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Token " + process.env.NEXT_PUBLIC_TOKEN,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete account: ${response.statusText}`);
      }

      // No need to revalidate if account is gone
      // Just sign out immediately
      await signOut({ callbackUrl: "/en/login" });

    } catch (err) {
      setError("An error occurred while deleting account");
      setIsSaving(false);
    }
  };

  const handleCloseDialog = () => {
    if (!isSaving) {
      setIsOpenDelete(false);
      setError(null);
      setSuccessMessage(null);
    }
  };

 





  // Use Users data directly instead of profileData state
  const profileData: ProfileData = Users || {};

  const resetEmail = async () => {
    try {
      const neo = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/users/reset_email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:profileData.email,
        }),
      });
      
      if (!neo.ok) {
        throw new Error("Network response was not ok");
      }
     
      setEmailsend(true);
    }
    catch {
      setEmailsenderror(true);
    }
  }

  const resetPassword = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}auth/users/reset_password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
                email:profileData.email,
              }),
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setPasswordsend(true);
    } catch {
      setPasswordsenderror(true);
    }
  };

  return (
    <div className=" mx-1 lg:mx-6 bg-white p-6 border border-gray-200 shadow-sm rounded-xl font-montserrat mt-6">
      <div className="px-4 pb-4 sm:px-0">
        <h2 className="text-4xl font-bold text-sec mt-4 mb-6 font-playfair">معلومات شخصية</h2>
      </div>

      <div className="mt-6 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {/* Legal Name */}
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium text-gray-900 font-playfair text-3xl">إسم المستخدم</dt>
            <dd className="mt-1 text-2xl text-gray-700 sm:col-span-2 sm:mt-0 flex justify-between items-center">
             {profileData.username == null ? "غير متوفر" : <span>{profileData.username}</span>} 
              <EditUsername
                initialFullName={profileData.username}
                infoId={userId}
                onUpdateSuccess={(newFullName, ) => {
                  console.log('Updated:', newFullName, );
                }}
                mutate={mutate}
              />
            </dd>
          </div>
<hr className="text-sec border-2"/>
          {/* Email Address */}
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium text-gray-900 font-playfair text-3xl">عنوان البريد الإلكتروني</dt>
            <dd className="mt-1 text-2xl text-gray-700 sm:col-span-2 sm:mt-0 flex justify-between items-center">
              <div>
                <div className="flex gap-4 items-center text-2xl">
                  <span>{profileData.email}</span>
                   {profileData.is_email_verified == false ? "" :
                    <div className="relative h-7 w-7 ">
                                                 <Image
                                                   src="/verified.png" // or "/logo.webp" if using an webp
                                                   alt="logo"
                                                   fill
                                                   sizes='100%'
                                                   style={{ objectFit: 'contain' }} // Maintain aspect ratio
                                                   priority // Ensures it loads faster
                                                 />
                    </div>
                   
                   
                 }
                </div>
                
{emailsendvalidation && (
  <p className="text-sec text-2xl text-center">
    تم إرسال رسالة التحقق، يرجى التحقق من صندوق الوارد أو مجلد الرسائل غير المرغوب فيها.
  </p>
)}
{emailsenderrorvalidation && (
  <p className="text-sec text-2xl text-center">
    لم نتمكن من إرسال رسالة التحقق. يرجى المحاولة مرة أخرى.
  </p>
)}
{emailsend && (
  <p className="text-sec text-2xl text-center">
    تم إرسال تأكيد تحديث البريد الإلكتروني بنجاح.
  </p>
)}
{emailsenderror && (
  <p className="text-sec text-2xl text-center">
    لم يتم إرسال البريد الإلكتروني. يرجى إعادة المحاولة.
  </p>
)}

              </div>
              <div className="flex gap-4 flex-wrap">
               {profileData.is_email_verified == false ? 
              <button className="text-2xl font-medium text-sec hover:text-secondary flex items-center"  onClick={sendVerificationEmail}>
                <MdOutlineVerified className="h-6 w-6 ml-2"  />
                تأكيد
              </button>: ""}
                  <button className="text-2xl font-medium text-sec hover:text-secondary flex items-center"  onClick={resetEmail}>
                     <GoPencil className="h-6 w-6 ml-2" />
               تعديل
              </button>
              </div>
            
            </dd>
          </div>
<hr className="text-sec border-2"/>
          {/* Password */}
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium text-gray-900 font-playfair">كلمة المرور</dt>
            <dd className="mt-1 text-2xl text-gray-700 sm:col-span-2 sm:mt-0 flex justify-between items-center">
              <div>
                <span>***********</span>
{passwordsend && (
  <p className="text-sec text-2xl text-center">
    تم إرسال البريد الإلكتروني لتعديل كلمة المرور بنجاح.
  </p>
)}
{passwordsenderror && (
  <p className="text-sec text-2xl text-center">
    فشل إرسال البريد الإلكتروني لتعديل كلمة المرور.
  </p>
)}

              </div>
              <button className="text-2xl
             font-medium text-sec hover:text-secondary flex items-center" onClick={resetPassword}> 
                <GoPencil className="h-6 w-6 ml-2" />
             تعديل
              </button>
            </dd>
          </div>
<hr className="text-sec border-2"/>
          {/* Phone Numbers */}
          <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium text-gray-900 font-playfair text-3xl">رقم الهاتف </dt>
            <dd className="mt-1 text-2xl text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex justify-between items-start">
                <div>
                  
                  {profileData.phoneNumber == null ?  <p className="text-gray-500 mt-1">
                   أضف رقمًا حتى يتمكن موظفي راسيا من التواصل معك.
                  </p>: 
                  (profileData.is_phone_number_verified == false ?
                  <p className="text-gray-700">{profileData.phoneNumber}</p> :  
                  <div className="flex gap-4 items-center">
                  <span>{profileData.phoneNumber}</span>
                  
                    <div className="relative h-7 w-7 ">
                      <Image
                        src="/verified.png" // or "/logo.webp" if using an webp
                        alt="logo"
                        fill
                        sizes='100%'
                        style={{ objectFit: 'contain' }} // Maintain aspect ratio
                        priority // Ensures it loads faster
                      />
                    </div>
                   
                   
                
                </div>
                  )
                  }
                 
                </div>
<div className="flex gap-4">
  {profileData.is_phone_number_verified == false ?
<VerifyPhoneOTP 
  initialPhoneNumber={profileData.phoneNumber}
  infoId={userId}
  onVerificationSuccess={(phoneNumber:any) => {
    console.log('Phone verified:', phoneNumber);
  }}
  mutate={mutate}
/>:""}
                <EditPhone
                  initialFullName={profileData.phoneNumber}
                  infoId={userId}
                  onUpdateSuccess={(newFullName, ) => {
                    console.log('Updated:', newFullName, );
                  }}
                  mutate={mutate}
                />
</div>

              </div>
            </dd>
          </div>

 

          {/* Residential Address */}
 

        </dl>
      </div>
<hr className="text-sec border-2"/>
      <div className="mt-8 pt-3 border-t border-gray-200">

        {session?.user.is_superuser? "" : 
        <div className="flex gap-2  mt-8">
          <AiOutlineUserDelete size={24} className="text-sec"/>
          <h3 className="font-medium text-gray-900 font-playfair hover:underline cursor-pointer text-3xl" onClick={handleDelete}>حذف الحساب</h3>
        </div>}
        
        <div className="flex gap-2 items-center mt-8 ">
          <MdOutlineSecurity size={24} className="text-sec"/> 
          <h3 className="font-medium text-gray-900 font-playfair text-3xl">لماذا يتم عرض معلوماتي هنا؟</h3>
        </div>
      
        <p className="mt-2 text-2xl text-gray-500">
          نخفي بعض تفاصيل حسابك لحماية هويتك. إذا كنت بحاجة إلى تحديث هذه المعلومات،

        </p>
      </div>

      {/* Delete Dialog */}
      {isOpendelete && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="rounded-2xl bg-white p-6 max-w-5xl mx-auto space-y-4">
            {/* Close Button */}
            <RiCloseLargeLine
              size={24}
              className="absolute top-2 right-2 text-sec hover:text-gray-300 cursor-pointer"
              onClick={handleCloseDialog}
            />

            {/* Content */}
<h1 className="text-4xl font-semibold font-playfair text-sec">
  حذف الحساب
</h1>
<p className="text-2xl text-prim">
  هل أنت متأكد أنك تريد حذف هذا الحساب؟ لا يمكن التراجع عن هذا الإجراء.
</p>


            {successMessage && (
              <div className="mt-4 p-2 bg-green-100 text-green-700 rounded text-2xl">
                {successMessage}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-3 py-3 border border-gray-300 hover:bg-sec transition-colors disabled:opacity-50 rounded-lg text-prim"
                onClick={handleCloseDialog}
                disabled={isSaving}
              >
               إلغاء
              </button>
              <button
                className="px-3 py-3 bg-sec text-white hover:bg-prim transition-colors disabled:bg-sec disabled:cursor-not-allowed rounded-lg"
                onClick={handleDeleteConfirm}
                disabled={isSaving }
              >
                {isSaving ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    حدف...
                  </span>
                ) : 'حدف الحساب'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-2xl">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Popup Modal */}
      {popup.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative space-y-4">
            {/* Close Button */}
            <RiCloseLargeLine
              size={20}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={closePopup}
            />

            {/* Icon based on type */}
            <div className="flex items-center justify-center mb-4">
              {popup.type === 'success' && (
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}
              {popup.type === 'error' && (
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              )}
                {popup.type === 'confirm' && (
                <div className="w-12 h-12 bg-[#D9AA52] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#D9AA52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-lg font-semibold font-playfair text-gray-900 mb-2">
                {popup.title}
              </h3>
              <p className="text-2xl text-gray-600 mb-6">
                {popup.message}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-3">
              {popup.type === 'confirm' ? (
                <>
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    onClick={closePopup}
                  >
                    {popup.cancelText}
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    onClick={() => {
                      popup.onConfirm?.();
                      closePopup();
                    }}
                  >
                    {popup.confirmText}
                  </button>
                </>
              ) : (
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    popup.type === 'success' 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                  onClick={closePopup}
                >
                  {popup.confirmText}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}