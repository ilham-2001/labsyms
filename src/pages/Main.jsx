import Frame from '../components/Frame';
import ApdCard from '../components/ApdCard';
import { mask, glove, coat } from '../images/assets';


const APD_OBJECT_LIST = [
  {
    id: 1,
    name: 'Mask',
    alt: 'APD type mask',
    illustration: mask,
    topic: '/labsyms/mask-info',
  },
  {
    id: 2,
    name: 'Gloves',
    alt: 'APD type gloves',
    illustration: glove,
    topic: '/labsyms/gloves-info',
  },
  {
    id: 3,
    name: 'Coat',
    alt: 'APD type coat',
    illustration: coat,
    topic: '/labsyms/coat-info',
  },
];

const Main = function () {
  return (
    <div className='container mx-auto mt-20'>
      <div className='flex flex-row gap-6 items-center'>
        <Frame />
        <div className='flex flex-col flex-1 gap-4 max-w-[1200px]'>
          <p className='text-center'>Health Apparel Check Status</p>
          <ApdCard cardItems={APD_OBJECT_LIST} />
        </div>
      </div>
    </div>
  );
};

export default Main;
