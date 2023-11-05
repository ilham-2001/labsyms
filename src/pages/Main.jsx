import Frame from '../components/Frame';
import ApdCard from '../components/ApdCard';
import InfoCard from '../components/InfoCard';
import StatsCard from '../components/StatsCard';
import DetectedPreview from '../components/DetectedPreview';
import { mask, glove, coat, notFound } from '../images/assets';

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

const INFO_OBJECT_LIST = [
  {
    id: 1,
    text: 'Lorem',
  },
  {
    id: 2,
    text: 'Ipsum',
  },
];

const Main = function () {
  return (
    <div className='container mx-auto mt-20'>
      <div className='flex flex-row gap-10'>
        <div className='flex flex-col gap-2 items-center'>
          <Frame />
          <p>Preview</p>
          <DetectedPreview />
          <StatsCard />
        </div>
        <div className='flex flex-col flex-1 gap-8 max-w-[1000px]'>
          <p className='text-center'>Health Apparel Check Status</p>
          <ApdCard its={APD_OBJECT_LIST} />
          <InfoCard its={INFO_OBJECT_LIST}/>
        </div>
      </div>
    </div>
  );
};

export default Main;
