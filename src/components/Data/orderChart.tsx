import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useFetchAllBookings from '../requests/fetchAllBookings';

// Dynamically import react-apexcharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Bookings {
  id: number;
  user: number;
  name: string;
  address?: string;
  badrooms_number?: string;
  created_at: string;
  description?: string | null;
  hurry?: string;
  image?: string;
  is_read: boolean;
  latitude?: string;
  location?: string;
  longtitude?: string;
  max_price?: string;
  min_price?: string;
  phone?: string;
  potential_client?: any;
  price: string;
  reason: string;
  region?: string;
  representative?: any;
  rooms_number?: string;
  status: string;
  surface?: string;
  types?: string;
  updated_at?: string;
}

interface ChartState {
  series: Array<{ name: string; data: number[] }>;
  options: ApexCharts.ApexOptions;
}

// Arabic month names
const arabicMonths = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

// Function to convert Arabic numerals to English
const convertArabicToEnglishNumbers = (arabicString: string): string => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return arabicString.replace(/[٠-٩]/g, (char) => {
    return arabicNumbers.indexOf(char).toString();
  });
};

// Function to parse Arabic date string
const parseArabicDate = (dateString: string): Date | null => {
  try {
    // Remove any non-numeric characters except slashes
    const cleanedDateString = dateString.replace(/[^٠-٩/]/g, '');
    
    // Convert Arabic numerals to English
    const englishDateString = convertArabicToEnglishNumbers(cleanedDateString);
    
    // Parse the date - assuming format like "١٩/١١/٢٠٢٥" becomes "19/11/2025"
    const parts = englishDateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1; // JavaScript months are 0-based
      const year = parseInt(parts[2]);
      
      // Validate date components
      if (day >= 1 && day <= 31 && month >= 0 && month <= 11 && year >= 2000) {
        return new Date(year, month, day);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing Arabic date:', error);
    return null;
  }
};

const OrderChart = () => {
  const { AllBookings, mutate, isLoading, error } = useFetchAllBookings();
  const [chartState, setChartState] = useState<ChartState>({
    series: [{ name: 'الحجوزات', data: [] }],
    options: {}
  });

  useEffect(() => {
    if (!AllBookings || AllBookings.length === 0) {
      // Don't reset state here to avoid infinite loop
      return;
    }

    const processBookingData = (bookings: Bookings[]) => {
      const monthlyCounts = new Array(12).fill(0);
      let hasValidData = false;

      bookings.forEach(booking => {
        if (booking.created_at) {
          console.log(`Original created_at: ${booking.created_at}`);
          
          // Use the Arabic date parser for Arabic numeral dates
          const date = parseArabicDate(booking.created_at);
          
          if (date && !isNaN(date.getTime())) {
            const month = date.getMonth(); // 0-11
            monthlyCounts[month]++;
            hasValidData = true;
            console.log(`Booking ${booking.id}: ${booking.created_at} -> Parsed: ${date} -> Month: ${month}`);
          } else {
            console.log(`Invalid Arabic date for booking ${booking.id}: ${booking.created_at}`);
            
            // Fallback: try regular date parsing if Arabic parsing fails
            const fallbackDate = new Date(booking.created_at);
            if (!isNaN(fallbackDate.getTime())) {
              const month = fallbackDate.getMonth();
              monthlyCounts[month]++;
              hasValidData = true;
              console.log(`Fallback parsing successful for booking ${booking.id}: Month: ${month}`);
            }
          }
        } else {
          console.log(`No created_at for booking ${booking.id}`);
        }
      });

      console.log('Monthly counts:', monthlyCounts);
      console.log('Has valid data:', hasValidData);

      return {
        categories: arabicMonths,
        data: monthlyCounts,
        hasValidData: hasValidData
      };
    };

    const { categories, data, hasValidData } = processBookingData(AllBookings);

    if (!hasValidData) {
      console.log('No valid date data found in bookings');
      return;
    }

    const options: ApexCharts.ApexOptions = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      colors: ['#D9AA52'],
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toString();
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#D9AA52"]
        }
      },
      xaxis: {
        categories: categories,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            fontFamily: 'Arial, sans-serif',
            cssClass: 'apexcharts-xaxis-label'
          }
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#D9AA52',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: number) {
            return val.toString();
          }
        }
      },
      title: {
        text: `رسم بياني يمثل عدد الطلبات شهريا (${new Date().getFullYear()})`,
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#D9AA52',
          fontFamily: 'Arial, sans-serif'
        }
      },
      tooltip: {
        enabled: true,
        style: {
          fontFamily: 'Arial, sans-serif'
        }
      }
    };

    setChartState({
      series: [{ name: 'الحجوزات', data: data }],
      options: options
    });
  }, [AllBookings]);

  if (isLoading) {
    return <div>جاري تحميل البيانات...</div>;
  }

  if (error) {
    return <div>حدث خطأ في تحميل البيانات</div>;
  }

  if (!AllBookings || AllBookings.length === 0) {
    return <div>لا توجد حجوزات لعرضها</div>;
  }

  return (
    <div className="chart-container" dir="rtl">
      {typeof window !== 'undefined' && chartState.series[0].data.length > 0 ? (
        <Chart
          options={chartState.options}
          series={chartState.series}
          type="bar"
          height={350}
        />
      ) : (
        <div>
          <p>عدد الحجوزات: {AllBookings.length}</p>
          <p>جاري معالجة بيانات التواريخ العربية...</p>
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
            <p>تفاصيل الحجوزات:</p>
            {AllBookings.map(booking => (
              <div key={booking.id} style={{ margin: '5px 0' }}>
                الحجز #{booking.id}: {booking.created_at || 'لا يوجد تاريخ'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderChart;