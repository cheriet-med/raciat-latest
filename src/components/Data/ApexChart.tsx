'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import useFetchListing from "../requests/fetchListings";
import useFetchPostListing from "../requests/fetchPostsListings";
import useFetchAllUser from "../requests/fetchAllUsers";
import useFetchAllNewsLetterEmails from "../requests/fetchAllNewsletters";
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

const ApexChart: React.FC = () => {
  const { listings, error, mutate } = useFetchListing(); 
  const { listingsp } = useFetchPostListing();
  const { AllUsers } = useFetchAllUser();
  const { AllNewsLetters } = useFetchAllNewsLetterEmails();
  const { orders } = useFetchQuikeOrders();

  // Memoize the series data to prevent unnecessary updates
  const seriesData = useMemo(() => {
    return [
      listings?.length || 0,
      AllUsers?.length || 0,
      AllNewsLetters?.length || 0,
      orders?.length || 0,
      listingsp?.length || 0
    ];
  }, [
    listings?.length,
    AllUsers?.length,
    AllNewsLetters?.length,
    orders?.length,
    listingsp?.length
  ]);

  const [chartState, setChartState] = useState<ChartState>({
    series: [0, 0, 0, 0, 0],
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      labels: [
        'العقارات',
        'المستخدمين',
        'النشرات البريدية',
        'الطلبات',
        'المقالات'
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
        text: 'إحصائيات الموقع'
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
            width={380} 
            height={370}
          />
        </div>
      </div>
    </div>
  );
};

export default ApexChart;