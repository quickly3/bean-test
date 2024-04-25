import mqtt from 'mqtt';
const client = mqtt.connect('mqtt://127.0.0.1:1883');
// const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
  client.subscribe('presence', (err) => {
    if (!err) {
      client.publish('presence', 'Hello mqtt');
    } else {
      console.log(err);
    }
  });
});

client.on('message', (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
