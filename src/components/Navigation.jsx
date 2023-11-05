import { logo } from '../images/assets';

const Navigation = function () {
  return (
    <div className='w-full p-4 bg-blue-700'>
      <header className='container flex mx-auto'>
        <div className='flex items-center gap-5'>
          <img className='w-10' src={logo} alt='logo edelweissm' />
          <p className='text-2xl font-semibold text-white'>LabSyms</p>
        </div>
      </header>
    </div>
  );
};

export default Navigation;
