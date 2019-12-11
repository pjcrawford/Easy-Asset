import React, { Component } from "react";
import io from 'socket.io-client';



class Socket extends Component {
  constructor(props) {
    super(props);
    const origin = window.location.origin;
    const socketUrl =  (origin.includes('localhost')) ? 'http://localhost:5000/' : origin
    this.socket = io(socketUrl);
    //anytime the server sends a message with the tag stockupdate, send this function
    this.socket.on('stock-update', message => {
      this.props.dataChanged(message)

    })
  }
  render(){
    return <div></div>
  };
  stockChange(method, data) {
    this.socket.emit('stock change',method, data);
  }

  onStockChange(callback) {
    this.socket.on('stock changed', callback)
  };
  
}
export default Socket;