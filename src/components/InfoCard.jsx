
const InfoCard = ({its}) => {
    return (
        <div className='flex gap-10'>
            {its.map((it) => {
                return (
                    <InfoCardItem key={it.id} text={it.text}/>
                )
            })}
        </div>
    )
};


const InfoCardItem = ({text}) => {
  return (
    <div
      className='flex flex-col flex-1 items-center p-7 rounded-xl shadow-md'
      style={{ backgroundColor: '#1D4FD8', color: '#FFFFFF' }}
    >
      <p>{text}</p>
    </div>
  );
};

export default InfoCard;