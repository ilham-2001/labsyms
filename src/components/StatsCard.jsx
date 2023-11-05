import { useEffect, useState } from 'react';
import * as mqtt from 'mqtt/dist/mqtt.min';

const BROKERURL = 'ws://127.0.0.1:9001/mqtt';

const StatsCard = () => {
  const [stat, setStat] = useState('False');
  const client = mqtt.connect(BROKERURL);

  useEffect(() => {
    client.on('connect', () => {
      console.log('Connected to MQTT broker for Card Status');
      client.subscribe('/labsyms/enter-info');
    });

    // Handle incoming messages
    client.on('message', (topic, message) => {
      // update data on detected check
      setStat(message.toString()) 
    });

  }, []);

  return (
    <div className='container flex flex-col items-center gap-2'>
        <p>Status</p>
      <div className='w-[90%] p-3 text-center bg-blue-700 rounded-xl shadow-md'>
        <p className='text-white'>{stat === 'True'? 'Boleh Masuk' : 'Tidak Boleh Masuk'}</p>
      </div>
    </div>
  );
};

export default StatsCard;
