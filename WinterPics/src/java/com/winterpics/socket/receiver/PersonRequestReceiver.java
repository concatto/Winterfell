package com.winterpics.socket.receiver;

import com.winterpics.model.Pessoa;
import com.winterpics.socket.WebSocketServer;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.Session;

public class PersonRequestReceiver implements SocketMethodReceiver<Integer>{

    @Override
    public Class<?> getParamClass() { return Integer.class; }    
    
    @Override
    public String getMethodName() { return "get-person"; }
    
    @Override
    public void onCalled(WebSocketServer server, Session session, Integer id) {
        Pessoa person = new Pessoa();
        person.setNome("Nome Teste Fulano");
        try {
            server.send(session, getMethodName(), person);
        } catch (IOException ex) {
            Logger.getLogger(PersonRequestReceiver.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
