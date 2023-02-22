import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  defaults,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from 'chart.js';

import PropTypes from 'prop-types';

import useThemeOptions from 'utilities/hooks/useThemeOptions';

import ConfigChartJS from 'config/chartjs';

import DataChartJS from 'data/chartjs';

// Chart register
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Line with shadow element
require('components/charts/LineWithShadowElement');

// Line with shadow
class LineWithShadow extends LineController {}

LineWithShadow.id = 'lineWithShadow';
LineWithShadow.defaults = {
  datasetElementType: 'lineWithShadowElement',
};

ChartJS.register(LineWithShadow);

const Line = (props) => {
  const { data, withShadow } = props;

  const { colors, fonts } = useThemeOptions();

  // Chart defaults
  defaults.color = 'rgb(' + colors.text + ')';
  defaults.font.family = fonts.body;

  const lineOptions = ConfigChartJS().line;
  const lineData = DataChartJS().line;

  return (
    <Chart
      type={withShadow ? 'lineWithShadow' : 'line'}
      options={lineOptions}
      data={data ? data : lineData}
    />
  );
};

Line.propTypes = {
  withShadow: PropTypes.bool,
};

export default Line;
