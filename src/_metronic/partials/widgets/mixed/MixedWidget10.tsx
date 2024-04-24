/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
}

const MixedWidget10: React.FC<Props> = ({className, chartColor, chartHeight}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight))
    if (chart) {
      chart.render()
    }

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef])


  const {t} = useTranslation();

  return (
    <div className={`card ${className}`}>
      <div className='card-body d-flex flex-column p-0'>
        <div className='flex-grow-1 card-p pb-0'>
          <div className='d-flex flex-stack flex-wrap'>
            <div className='me-2'>
              <a href='#' className='text-dark text-hover-primary fw-bolder fs-3'>
                {t('Generate Reports')}
              </a>
              <div className='text-muted fs-7 fw-bold'>{t('Finance and accounting reports')}</div>
            </div>
            <div className={`fw-bolder fs-3 text-${chartColor}`}>$24,500</div>
          </div>
        </div>
        <div ref={chartRef} className='mixed-widget-7-chart card-rounded-bottom'></div>
      </div>
    </div>
  )
}

const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-800')
  const strokeColor = getCSSVariableValue('--bs-gray-300')
  const baseColor = getCSSVariableValue('--bs-' + chartColor)
  const lightColor = getCSSVariableValue('--bs-light-' + chartColor)

  return {
    series: [
      {
        name: t('Net Profit'),
        data: [15, 25, 15, 40, 20, 50],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
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
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
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
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColors: [baseColor],
      strokeWidth: 3,
    },
  }
}

export {MixedWidget10}
