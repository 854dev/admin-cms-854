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
    <nav className='flex'>
      <div className='flex h-screen w-60 flex-col bg-white p-3 shadow'>
        <div className='space-y-3'>
          <div className='flex items-center'>
            <h3>CMS Admin</h3>
          </div>
          <div className='flex-1'>
            <ul className='space-y-1 pt-2 pb-4 text-sm'>
              <LinkItem to={'/'} name={'Dashboard'} />
              <LinkItem to={'/content'} name={'Content'} />
              <LinkItem to={'/content-type'} name={'Content Type'} />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
