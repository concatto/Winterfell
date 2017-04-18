package com.winterpics.socket;

import com.google.gson.Gson;
import com.winterpics.socket.receiver.SocketMethodReceiver;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/websocket")
public class WebSocketServer {
    
    private final class Request<Data> {
        public final String methodName;
        public final String data;

        public Request(String methodName, Data data) {
            this.methodName = methodName;
            this.data = gson.toJson(data);
        }
        
    }
    
    private final Map<String, SocketMethodReceiver> listeners = new HashMap<>();
    private static final Set<Session> clients = new HashSet<>();
    
    private static final Gson gson = new Gson();
    
    public WebSocketServer() {
        Arrays.stream(SocketMethodReceiver.createMethods()).forEach((rm) -> {
            listeners.put(rm.getMethodName(), rm);
        });
        System.out.println("WebSocketServer started");
    }
    
    @OnOpen
    public void onOpen(Session session){
        System.out.println("Open connection");
        clients.add(session);
    }
    
    @OnClose
    public void onClose(Session session){
        System.out.println("Closed connection");
        clients.remove(session);
    }
    
    public void broadcast(Session session, String methodName, Object param) throws IOException {
        for (Session client : clients) {
            if ( client != session ){
                send(client, methodName, param);
            }
        }
    }
    
    public void send(Session session, String methodName, Object param) throws IOException{
        session.getBasicRemote().sendText(
            gson.toJson(
                new Request( methodName, param ),
                Request.class
            )
        );
                
    }
    
    @OnMessage
    public void onMessage(Session session, String jsonMessage){
        Request request = gson.fromJson(jsonMessage, Request.class);
        SocketMethodReceiver method = listeners.get(
                listeners.keySet()
                .stream()
                .filter((methodName) -> request.methodName.equals(methodName) )
                .findFirst().get()
        );
        if (method == null){
            return;
        }
        method.onCalled(this, session, gson.fromJson(request.data, method.getParamClass()));
    }
    
    @OnError
    public void onError(Session session, Throwable ex){
        ex.printStackTrace();
    }
}
