'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Save, Award, Users, Eye, MapPin, ImagePlus } from 'lucide-react';

// Define types for your data structure
type ImageField = 'hero_1' | 'hero_2' | 'section_features' | 'section_steps' | 
                  'place_image_1' | 'place_image_2' | 'place_image_3' | 
                  'place_image_4' | 'place_image_5' | 'place_image_6';

type TextField = 'awards' | 'agents' | 'visites' | 
                 'place_title_1' | 'place_title_2' | 'place_title_3' | 
                 'place_title_4' | 'place_title_5' | 'place_title_6';

type DataType = {
  [key in ImageField]: string | null;
} & {
  [key in TextField]: string;
};

type PreviewType = {
  [key in ImageField]: string | null;
};

type FileType = {
  [key in ImageField]: File | null;
};

export default function HomepageEditor() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [data, setData] = useState<DataType>({
    hero_1: null,
    hero_2: null,
    section_features: null,
    awards: '',
    agents: '',
    visites: '',
    place_image_1: null,
    place_title_1: '',
    place_image_2: null,
    place_title_2: '',
    place_image_3: null,
    place_title_3: '',
    place_image_4: null,
    place_title_4: '',
    place_image_5: null,
    place_title_5: '',
    place_image_6: null,
    place_title_6: '',
    section_steps: null
  });

  const [previews, setPreviews] = useState<PreviewType>({
    hero_1: null,
    hero_2: null,
    section_features: null,
    place_image_1: null,
    place_image_2: null,
    place_image_3: null,
    place_image_4: null,
    place_image_5: null,
    place_image_6: null,
    section_steps: null
  });

  const [files, setFiles] = useState<FileType>({
    hero_1: null,
    hero_2: null,
    section_features: null,
    place_image_1: null,
    place_image_2: null,
    place_image_3: null,
    place_image_4: null,
    place_image_5: null,
    place_image_6: null,
    section_steps: null
  });

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.raciat.com/homepageid/1');
      
      if (!response.ok) {
        throw new Error('فشل في تحميل البيانات');
      }

      const result = await response.json();
      
      setData({
        hero_1: result.hero_1 || null,
        hero_2: result.hero_2 || null,
        section_features: result.section_features || null,
        awards: result.awards || '',
        agents: result.agents || '',
        visites: result.visites || '',
        place_image_1: result.place_image_1 || null,
        place_title_1: result.place_title_1 || '',
        place_image_2: result.place_image_2 || null,
        place_title_2: result.place_title_2 || '',
        place_image_3: result.place_image_3 || null,
        place_title_3: result.place_title_3 || '',
        place_image_4: result.place_image_4 || null,
        place_title_4: result.place_title_4 || '',
        place_image_5: result.place_image_5 || null,
        place_title_5: result.place_title_5 || '',
        place_image_6: result.place_image_6 || null,
        place_title_6: result.place_title_6 || '',
        section_steps: result.section_steps || null
      });

      // Set image previews
      const newPreviews: PreviewType = {
        hero_1: null,
        hero_2: null,
        section_features: null,
        place_image_1: null,
        place_image_2: null,
        place_image_3: null,
        place_image_4: null,
        place_image_5: null,
        place_image_6: null,
        section_steps: null
      };
      
      const imageFields: ImageField[] = [
        'hero_1', 'hero_2', 'section_features', 'place_image_1', 'place_image_2', 
        'place_image_3', 'place_image_4', 'place_image_5', 'place_image_6', 'section_steps'
      ];
      
      imageFields.forEach(key => {
        if (result[key]) {
          newPreviews[key] = `${process.env.NEXT_PUBLIC_IMAGE}/${result[key]}`;
        }
      });
      setPreviews(newPreviews);

    } catch (error) {
      console.error('خطأ في التحميل:', error);
      setErrorMessage('فشل في تحميل بيانات الصفحة الرئيسية');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof DataType, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (field: ImageField, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({ ...prev, [field]: file }));
      const url = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [field]: url }));
    }
  };

  const removeImage = (field: ImageField) => {
    setFiles(prev => ({ ...prev, [field]: null }));
    if (previews[field] && previews[field]!.startsWith('blob:')) {
      URL.revokeObjectURL(previews[field]!);
    }
    setPreviews(prev => ({ ...prev, [field]: null }));
    setData(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append('awards', data.awards);
      formData.append('agents', data.agents);
      formData.append('visites', data.visites);
      formData.append('place_title_1', data.place_title_1);
      formData.append('place_title_2', data.place_title_2);
      formData.append('place_title_3', data.place_title_3);
      formData.append('place_title_4', data.place_title_4);
      formData.append('place_title_5', data.place_title_5);
      formData.append('place_title_6', data.place_title_6);

      // Add image files if they were changed
      const imageFields: ImageField[] = [
        'hero_1', 'hero_2', 'section_features', 'place_image_1', 'place_image_2',
        'place_image_3', 'place_image_4', 'place_image_5', 'place_image_6', 'section_steps'
      ];
      
      imageFields.forEach(key => {
        if (files[key]) {
          formData.append(key, files[key]!);
        }
      });

      const response = await fetch('https://api.raciat.com/homepageid/1', {
        method: 'PUT',
        headers: {
          "Authorization": `Token ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('فشل في تحديث البيانات');
      }

      setSuccessMessage('تم تحديث الصفحة الرئيسية بنجاح!');
      
      // Refresh data after successful update
      setTimeout(() => {
        fetchHomepageData();
        setSuccessMessage('');
      }, 2000);
      
    } catch (error) {
      console.error('خطأ في التحديث:', error);
      setErrorMessage('حدث خطأ أثناء تحديث البيانات');
    } finally {
      setIsSubmitting(false);
    }
  };

  interface ImageUploadFieldProps {
    field: ImageField;
    label: string;
    preview: string | null;
  }
const ImageUploadField = ({ field, label, preview }: ImageUploadFieldProps) => (
  <div>
    <label className="text-lg font-semibold text-gray-700 mb-2">{label}</label>
    {!preview ? (
      <label className="cursor-pointer">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-sec hover:bg-blue-50 transition-all">
          <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-lg text-gray-600">انقر لتحميل الصورة</p>
          <p className="text-sm text-gray-500 mt-1">المدعومة: JPG, PNG, GIF, WebP, AVIF</p>
        </div>
        <input
          type="file"
          accept=".avif,.webp,.jpg,.jpeg,.png,.gif,image/*"
          onChange={(e) => handleImageChange(field, e)}
          className="hidden"
        />
      </label>
    ) : (
      <div className="relative group">
        <img
          src={preview}
          alt={label}
          className="w-full h-96 object-cover rounded-lg border-2 border-gray-200"
        />
        <button
          type="button"
          onClick={() => removeImage(field)}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
        >
          <X className="w-4 h-4" />
        </button>
        <label className="mt-2 inline-flex items-center gap-2 px-3 py-2 text-xl text-prim rounded-lg hover:bg-sec border border-prim transition-colors cursor-pointer">
          <Upload className="w-4 h-4" />
          تغيير الصورة
          <input
            type="file"
            accept=".avif,.webp,.jpg,.jpeg,.png,.gif,image/*"
            onChange={(e) => handleImageChange(field, e)}
            className="hidden"
          />
        </label>
      </div>
    )}
  </div>
);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sec border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className=" mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="bg-sec px-8 py-6">
            <h1 className="text-3xl font-bold text-white">تحرير الصفحة الرئيسية</h1>
            <p className="text-white mt-2">قم بتحديث محتوى وصور الصفحة الرئيسية</p>
          </div>
        </div>

        {/* Status Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-green-800 font-medium">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <X className="w-8 h-8 text-red-600" />
            <span className="text-red-800 font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Section 1: Hero Images */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <ImagePlus className="w-8 h-8 text-sec" />
            <h2 className="text-2xl font-bold text-sec">صور متحركة</h2>
            
          </div>
          <h3 className="text-xl font-bold py-2 text-sec"> يجب أن تكون أبعاد الصورة1280 في الطول و 853 في العرض px</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploadField field="hero_1" label="صورة متحركة 1" preview={previews.hero_1} />
            <ImageUploadField field="hero_2" label="صورة متحركة 2" preview={previews.hero_2} />
          </div>
        </div>

        {/* Section 2: Features Section Image */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-sec" />
            <h2 className="text-2xl font-bold text-sec">صورة قسم المميزات</h2>
          </div>
              <h3 className="text-xl font-bold py-2 text-sec"> يجب أن تكون أبعاد الصورة1280 في الطول و 718 في العرض px</h3>
          <div className="grid grid-cols-1 gap-6">
            <ImageUploadField 
              field="section_features" 
              label="صورة قسم المميزات" 
              preview={previews.section_features} 
            />
          </div>
        </div>

        {/* Section 3: Statistics */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-sec" />
            <h2 className="text-2xl font-bold text-sec">الإحصائيات</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className=" text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                عدد الجوائز
              </label>
              <input
                type="number"
                value={data.awards}
                onChange={(e) => handleInputChange('awards', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                placeholder="211"
              />
            </div>
            <div>
              <label className=" text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Users className="w-6 h-6 text-sec" />
                عدد الوكلاء
              </label>
              <input
                type="number"
                value={data.agents}
                onChange={(e) => handleInputChange('agents', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                placeholder="352"
              />
            </div>
            <div>
              <label className=" text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Eye className="w-6 h-6 text-sec" />
                عدد الزيارات
              </label>
              <input
                type="number"
                value={data.visites}
                onChange={(e) => handleInputChange('visites', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                placeholder="152"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Places */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-8 h-8 text-sec" />
            <h2 className="text-2xl font-bold text-sec">الأماكن المميزة</h2>
          </div>
           <h3 className="text-xl font-bold py-4 text-sec"> يجب أن تكون أبعاد الصورة 600 في الطول و 600 في العرض px ماعدا صورتي المكان 3 و 4 يجب أن تكون 1260 في الطول ة 600 في العرض px</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(num => {
              const imageField = `place_image_${num}` as ImageField;
              const titleField = `place_title_${num}` as TextField;
              
              return (
                <div key={num} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                 
                  <ImageUploadField 
                    field={imageField}
                    label={`صورة المكان ${num}`} 
                    preview={previews[imageField]} 
                  />
                  <div className="mt-4">
                    <label className=" text-sm font-semibold text-gray-700 mb-2">عنوان المكان</label>
                    <input
                      type="text"
                      value={data[titleField]}
                      onChange={(e) => handleInputChange(titleField, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-all"
                      placeholder={`عنوان المكان ${num}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 5: Steps Section Image */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-8 h-8 text-sec" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-2xl font-bold text-sec">صورة قسم الخطوات</h2>
          </div>
             <h3 className="text-xl font-bold py-2 text-sec"> يجب أن تكون أبعاد الصورة1280 في الطول و 853 في العرض px</h3>
          <div className="grid grid-cols-1 gap-6">
            <ImageUploadField 
              field="section_steps" 
              label="صورة قسم الخطوات" 
              preview={previews.section_steps} 
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full px-6 py-4 bg-sec text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-3 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-sec hover:to-prim hover:shadow-sm'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="w-8 h-8" />
                حفظ التغييرات
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}