import * as mqtt from 'mqtt/dist/mqtt.min';
import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const brokerUrl = 'ws://127.0.0.1:9001/mqtt';
const topic = '/labsyms/image-pos';

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 320,
  height: 320,
  facingMode: 'user',
};

const Frame = function () {
  const [imageBase64, setImageBase64] = useState(null);

  const client = mqtt.connect(brokerUrl); // create a client
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const captureCanvas = canvasRef.current;
    const captureCanvasContext = captureCanvas.getContext('2d');

    const handleCapture = () => {
      const videoElement = webcamRef.current.video;

      captureCanvasContext.drawImage(
        videoElement,
        0,
        0,
        videoElement.videoWidth,
        videoElement.videoHeight
      );

      captureCanvasContext.strokeStyle = 'red';
      captureCanvasContext.lineWidth = 2;
      captureCanvasContext.strokeRect(50, 50, 100, 100); // Sample bounding box

        // Convert the frame data to base64
        const base64Data = captureCanvas.toDataURL('image/jpeg');
        // client.publish(topic, base64Data);

      // Add additional canvas drawing or image processing here if needed
      requestAnimationFrame(handleCapture);
    };

    // Connect to the MQTT broker
    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe(topic);
      handleCapture();
    });

    // Handle incoming messages
    client.on('message', (topic, message) => {
      setImageBase64(message.toString());
    });

    client.on('error', (err) => {
      console.error('MQTT client error:', err);
    });


    captureCanvas.addEventListener('click', (event) => {
      const x = event.clientX;
      const y = event.clientY;
      console.log('Clicked at coordinates (x, y):', x, y);
    });


    // Cleanup on component unmount
    return () => {
      client.end(); // Close the MQTT connection
    };
  }, []);

  return (
    <div>
      <Webcam
        audio={false}
        height={320}
        ref={webcamRef}
        width={320}
        screenshotFormat='image/jpeg'
        videoConstraints={videoConstraints}
        style={{ display: 'hidden' }}
      />
      <canvas ref={canvasRef} width={400} height={480} />
    </div>
  );
};

export default Frame;
