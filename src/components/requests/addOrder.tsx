'use client';

import { useState, ChangeEvent } from 'react';
import { X, Upload } from 'lucide-react';
import { LuImagePlus } from "react-icons/lu";
import { useSession } from 'next-auth/react';
import TiptapEditor from '../admin-dashboard/Tiptapeditor';
import Image from 'next/image';
import { useRouter } from "next/navigation";

// الواجهات
interface Order {
  name: string;
  status: string;
  created_at: string;
  image: File | null;
  address: string;
  reason: string;
  price: string;
  types: string;
  hurry: string;
  surface: string;
  latitude: string;
  longtitude: string;
  description: string;
  min_price: string;
  max_price: string;
  badrooms_number: string;
  rooms_number: string;
  region: string;
  phone: string;
  user: any;

}

interface ApiError {
  message: string;
}

export default function AddOrderForm() {
  const router = useRouter();
  const { data: session, status } = useSession({ required: true });
  
  const [order, setOrder] = useState<Order>({
    user: session?.user?.id,
    name: '',
    status: 'قيد المراجعة',
    created_at: new Date().toLocaleDateString('ar-EG'),
    image: null,
    address: '',
    reason: '',
    price: '',
    types: '',
    hurry: '',
    surface: '',
    latitude: '',
    longtitude: '',
    description: '',
    min_price: '',
    max_price: '',
    badrooms_number: '',
    rooms_number: '',
    region: '',
    phone: '',

  });
  
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorname, setErrorname] = useState('');
  const [erroraddress, setErroraddress] = useState('');
  const [errorimage, setErrorimage] = useState('');
  const [errordescription, setErrordescription] = useState('');
  const [errorreason, setErrorreason] = useState('');
  const [errortypes, setErrortypes] = useState('');
  const [errorhurry, setErrorhurry] = useState('');

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (description: string) => {
    setOrder(prev => ({ ...prev, description }));
  };

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOrder(prev => ({ ...prev, image: file }));
      const url = URL.createObjectURL(file);
      setMainImagePreview(url);
    }
  };

  const removeMainImage = () => {
    setOrder(prev => ({ ...prev, image: null }));
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
      setMainImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    setErrorname('');
    setErroraddress('');
    setErrorimage('');
    setErrordescription('');
    setErrorreason('');
    setErrortypes('');
    setErrorhurry('');
    setErrorMessage('');

    if (!order.name.trim()) {
      setErrorname('الرجاء إدخال اسم الطلب');
      return;
    }

    if (!order.address.trim()) {
      setErroraddress('الرجاء إدخال العنوان');
      return;
    }



    if (!order.reason.trim()) {
      setErrorreason('الرجاء اختيار السبب');
      return;
    }

    if (!order.types.trim()) {
      setErrortypes('الرجاء اختيار نوع العقار');
      return;
    }

    if (!order.hurry.trim()) {
      setErrorhurry('الرجاء اختيار مستوى الاستعجال');
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const orderFormData = new FormData();
      orderFormData.append('user', order.user);
      orderFormData.append('name', order.name);
      orderFormData.append('status', order.status);
      orderFormData.append('created_at', order.created_at);
      orderFormData.append('address', order.address);
      orderFormData.append('reason', order.reason);
      orderFormData.append('price', order.price);
      orderFormData.append('types', order.types);
      orderFormData.append('hurry', order.hurry);
      orderFormData.append('surface', order.surface);
      orderFormData.append('latitude', order.latitude);
      orderFormData.append('longtitude', order.longtitude);
      orderFormData.append('description', order.description);
      orderFormData.append('min_price', order.min_price);
      orderFormData.append('max_price', order.max_price);
      orderFormData.append('badrooms_number', order.badrooms_number);
      orderFormData.append('rooms_number', order.rooms_number);
      orderFormData.append('region', order.region);

      orderFormData.append('phone', order.phone);


      if (order.image) {
        orderFormData.append('image', order.image);
      }

      const orderResponse = await fetch(`${process.env.NEXT_PUBLIC_URL || ''}order/`, {
        method: 'POST',
        headers: {
          "Authorization": "Token " + (process.env.NEXT_PUBLIC_TOKEN || ''),
        },
        body: orderFormData,
      });

      if (!orderResponse.ok) {
        const errorData: ApiError = await orderResponse.json();
        throw new Error(errorData.message || 'فشل في إنشاء الطلب');
      }

      setSuccessMessage('تم إنشاء الطلب بنجاح!');
      
      // إعادة تعيين النموذج
      setOrder({
        user: session?.user?.id,
        name: '',
        status: 'قيد المراجعة',
        created_at: new Date().toLocaleDateString('ar-EG'),
        image: null,
        address: '',
        reason: '',
        price: '',
        types: '',
        hurry: '',
        surface: '',
        latitude: '',
        longtitude: '',
        description: '',
        min_price: '',
        max_price: '',
        badrooms_number: '',
        rooms_number: '',
        region: '',
        phone: '',
      });
      setMainImagePreview(null);
      
    } catch (error) {
      console.error('خطأ أثناء الإرسال:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setIsSubmitting(false);
      router.push('/account/trips');  
    }
  };

  return (
    <div className="py-4" dir="rtl">
      <div className="px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* العنوان */}
          <div className="bg-sec px-8 py-6">
            <h1 className="text-3xl font-bold text-white">إضافة طلب جديد</h1>
            <p className="text-white mt-2">
              يرجى ملء جميع الحقول المطلوبة المشار إليها بعلامة النجمة. لتحسين طلبك، أكمل جميع الحقول.
            </p>
          </div>

          <div className="p-8">
            {/* رسائل الحالة */}
            {successMessage && (
              <div className="mb-6 p-4 border border-green-200 rounded-xl flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-green-800 font-medium">{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span className="text-red-800 font-medium">{errorMessage}</span>
              </div>
            )}

            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* العمود الأيسر - الحقول */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    {/* الحقول الأساسية */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* حقل الاسم */}
                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                        عنوان الطلب *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={order.name}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="أدخل عنوان الطلب"
                        />
                        {errorname && <p className="text-xl mt-2 text-red-600">{errorname}</p>}
                      </div>

                      {/* حقل العنوان */}
                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          العنوان *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={order.address}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="أدخل العنوان"
                        />
                        {erroraddress && <p className="text-xl mt-2 text-red-600">{erroraddress}</p>}
                      </div>
                    </div>

                    {/* حقول الاختيار - 3 أعمدة على LG، 2 على MD، 1 على Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      {/* حقل السبب */}
                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          الغرض *
                        </label>
                        <select
                          name="reason"
                          value={order.reason}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all bg-white"
                        >
                          <option value="">اختر الغرض</option>
                          <option value="بيع">بيع</option>
                          <option value="شراء">شراء</option>
                          <option value="ايجار">ايجار</option>
                        </select>
                        {errorreason && <p className="text-xl mt-2 text-red-600">{errorreason}</p>}
                      </div>

                      {/* حقل نوع العقار */}
                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          حالة العقار *
                        </label>
                        <select
                          name="types"
                          value={order.types}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all bg-white"
                        >
                          <option value="">اختر حالة العقار</option>
                          <option value="بناء">بناء</option>
                          <option value="قديم">قديم</option>
                          <option value="جديد">جديد</option>
                        </select>
                        {errortypes && <p className="text-xl mt-2 text-red-600">{errortypes}</p>}
                      </div>

                      {/* حقل الاستعجال */}
                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          مستوى الاستعجال *
                        </label>
                        <select
                          name="hurry"
                          value={order.hurry}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all bg-white"
                        >
                          <option value="">اختر مستوى الاستعجال</option>
                          <option value="طارء">طارء</option>
                          <option value="مستعجل">مستعجل</option>
                          <option value="لست مستعجل">لست مستعجل</option>
                        </select>
                        {errorhurry && <p className="text-xl mt-2 text-red-600">{errorhurry}</p>}
                      </div>
                    </div>

                    {/* الحقول الإضافية */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          السعر
                        </label>
                        <input
                          type="number"
                          name="price"
                          min={0}
                          value={order.price}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="السعر"
                        />
                      </div>

                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          المساحة
                        </label>
                        <input
                          type="text"
                          name="surface"
                          value={order.surface}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="المساحة"
                        />
                      </div>

                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          أقل سعر
                        </label>
                        <input
                          type="number"
                          min={0}
                          name="min_price"
                          value={order.min_price}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="أقل سعر"
                        />
                      </div>

                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          أعلى سعر
                        </label>
                        <input
                          type="number"
                          min={0}
                          name="max_price"
                          value={order.max_price}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="أعلى سعر"
                        />
                      </div>

                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          عدد الغرف
                        </label>
                        <input
                          type="number"
                          min={0}
                          name="rooms_number"
                          value={order.rooms_number}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="عدد الغرف"
                        />
                      </div>

                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          عدد الحمامات
                        </label>
                        <input
                          type="number"
                          min={0}
                          name="badrooms_number"
                          value={order.badrooms_number}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="عدد الحمامات"
                        />
                      </div>

                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          المنطقة
                        </label>
                        <input
                          type="text"
                          name="region"
                          value={order.region}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="المنطقة"
                        />
                      </div>

                    </div>

                    {/* الحقول الجديدة - خطوط الطول والعرض والهاتف */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                        (latitude)  خط العرض
                        </label>
                        <input
                          type="number"
                          name="latitude"
                          value={order.latitude}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="مثلا: 40.123 "
                        />
                      </div>

                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                        (longitude)  خط الطول
                        </label>
                        <input
                          type="number"
                          name="longtitude"
                          value={order.longtitude}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                          placeholder="مثلا: -70.123 "
                        />
                      </div>

                      <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                          رقم الهاتف
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={order.phone}
                          onChange={handleOrderChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all text-right"
                          placeholder="رقم الهاتف"
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* العمود الأيمن - تحميل الصورة */}
                <div className="lg:col-span-1">
                     {/* حقل الوصف */}
                      <div className="bg-gray-50 rounded-xl p-6">
                 <div className="mt-6">
                      <label className="block text-xl font-semibold text-gray-700 mb-2">
                    الوصف
                      </label>
                      <TiptapEditor
                        content={order.description}
                        onChange={handleDescriptionChange}
                      />
                      {errordescription && <p className="text-xl mt-2 text-sec">{errordescription}</p>}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <label className="block text-xl font-semibold text-gray-500 mb-3">صورة العقار أو أي صورة تصف العقار المطلوب  *</label>
                    {!mainImagePreview ? (
                      <label className="block w-full cursor-pointer">
                        <div className="border-2 bg-white border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-sec hover:bg-gray-50 transition-all h-72">
                          <LuImagePlus className="w-12 h-12 text-gray-400 mx-auto mt-10" />
                          <p className="text-xl font-medium text-gray-600 mb-1 font-playfair">إضغط هنا لتحميل الصورة</p>
                          <p className="text-xl text-gray-500">PNG, JPG, AVIF الحجم اﻷقصى  10MB</p>
                        </div>
                        {errorimage && <p className="text-xl mt-2 text-sec">{errorimage}</p>}
                        <input
                          type="file"
                          accept="image/avif,image/png,image/jpeg,image/webp"
                          onChange={handleMainImageChange}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative inline-block">
                        <div className="relative group">
                          <Image
                            src={mainImagePreview}
                            alt="Main preview"
                            width={150}
                            height={150}
                            className="object-cover h-full w-full rounded-xl shadow-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={removeMainImage}
                            className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100 border-2 border-white"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="mt-3 text-center">
                          <label className="inline-flex items-center gap-4 px-3 py-3 text-sec rounded-3xl hover:bg-gray-100 border border-1 border-sec transition-colors cursor-pointer font-bold">
                            <Upload className="w-6 h-6" />
                            غير الصورة
                            <input
                              type="file"
                              accept="image/avif,image/png,image/jpeg,image/webp"
                              onChange={handleMainImageChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* أزرار الإرسال */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-3 bg-sec text-white font-semibold rounded-xl transition-all ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-prim hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري إنشاء الطلب...
                    </span>
                  ) : (
                    'إنشاء طلب'
                  )}
                </button>

                <button
                  type="button"
                  className="px-6 py-3 bg-prim text-white border border-gray-300 font-semibold rounded-xl hover:bg-sec transition-all"
                  onClick={() => window.history.back()}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}