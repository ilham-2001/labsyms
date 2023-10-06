import * as mqtt from 'mqtt/dist/mqtt.min'
import { useEffect, useState } from 'react';

const Frame = function (){
    const [imageBase64, setImageBase64] = useState(null);

    return (
        {imageBase64 && (
            <img
              src={`data:image/jpeg;base64,${imageBase64}`}
              alt="Base64"
              width="300"
            />
          )}
    )
}