import * as mqtt from 'mqtt/dist/mqtt.min';
import { useEffect, useState } from 'react';
import { notFound } from '../images/assets';

const brokerUrl = 'ws://127.0.0.1:9001/mqtt';
const topic = '/labsyms/image-preview';

const DetectedPreview = function () {
  const [imageBase64, setImageBase64] = useState(null);

  const client = mqtt.connect(brokerUrl); // create a client

  useEffect(() => {
    // Connect to the MQTT broker
    client.on('connect', () => {
      console.log('Connected to MQTT broker for Frame');
      client.subscribe(topic);
    });

    // Handle incoming messages
    client.on('message', (topic, message) => {
      setImageBase64(message.toString());
    });

    // Cleanup on component unmount
    return () => {
      client.end(); // Close the MQTT connection
    };
  }, []);

  return (
    <div className='container'>
      {imageBase64 ? (
        <img
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt='not Found'
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '500px',
            maxHeight: '500px',
          }}
        />
      ) : (
        <img
          className='w-full h-80'
          src={notFound}
          alt='No way'
        />
      )}
    </div>
  );
};

export default DetectedPreview;
