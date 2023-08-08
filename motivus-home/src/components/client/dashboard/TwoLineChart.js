import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import { commonProperties as _commonProperties } from './LineChart'
import { makeStyles, useTheme } from '@material-ui/core'
import { createStringLiteral } from 'typescript'
import { dark } from '@material-ui/core/styles/createPalette'

const useStyle = makeStyles((theme) => {
  const dark = theme.palette.type === 'dark'
  const commonProperties = _commonProperties(dark)

  return {
    wrapper: {
      height: commonProperties.height,
      position: 'relative',
    },
    graphContainer: {
      height: commonProperties.height,
      position: 'absolute',
      top: '0px',
      width: '100%',
      zIndex: '0',
    },

    secondGraph: {
      height: commonProperties.height,
      position: 'absolute',
      top: '0px',
      width: '100%',
      zIndex: '4',
    },
  }
})

const line1Color = '#FE47E4'

const commonProperties = {
  ..._commonProperties,
  margin: { ..._commonProperties.margin, right: 50 },
}

export default function App({ data1, data2 }) {
  const theme = useTheme()
  const dark = theme.palette.type === 'dark'

  const commonProperties = {
    ..._commonProperties(dark),
    margin: { ..._commonProperties(dark).margin, right: 50 },
  }

  //console.log('Graph1 Data: ', data1)
  const classes = useStyle()
  const data12 = data1.concat(data2)
  //console.log(data12)
  return (
    <div className={classes.wrapper}>
      <div className={classes.graphContainer}>
        <ResponsiveLine
          {...commonProperties}
          data={data1}
          colors={[line1Color]}
          axisLeft={{
            legend: 'TFPLOS',
            legendOffset: 12,
          }}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d',
            useUTC: false,
            precision: 'day',
          }}
          xFormat='time:%Y-%m-%d'
          axisBottom={{
            format: '%b %d',
            tickValues: 'every 2 days',
            legend: 'time scale',
            legendOffset: -12,
          }}
          enableGridX={false}
          pointSize={8}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              translateX: -90,
              translateY: 60,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 0,
              itemHeight: 20,
              itemOpacity: 1,
              symbolSize: 9,
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
      </div>

      <div className={classes.secondGraph}>
        <SecondGraph data2={data12} />
      </div>
    </div>
  )
}

// I want this to be on top of the other graph
const SecondGraph = ({ data2 }) => {
  const theme = useTheme()
  const dark = theme.palette.type === 'dark'
  const commonProperties = {
    ..._commonProperties(dark),
    margin: { ..._commonProperties(dark).margin, right: 50 },
  }

  return (
    <ResponsiveLine
      {...commonProperties}
      data={data2}
      colors={[
        'rgba(255, 255, 255, 0)',
        '#28F4C9',
      ]} /* Make the first line transparent with 0 opacity */
      axisRight={{
        legend: 'Credits',
        legendOffset: -12,
      }}
      axisLeft={null}
      axisTop={null}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d',
        useUTC: false,
        precision: 'day',
      }}
      xFormat='time:%Y-%m-%d'
      axisBottom={null}
      /* Add this for tooltip */
      useMesh={true}
      enableSlices='x'
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateX: 30,
          translateY: 60,
          itemsSpacing: 70,
          itemDirection: 'left-to-right',
          itemWidth: 0,
          itemHeight: 20,
          itemOpacity: 1,
          symbolSize: 9,
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
      sliceTooltip={({ slice }) => {
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
                  color:
                    point.serieColor === 'rgba(255, 255, 255, 0)'
                      ? line1Color
                      : point.serieColor,
                  padding: '3px 0',
                }}
              >
                <strong>{point.serieId}</strong> [{point.data.yFormatted}]
              </div>
            ))}
          </div>
        )
      }}
    />
  )
}

const getColoredAxis = (color) => {
  return {
    axis: {
      ticks: {
        line: {
          stroke: color,
        },
        text: { fill: color },
      },
      legend: {
        text: {
          fill: color,
        },
      },
    },
  }
}
