import { ResponsiveLine } from '@nivo/line'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

const colorGrpah = '#FE47E4'

export const commonProperties = (dark) => ({
  height: 500,
  margin: { top: 30, right: 5, bottom: 150, left: 50 },
  animate: true,
  theme: {
    background: 'rgba(0,0,0,0)',
    textColor: dark ? '#ffffff' : '#000000',
    fontSize: 13,

    axis: {
      domain: {
        line: {
          stroke: dark ? '#ffffff' : '#000000',
          strokeWidth: 2,
        },
      },
      ticks: {
        line: {
          stroke: dark ? '#ffffff' : '#000000',
          strokeWidth: 0.2,
        },
      },
    },
    grid: {
      line: {
        stroke: '#000000',
        strokeWidth: 0.2,
      },
    },
  },
})

const respaldo = {
  yFormat: ' >-.2f',
  xScale: {
    type: 'time',
    format: '%Y-%m-%d',
    useUTC: false,
    precision: 'day',
  },
  xFormat: 'time:%Y-%m-%d',
  yScale: {
    type: 'linear',
    stacked: true,
  },
  axisLeft: {
    legend: 'linear scale',
    legendOffset: 12,
  },
  axisBottom: {
    format: '%b %d',
    tickValues: 'every 2 days',
    legend: 'time scale',
    legendOffset: -12,
  },
  curve: 'linear',
  enablePointLabel: false,
  pointSize: 8,
  useMesh: true,
  enableGridX: false,
}

const MyResponsiveLine = ({ data }) => {
  const theme = useTheme()
  const dark = theme.palette.type === 'dark'
  return (
    <ResponsiveLine
      {...commonProperties(dark)}
      data={data}
      enableSlices='x'
      sliceTooltip={({ slice, ...other }) => {
        //console.log(slice.points[0].data.xFormatted)
        return (
          <div
            style={{
              background: '#2C2771',
              padding: '9px 12px',
              border: '1px solid #ccc',
            }}
          >
            <div style={{ color: 'white' }}>
              {slice.points[0].data.xFormatted}
            </div>
            {slice.points.map((point) => (
              <div
                key={point.id}
                style={{
                  color: point.serieColor,
                  padding: '3px 0',
                }}
              >
                <strong>{point.serieId}</strong> [{point.data.yFormatted}]
              </div>
            ))}
          </div>
        )
      }}
      colors={['#FE47E4', '#28F4C9', '#F3C75F']}
      yFormat=' >-.2f'
      xScale={{
        type: 'time',
        format: '%Y-%m-%d',
        useUTC: false,
        precision: 'day',
      }}
      xFormat='time:%Y-%m-%d'
      yScale={{
        type: 'linear',
      }}
      axisLeft={{
        legend: 'linear scale',
        legendOffset: 12,
      }}
      axisBottom={{
        format: '%b %d',
        tickValues: 'every 2 days',
        legend: 'time scale',
        legendOffset: -12,
      }}
      curve='linear'
      enablePointLabel={false}
      pointSize={8}
      useMesh={true}
      enableGridX={false}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateX: -30,
          translateY: 60,
          itemsSpacing: 50,
          itemDirection: 'left-to-right',
          itemWidth: 0,
          itemHeight: 20,
          itemOpacity: 1,
          symbolSize: 8,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}

export default MyResponsiveLine
