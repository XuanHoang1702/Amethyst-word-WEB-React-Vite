let socket = null;
// import { API_URL } from "./Api";
const connectWebSocket = (orderCode, onMessage) => {
  socket = new WebSocket(`ws://192.168.1.5:5000/api/Pay/Get`);

  socket.onopen = () => {
    console.log('✅ WebSocket connected');
    socket.send(orderCode);
  };

  socket.onmessage = (event) => {
    console.log('📩 Message from server:', event.data);
    if (onMessage) onMessage(event.data);
  };

  socket.onclose = () => {
    console.log('❌ WebSocket closed');
  };

  socket.onerror = (error) => {
    console.error('❗ WebSocket error', error);
  };
};

const closeWebSocket = () => {
  if (socket) {
    socket.close();
  }
};

export default {
  connectWebSocket,
  closeWebSocket,
};