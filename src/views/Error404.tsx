import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <>
      {/* <section className='top-bar'> */}
      {/* Brand */}
      {/* <span className='brand'>Yeti</span> */}
      {/* </section> */}

      <div className='container mt-20 flex items-center justify-center py-10'>
        <div className='w-full md:w-1/2 xl:w-1/3'>
          <div className='mx-5 text-center uppercase md:mx-10'>
            <h1 className='text-9xl font-bold'>404</h1>
            <h2 className='mt-5 text-primary'>Page Not Found</h2>
            <h5 className='mt-2'>The page you are looking for is not found.</h5>
            <Link to='/' className='btn btn_primary mt-5'>
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
