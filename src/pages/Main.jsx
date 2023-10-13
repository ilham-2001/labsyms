import Frame from '../components/Frame';
import Card from '../components/Card'
import {mask, glove, coat} from '../images/assets'

const APD_OBJECT_LIST = [
    {
        id: 1,
        name: 'Mask',
        alt: 'APD type mask',
        illustration: mask,
        topic: '/labsyms/mask-info'
    },
    {
        id: 2,
        name: 'Gloves',
        alt: 'APD type gloves',
        illustration: glove,
        topic: '/labsyms/glove-info'
    },
    {
        id: 3,
        name: 'Coat',
        alt: 'APD type coat',
        illustration: coat,
        topic: '/labsyms/coat-info'
    },
]

const Main = function() {
    return (
        <div className='container mx-auto mt-20'>
            <Frame />
            <Card cardItems={APD_OBJECT_LIST}/>
        </div>
    )
};

export default Main;