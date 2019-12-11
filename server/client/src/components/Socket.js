import io from 'socket.io-client';


export default class Socket {
  constructor() {
    const origin = window.location.origin;
    const socketUrl =  (origin.includes('localhost')) ? 'http://localhost:5000/' : origin
    this.socket = io(socketUrl);
  }

  stockChange(method, data) {
    this.socket.emit('stock change',method, data);
  }

  onStockChange(callback) {
    this.socket.on('stock changed', callback)
  }
}