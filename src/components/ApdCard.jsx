import * as mqtt from 'mqtt/dist/mqtt.min';
import { useEffect, useState } from 'react';

const BROKERURL = 'ws://127.0.0.1:9001/mqtt';

const Card = function ({ its }) {
  return (
    <div>
      <div className='container flex gap-4 justify-evenly'>
        {its.map((it) => (
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
  const client = mqtt.connect(BROKERURL);
  const [isAvail, setAvail] = useState({color: '#c4c4c4', status: 'Not Detected'})
  const [stats, setStats] = useState({'mask-info': 0, 'coat-info': 0, 'gloves-info': 0})

  useEffect(() => {
    client.on('connect', () => {
      console.log(`Connected to MQTT broker for Card ${topic}`);
      client.subscribe(topic);
    });

    // Handle incoming messages
    client.on('message', (topic, message) => {
      // update data on detected check
      if (message.toString() === 'True') {
        setAvail({color: '#367E18', status: 'Detected'});
      } else {
        setAvail({color: '#c4c4c4', status: 'Not Detected'});
      }
    });

    return () => {
      client.end();
    };
  }, []);
  return (
    <div
      className='flex flex-col flex-1 items-center p-3 rounded-xl shadow-md'
      style={{ backgroundColor: isAvail.color, color: '#FFFFFF'}}
    >
      <p>{name}</p>
      <img className='w-20' src={illustration} alt={altext} />
      <p>{isAvail.status}</p>
    </div>
  );
};
