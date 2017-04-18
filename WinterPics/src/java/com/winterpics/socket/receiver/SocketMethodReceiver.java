package com.winterpics.socket.receiver;

import com.winterpics.socket.SocketMethod;
import com.winterpics.socket.WebSocketServer;
import javax.websocket.Session;

public interface SocketMethodReceiver<P> extends SocketMethod {

    public Class<?> getParamClass();
    
    public void onCalled(WebSocketServer server, Session session, P param);
    
    public static SocketMethodReceiver[] createMethods(){
        return new SocketMethodReceiver[]{
            new MessageReceiver(),
            new PersonRequestReceiver(),
            new SendPerson()
        };
    }
    
}
