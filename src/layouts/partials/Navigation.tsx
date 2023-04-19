import Tabs from 'components/Tabs';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const LinkItem = ({ to, name }: { to: string; name: string }) => {
    return (
      <li className='rounded-sm'>
        <Link to={to}>
          <div className='flex items-center space-x-3 rounded-md p-2'>
            <span>{name}</span>
          </div>
        </Link>
      </li>
    );
  };

  return (
    <Tabs>
      <LinkItem to={'/'} name={'Dashboard'} />
      <LinkItem to={'/content'} name={'Content'} />
      <LinkItem to={'/content/enum'} name={'Content Enum'} />
      <LinkItem to={'/content-type'} name={'Content Type'} />
    </Tabs>
  );
}
