package com.example.websocketdemo.model;

import java.time.LocalDateTime;


public class ChatMessage {
    private MessageType type;
    private String content;
    private long sender;
    private long demande ;
    private String dateTime=LocalDateTime.now().toString();
    
    public enum MessageType {
        CLIENT,
        CONSULTANT
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getSender() {
        return sender;
    }

    public void setSender(long sender) {
        this.sender = sender;
    }

    public long getDemande() {
        return demande;
    }

    public void setDemande(long demande) {
        this.demande = demande;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }
}
