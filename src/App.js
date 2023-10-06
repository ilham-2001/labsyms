import { useEffect, useState } from 'react';

function App() {
  const [imageBase64, setImageBase64] = useState(null);

  const base64ToImage = (base64String) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64String}`;
    return img;
  };

  const brokerUrl = 'ws://127.0.0.1:9001/mqtt';

  let client = mqtt.connect(brokerUrl); // create a client
  const topic = '/labsyms/image';

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
  }, [client, topic]);


  return (
    <div className="App">
      <h2>Frame</h2>
    </div>
  );
}

export default App;
