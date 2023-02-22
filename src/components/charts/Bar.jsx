import { Chart } from 'react-chartjs-2';
import {
  defaults,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from 'chart.js';

import PropTypes from 'prop-types';

import useThemeOptions from 'utilities/hooks/useThemeOptions';

import ConfigChartJS from 'config/chartjs';

import DataChartJS from 'data/chartjs';

// Chart register
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Bar with Shadow
class BarWithShadow extends BarController {
  draw(ease) {
    const ctx = this.chart.ctx;

    const originalStroke = ctx.stroke;

    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      originalStroke.apply(this, arguments);
      ctx.restore();
    };

    BarController.prototype.draw.call(this, ease);
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    BarController.prototype.draw.apply(this, arguments);
    ctx.restore();
  }
}

BarWithShadow.id = 'barWithShadow';
ChartJS.register(BarWithShadow);

const Bar = (props) => {
  const { withShadow } = props;

  const { colors, fonts } = useThemeOptions();

  // Chart defaults
  defaults.color = 'rgb(' + colors.text + ')';
  defaults.font.family = fonts.body;

  const barOptions = ConfigChartJS().bar;
  const barData = DataChartJS().bar;

  return <Chart type={withShadow ? 'barWithShadow' : 'bar'} options={barOptions} data={barData} />;
};

Bar.propTypes = {
  withShadow: PropTypes.bool,
};

export default Bar;
