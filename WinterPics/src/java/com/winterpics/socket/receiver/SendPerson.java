package com.winterpics.socket.receiver;

import com.winterpics.model.Pessoa;
import com.winterpics.socket.WebSocketServer;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.Session;

public class SendPerson implements SocketMethodReceiver<Pessoa> {

    @Override
    public Class<?> getParamClass() { return Pessoa.class; }

    @Override
    public String getMethodName() { return "send-person"; }
    
    @Override
    public void onCalled(WebSocketServer server, Session session, Pessoa person) {
        try {
            server.broadcast(session, "received-person", person);
        } catch (IOException ex) {
            Logger.getLogger(SendPerson.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
