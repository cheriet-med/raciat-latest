import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useFetchQuikeOrders from '../requests/fetchQuikOrders';

// Dynamically import react-apexcharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Orders {
  id: number;
  name: string;
  phone_number: string;
  date: string | null;
  is_read: boolean;
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
    // Convert Arabic numerals to English
    const englishDateString = convertArabicToEnglishNumbers(dateString);
    
    // Parse the date - assuming format like "١٩/١١/٢٠٢٥" becomes "19/11/2025"
    const parts = englishDateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1; // JavaScript months are 0-based
      const year = parseInt(parts[2]);
      
      return new Date(year, month, day);
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing Arabic date:', error);
    return null;
  }
};

const OrderChart = () => {
  const { orders } = useFetchQuikeOrders();
  const [chartState, setChartState] = useState<ChartState>({
    series: [{ name: 'الطلبات', data: [] }],
    options: {}
  });

  useEffect(() => {
    if (!orders || orders.length === 0) return;

    const processOrderData = (orders: Orders[]) => {
      const monthlyCounts = new Array(12).fill(0);

      orders.forEach(order => {
        if (order.date) {
          const date = parseArabicDate(order.date);
          if (date && !isNaN(date.getTime())) {
            const month = date.getMonth(); // 0-11
            monthlyCounts[month]++;
          }
        }
      });

      return {
        categories: arabicMonths,
        data: monthlyCounts
      };
    };

    const { categories, data } = processOrderData(orders);

    const options: ApexCharts.ApexOptions = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      colors: ['#D9AA52'], // Changed bar color to #D9AA52
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
        text: `الطلبات الشهرية من صفحة العقار (${new Date().getFullYear()})`,
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
      series: [{ name: 'الطلبات', data: data }],
      options: options
    });
  }, [orders]);

  if (!orders) {
    return <div>جاري تحميل البيانات...</div>;
  }

  if (orders.length === 0) {
    return <div>لا توجد طلبات لعرضها</div>;
  }

  return (
    <div className="chart-container" dir="rtl">
      {typeof window !== 'undefined' && chartState.series[0].data.length > 0 && (
        <Chart
          options={chartState.options}
          series={chartState.series}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};

export default OrderChart;