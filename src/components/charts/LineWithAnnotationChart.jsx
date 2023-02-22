import { useState } from 'react';

import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  defaults,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  LineController,
} from 'chart.js';

import PropTypes from 'prop-types';

import useThemeOptions from 'utilities/hooks/useThemeOptions';

// Chart register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

// Line with annotation
class LineWithAnnotation extends LineController {
  draw(ease) {
    const ctx = this.chart.ctx;

    LineController.prototype.draw.call(this, ease);

    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
      const activePoint = this.chart.tooltip._active[0];
      const x = activePoint.element.x;
      const topY = this.chart.scales['y'].top;
      const bottomY = this.chart.scales['y'].bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
  }
}

LineWithAnnotation.id = 'lineWithAnnotation';

ChartJS.register(LineWithAnnotation);

// Line with shadow element
require('components/charts/LineWithShadowElement');

// Line with annotation and shadow
class LineWithAnnotationAndShadow extends LineWithAnnotation {}

LineWithAnnotationAndShadow.id = 'lineWithAnnotationAndShadow';
LineWithAnnotationAndShadow.defaults = {
  datasetElementType: 'lineWithShadowElement',
};

ChartJS.register(LineWithAnnotationAndShadow);

const LineWithAnnotationChart = (props) => {
  const { data, withShadow } = props;

  const { colors, fonts } = useThemeOptions();

  const [heading, setHeading] = useState();
  const [value, setValue] = useState();
  const [label, setLabel] = useState();

  // Chart defaults
  defaults.color = 'rgb(' + colors.text + ')';
  defaults.font.family = fonts.body;

  // Line with annotation plugin
  const lineWithAnnotationPlugin = {
    afterInit: (chart) => {
      const value = chart.data.datasets[0].data[0];
      const heading = chart.data.datasets[0].label;
      const label = chart.data.labels[0];

      setHeading(heading);
      setValue(value);
      setLabel(label);
    },
  };

  // Options
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        intersect: false,
        external: (ctx) => {
          const value = ctx.tooltip.dataPoints[0].formattedValue;
          const heading = ctx.tooltip.dataPoints[0].dataset.label;
          const label = ctx.tooltip.dataPoints[0].label;

          setHeading(heading);
          setValue(value);
          setLabel(label);
        },
      },
    },
    scales: {
      y: {
        display: false,
      },

      x: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <>
      <h6 className='chart-heading uppercase'>{heading}</h6>
      <h4 className='chart-value mt-2 text-2xl'>${value}</h4>
      <small className='chart-label uppercase'>{label}</small>
      <div className='mt-5'>
        <Chart
          type={withShadow ? 'lineWithAnnotationAndShadow' : 'lineWithAnnotation'}
          options={options}
          data={data}
          plugins={[lineWithAnnotationPlugin]}
        />
      </div>
    </>
  );
};

LineWithAnnotationChart.propTypes = {
  withShadow: PropTypes.bool,
};

export default LineWithAnnotationChart;
