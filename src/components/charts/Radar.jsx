import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  defaults,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController,
} from 'chart.js';

import PropTypes from 'prop-types';

import useThemeOptions from 'utilities/hooks/useThemeOptions';

import ConfigChartJS from 'config/chartjs';

import DataChartJS from 'data/chartjs';

// Chart register
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Line with shadow element
require('components/charts/LineWithShadowElement');

// Radar with shadow
class RadarWithShadow extends RadarController {}

RadarWithShadow.id = 'radarWithShadow';
RadarWithShadow.defaults = {
  datasetElementType: 'lineWithShadowElement',
};

ChartJS.register(RadarWithShadow);

const Radar = (props) => {
  const { data, withShadow } = props;

  const { colors, fonts } = useThemeOptions();

  // Chart defaults
  defaults.color = 'rgb(' + colors.text + ')';
  defaults.font.family = fonts.body;

  const radarOptions = ConfigChartJS().radar;
  const radarData = DataChartJS().radar;

  return (
    <Chart
      type={withShadow ? 'radarWithShadow' : 'radar'}
      options={radarOptions}
      data={data ? data : radarData}
    />
  );
};

Radar.propTypes = {
  withShadow: PropTypes.bool,
};

export default Radar;
