import * as mqtt from 'mqtt/dist/mqtt.min';
import { useEffect, useState } from 'react';

const brokerUrl = 'ws://127.0.0.1:9001/mqtt';
const topic = '/labsyms/image';


const Frame = function () {
  const [imageBase64, setImageBase64] = useState(null);

  const base64ToImage = (base64String) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64String}`;
    return img;
  };

  const client = mqtt.connect(brokerUrl); // create a client
  
  useEffect(() => {
    // Connect to the MQTT broker
    client.on('connect', () => {
      console.log('Connected to MQTT broker');
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
    <div>
      {imageBase64 && (
        <img
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt='Base64'
          width='300'
        />
      )}
    </div>
  );
};

export default Frame;