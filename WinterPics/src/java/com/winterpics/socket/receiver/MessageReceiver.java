package com.winterpics.socket.receiver;

import com.winterpics.socket.WebSocketServer;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.Session;

public class MessageReceiver implements SocketMethodReceiver<String>{
    
    @Override
    public Class<?> getParamClass() { return String.class; }
    
    @Override
    public String getMethodName() { return "message"; }
    
    @Override
    public void onCalled(WebSocketServer server, Session session, String message) {
        System.out.println("Message received: " + message);
        try {
            server.broadcast(session, "message", message);
        } catch (IOException ex) {
            Logger.getLogger(MessageReceiver.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
