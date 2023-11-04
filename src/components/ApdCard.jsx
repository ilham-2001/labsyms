import * as mqtt from 'mqtt/dist/mqtt.min';
import { useEffect, useState } from 'react';

const brokerUrl = 'ws://127.0.0.1:9001/mqtt';

const Card = function ({ cardItems }) {
  return (
    <div>
      <div className='container flex gap-4 justify-evenly'>
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
  const [isAvail, setAvail] = useState({color: 'red', status: 'Not Detected'})

  useEffect(() => {
    client.on('connect', () => {
      console.log(`Connected to MQTT broker for Card ${topic}`);
      client.subscribe(topic);
    });

    // Handle incoming messages
    client.on('message', (topic, message) => {
      // update data on detected check
      if (message.toString() === 'True') {
        setAvail({color: 'green', status: 'Detected'});
      } else {
        setAvail({color: 'red', status: 'Not Detected'});
      }
    });

    return () => {
      client.end();
    };
  }, []);
  return (
    <div
      className='flex flex-col w-[250px] items-center p-3 rounded-xl'
      style={{ backgroundColor: isAvail.color, color: '#FFFFFF'}}
    >
      <p>{name}</p>
      <img className='w-20' src={illustration} alt={altext} />
      <p>{isAvail.status}</p>
    </div>
  );
};
