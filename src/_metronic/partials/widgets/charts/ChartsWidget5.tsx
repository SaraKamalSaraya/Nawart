/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../assets/ts/_utils'
import { t } from 'i18next'

type Props = {
  className: string
}

const ChartsWidget5: React.FC<Props> = ({className}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(chartRef.current, getChartOptions(height))
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef])

  return (
    <div className={`card ${className}`}>
  {/* begin::Header */}
  <div className='card-header border-0 pt-5'>
    <h3 className='card-title align-items-start flex-column'>
      <span className='card-label fw-bolder fs-3 mb-1'>{t('Recent Customers')}</span>

      <span className='text-muted fw-bold fs-7'>
        {t('More than')} <span>500</span> {t('new customers')}
      </span>
    </h3>

    {/* begin::Toolbar */}
    <div className='card-toolbar' data-kt-buttons='true'>
      <a
        className='btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1'
        id='kt_charts_widget_5_year_btn'
      >
        {t('Year')}
      </a>

      <a
        className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1'
        id='kt_charts_widget_5_month_btn'
      >
        {t('Month')}
      </a>

      <a
        className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4'
        id='kt_charts_widget_5_week_btn'
      >
        {t('Week')}
      </a>
    </div>
    {/* end::Toolbar */}
  </div>
  {/* end::Header */}

  {/* begin::Body */}
  <div className='card-body'>
    {/* begin::Chart */}
    <div ref={chartRef} id='kt_charts_widget_5_chart' style={{ height: '350px' }}></div>
    {/* end::Chart */}
  </div>
  {/* end::Body */}
</div>

  )
}

export {ChartsWidget5}

function getChartOptions(height: number): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')

  const baseColor = getCSSVariableValue('--bs-primary')
  const secondaryColor = getCSSVariableValue('--bs-info')

  return {
    series: [
      {
        name: t('Net Profit'),
        data: [40, 50, 65, 70, 50, 30],
      },
      {
        name: t('Revenue'),
        data: [-30, -40, -55, -60, -40, -20],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      stacked: true,
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '12%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [t('Feb'), t('Mar'), t('Apr'), t('May'), t('Jun'), t('Jul')],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: -80,
      max: 80,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' '+ t('thousands')
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
}
