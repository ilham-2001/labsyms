import * as mqtt from 'mqtt/dist/mqtt.min';
import { useEffect, useState } from 'react';

const brokerUrl = 'ws://127.0.0.1:9001/mqtt';

const Card = function ({ cardItems }) {
  return (
    <div className='container my-auto'>
      <div className='flex flex-wrap gap-4'>
        {cardItems.map((it) => (
          <CardItem
            key={it.id}
            name={it.name}
            altext={it.alt}
            illustration={it.illustration}
            topic={it.topic}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;

const CardItem = function ({ name, altext, illustration, topic }) {
  const client = mqtt.connect(brokerUrl);
  const [isAvail, setAvail] = useState('red')

  useEffect(() => {
    client.on('connect', () => {
      console.log(`Connected to MQTT broker for Card ${topic}`);
      client.subscribe(topic);
    });

    // Handle incoming messages
    client.on('message', (topic, message) => {
      // update data on detected check
      if (message.toString() === 'True') {
        setAvail('green');
      } else {
        setAvail('red');
      }
    });

    return () => {
      client.end();
    };
  }, []);
  return (
    <div
      className='flex flex-col basis-[330px] items-center justify-center p-1 mx-5 rounded-xl'
      style={{ backgroundColor: isAvail, color: '#FFFFFF'}}
    >
      <p>{name}</p>
      <img className='w-20' src={illustration} alt={altext} />
      <p></p>
    </div>
  );
};
