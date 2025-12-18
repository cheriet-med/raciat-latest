'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import useFetchAllBookings from "../requests/fetchAllBookings";
import useFetchQuikeOrders from "../requests/fetchQuikOrders";

// Use dynamic import with proper configuration for Next.js 14
const ReactApexChart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => (
    <div 
      className="flex items-center justify-center text-gray-500" 
      style={{ width: 380, height: 370 }}
    >
      جار تحميل الرسم البياني...
    </div>
  )
});

// More specific TypeScript interfaces
interface ChartOptions {
  chart: {
    width: number;
    type: 'donut';
  };
  labels: string[];
  plotOptions: {
    pie: {
      startAngle: number;
      endAngle: number;
    };
  };
  dataLabels: {
    enabled: boolean;
  };
  fill: {
    type: 'gradient';
  };
  legend: {
    formatter: (val: string, opts: any) => string;
  };
  title: {
    text: string;
  };
  responsive: Array<{
    breakpoint: number;
    options: {
      chart: {
        width: number;
      };
      legend: {
        position: 'bottom';
      };
    };
  }>;
}

interface ChartState {
  series: number[];
  options: ChartOptions;
}

const DenutStatistics: React.FC = () => {
  const { AllBookings } = useFetchAllBookings();
  const { orders } = useFetchQuikeOrders();

  // Memoize the series data to prevent unnecessary updates
  const seriesData = useMemo(() => {
    if (!AllBookings) return [0, 0, 0, 0, 0, 0];

    const totalBookings = AllBookings.length;
    const completedDeals = AllBookings.filter(booking => booking.status === "منتهي").length;
    const totalOrders = orders?.length || 0;
    const totalDealsAmount = AllBookings
      .filter(booking => booking.status === "منتهي")
      .reduce((sum, booking) => sum + (Number(booking.price) || 0), 0);
    const totalBookingsAmount = AllBookings
      .reduce((sum, booking) => sum + (Number(booking.price) || 0), 0);
    const uncollectedAmount = AllBookings
      .filter(booking => booking.status !== "منتهي")
      .reduce((sum, booking) => sum + (Number(booking.price) || 0), 0);

    return [
      totalBookings,
      completedDeals,
      totalOrders,
      totalDealsAmount,
      totalBookingsAmount,
      uncollectedAmount
    ];
  }, [AllBookings, orders]);

  const [chartState, setChartState] = useState<ChartState>({
    series: [0, 0, 0, 0, 0, 0],
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      labels: [
        'عدد التذاكر المتوفرة',
        'عدد الصفقات',
        'عدد الطلبات',
        'مبلغ الصفقات المحصل (ريال)',
        'مبلغ التذاكر (ريال)',
        'المبلغ الغير محصل (ريال)'
      ],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function(val: string, opts: any) {
          return `${val} - ${opts.w.globals.series[opts.seriesIndex]}`;
        }
      },
      title: {
        text: 'إحصائيات شاملة'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });

  // Update chart data only when seriesData actually changes
  useEffect(() => {
    setChartState(prevState => ({
      ...prevState,
      series: seriesData
    }));
  }, [seriesData]);

  return (
    <div className='flex justify-center items-center'> 
      <div className="chart-container">
        <div id="chart">
          <ReactApexChart 
            options={chartState.options} 
            series={chartState.series} 
            type="donut" 
            width={450} 
            height={450}
          />
        </div>
      </div>
    </div>
  );
};

export default DenutStatistics;