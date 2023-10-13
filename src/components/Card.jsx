import * as mqtt from 'mqtt/dist/mqtt.min';
import { useEffect } from 'react';

const brokerUrl = 'ws://127.0.0.1:9001/mqtt';

const Card = function ({ cardItems }) {
  return (
    <div className='container'>
      <div className='flex flex-row'>
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

  useEffect(() => {
    client.on('connect', () => {
      console.log(`Connected to MQTT broker for Card ${topic}`);
      client.subscribe(topic);
    });

    // Handle incoming messages
    client.on('message', (topic, message) => {
      // update data on detected check
    });

    return () => {
      client.end();
    };
  });
  return (
    <div className='flex-1 flex flex-col items-center justify-center gap-5 mx-5 rounded-xl' style={{backgroundColor: 'red'}}>
      <p>{name}</p>
      <img className='w-20' src={illustration} alt={altext} />
      <p></p>
    </div>
  );
};
