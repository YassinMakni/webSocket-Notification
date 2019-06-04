import React, { Component } from 'react';

var stompClient = null;

class notification extends Component {
    constructor(props){
        super(props) ; 
        this.state = {
            broadcastMessage: [],
        }
        this.sendMessage = this.sendMessage.bind(this) ; 
    }
    componentDidMount(){
        this.connect() ; 
    }
    connect = () => {

          const Stomp = require('stompjs')
    
          var SockJS = require('sockjs-client')
    
          SockJS = new SockJS('http://localhost:8080/ws')
    
          stompClient = Stomp.over(SockJS);
    
          stompClient.connect({}, this.onConnected, this.onError);
    
        
      }
    
      onConnected = () => {
    
        // Subscribing to the public topic
        stompClient.subscribe('/topic/public', this.onMessageReceived);
      
      }
    
      onError = (error) => {
          console.log('Could not connect you to the Chat Room Server. Please refresh this page and try again!');
      }
      sendMessage = (type, value) => {

        if (stompClient) {
          var chatMessage = {
            sender: 1,
            content: value,
            type: type,
            demande:1
    
          };
          stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
    
        }
      }
    
      onMessageReceived = (payload) => {
    
        var message = JSON.parse(payload.body);
    
        if (message.type === 'CLIENT') {
            console.log("connext!");
            
            this.state.broadcastMessage.push({
                message: message.content,
                sender: message.sender,
                dateTime: message.dateTime,
                demande:message.demande
              })
              this.setState({
                broadcastMessage: this.state.broadcastMessage,
        
              })
    
        }
        else if (message.type === 'CONSULTANT') {

          this.state.broadcastMessage.push({
            message: message.content,
            sender: message.sender,
            dateTime: message.dateTime,
            demande:message.demande
          })
          this.setState({
            broadcastMessage: this.state.broadcastMessage,
    
          })
        }
        else {
          // do nothing...
        }
      }
    
    render() {
            return (
            <div>
                <button onClick={(e)=>this.sendMessage('CLIENT',"hello")}> Connect!</button>
                <ul>
                    <p>-----------------message----------------------</p>
                    {
                        this.state.broadcastMessage.map((notification,key) => 
                            <li key={key}> {notification.sender + notification.dateTime} </li>
                            )
                    }
                </ul>
            </div>
        );
    }
}

export default notification;