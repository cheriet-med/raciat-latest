'use client';

import { useState, ChangeEvent } from 'react';
import { X, Upload } from 'lucide-react';
import { LuImagePlus } from "react-icons/lu";
import { useSession } from 'next-auth/react';
import TiptapEditor from '../admin-dashboard/Tiptapeditor';
import Image from 'next/image';
import { useRouter } from "next/navigation";
// الواجهات
interface Product {
  title: string;
  description: string;
  image: File | null;
  content: string;
  user: any;
  image_owner: any;
  owner_title: any;
  category: string;
}

interface ApiError {
  message: string;
}

export default function BlogPostForm() {
    const router = useRouter();
  const { data: session, status } = useSession({ required: true });
  
  const [product, setProduct] = useState<Product>({
    user: session?.user?.id,
    title: '',
    description: '',
    content: '',
    image: null,
    image_owner: session?.user?.image,
    owner_title: session?.user?.name,
    category: '',
  });
  
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errortitle, setErrortitle] = useState('');
  const [errordescription, setErrordescription] = useState('');
  const [errorimage, setErrorimage] = useState('');
  const [errorcontent, setErrorcontent] = useState('');
  const [errorcategory, setErrorcategory] = useState('');

  const handleProductChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setProduct(prev => ({ ...prev, content }));
  };

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct(prev => ({ ...prev, image: file }));
      const url = URL.createObjectURL(file);
      setMainImagePreview(url);
    }
  };

  const removeMainImage = () => {
    setProduct(prev => ({ ...prev, image: null }));
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
      setMainImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    setErrortitle('');
    setErrordescription('');
    setErrorimage('');
    setErrorcontent('');
    setErrorcategory('');
    setErrorMessage('');

    if (!product.title.trim()) {
      setErrortitle('الرجاء إدخال عنوان المقال');
      return;
    }

    if (!product.description.trim()) {
      setErrordescription('الرجاء إدخال وصف المقال');
      return;
    }

    if (!product.image) {
      setErrorimage('الرجاء تحميل صورة المقال');
      return;
    }

    if (!product.content.trim()) {
      setErrorcontent('الرجاء إدخال محتوى المقال');
      return;
    }

    if (!product.category.trim()) {
      setErrorcategory('الرجاء اختيار فئة');
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const productFormData = new FormData();
      productFormData.append('user', product.user);
      productFormData.append('title', product.title);
      productFormData.append('description', product.description);
      productFormData.append('content', product.content);
      productFormData.append('category', product.category);
      productFormData.append('image_owner', product.image_owner);
      productFormData.append('owner_title', product.owner_title);

      if (product.image) {
        productFormData.append('image', product.image);
      }

      const productResponse = await fetch(`${process.env.NEXT_PUBLIC_URL || ''}post/`, {
        method: 'POST',
        headers: {
          "Authorization": "Token " + (process.env.NEXT_PUBLIC_TOKEN || ''),
        },
        body: productFormData,
      });

      if (!productResponse.ok) {
        const errorData: ApiError = await productResponse.json();
        throw new Error(errorData.message || 'فشل في إنشاء المقال');
      }

      setSuccessMessage('تم إنشاء المقال بنجاح!');
      
      // إعادة تعيين النموذج
      setProduct({
        user: session?.user?.id,
        title: '',
        description: '',
        content: '',
        image: null,
        image_owner: session?.user?.image,
        owner_title: session?.user?.name,
        category: '',
      });
      setMainImagePreview(null);
      
    } catch (error) {
      console.error('خطأ أثناء الإرسال:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء المقال. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setIsSubmitting(false);
      router.push('/account/posts');  
    }
  };

  return (
    <div className="py-4" dir="rtl">
      <div className="px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* العنوان */}
          <div className="bg-sec px-8 py-6">
            <h1 className="text-3xl font-bold text-white">إضافة مقال جديد</h1>
            <p className="text-white mt-2">
              يرجى ملء جميع الحقول المطلوبة المشار إليها بعلامة النجمة. لتحسين مقالك، أكمل جميع الحقول.
            </p>
          </div>

          <div className="p-8">
            {/* رسائل الحالة */}
            {successMessage && (
              <div className="mb-6 p-4  border border-green-200 rounded-xl flex items-center gap-3">
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
                    {/* حقل العنوان */}
                    <div>
                      <label className="block text-xl font-semibold text-gray-700 mb-2">
                        العنوان *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleProductChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                        placeholder="أدخل عنوان المقال"
                      />
                      {errortitle && <p className="text-xl mt-2 text-red-600">{errortitle}</p>}
                    </div>

                    {/* حقل الوصف */}
                    <div className="mt-6">
                      <label className="block text-xl font-semibold text-gray-700 mb-2">
                        الوصف *
                      </label>
                      <textarea
                        name="description"
                        value={product.description}
                        onChange={handleProductChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all resize-none"
                        placeholder="أدخل وصفاً مختصراً"
                      />
                      {errordescription && <p className="text-xl mt-2 text-red-600">{errordescription}</p>}
                    </div>

                    {/* حقل الفئة */}
                    <div className="mt-6">
                      <label className="block text-xl font-semibold text-gray-700 mb-2">
                        الفئة *
                      </label>
                      <select
                        name="category"
                        value={product.category}
                        onChange={handleProductChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all bg-white"
                      >
                        <option value="">اختر فئة</option>
                        <option value="العقارات">العقارات</option>
                        <option value="الفلل">الفلل</option>
                        <option value="الرهون">الرهون العقارية</option>
                        <option value="شائع">شائع</option>
                        <option value="اﻹيجار">اﻹيجار</option>
                        <option value="البناء">البناء</option>
                        <option value="التطوير">التطوير</option>
                        <option value="التصميم">التصميم</option>
                        <option value="اﻹنشاء">اﻹنشاء</option>
                        <option value="اﻷثاث">اﻷثاث</option>
                      </select>
                      {errorcategory && <p className="text-xl mt-2 text-red-600">{errorcategory}</p>}
                    </div>

                    {/* حقل المحتوى */}
                    <div className="mt-6">
                      <label className="block text-xl font-semibold text-gray-700 mb-2">
                        المحتوى *
                      </label>
                      <TiptapEditor
                        content={product.content}
                        onChange={handleContentChange}
                      />
                      {errorcontent && <p className="text-xl mt-2 text-red-600">{errorcontent}</p>}
                    </div>
                  </div>
                </div>

                {/* العمود الأيمن - تحميل الصورة */}
                <div className="lg:col-span-1">
<div className="mb-2 bg-gray-50 rounded-xl p-6 mt-1">
  <label className="block text-xl font-semibold text-gray-500 mb-3">الصورة الرئيسية *</label>
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
                      جاري إنشاء المقال...
                    </span>
                  ) : (
                    'إنشاء مقال'
                  )}
                </button>

                <button
                  type="button"
                  className="px-6 py-3 bg-prim text-white   border border-gray-300 font-semibold rounded-xl hover:bg-sec transition-all"
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
