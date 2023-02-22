import Footer from 'layouts/partials/Footer';

// import LineWithAnnotationChart from 'components/charts/LineWithAnnotationChart';
// import Area from 'components/charts/Area';
import Badge from 'components/Badge';
import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
import Button from 'components/Button';
import CustomSelect from 'components/form/CustomSelect';
import Input from 'components/form/Input';
import Label from 'components/form/Label';
// import PolarArea from 'components/charts/PolarArea';
import Textarea from 'components/form/Textarea';

// import DataChartJS from 'data/chartjs';

import api from 'api';

const Content = () => {
  const { data, isFetching } = api.useGetContentListQuery({});

  return (
    <main className='workspace'>
      {/* Breadcrumb */}
      <section className='breadcrumb'>
        <h1>Content</h1>
      </section>

      <div className='container'>{data ? JSON.stringify(data.data) : ''}</div>

      <table className='table'>
        <thead>
          <th>a</th>
          <th>b</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </main>
  );
};

export default Content;
