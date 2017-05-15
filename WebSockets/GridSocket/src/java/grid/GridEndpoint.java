/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package grid;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author Fernando
 */
@ServerEndpoint(
        value = "/grid",
        encoders = {GridEncoder.class},
        decoders = {GridDecoder.class})
public class GridEndpoint {
    private static final Grid grid = new Grid(20, 20);
    private static final Set<Session> clients = new HashSet<>();

    @OnOpen
    public void onOpen(Session session) throws IOException, EncodeException {
        System.out.println(session.getId());
        clients.add(session);
        
        String message = String.format("create %d %d", grid.getWidth(), grid.getHeight());
        session.getBasicRemote().sendText(message);
        sendGrid(session);
    }
    
    @OnClose
    public void onClose(Session session) {
        clients.remove(session);
    }
    
    @OnMessage
    public void onMessage(Session sender, PaintAction action) throws EncodeException, IOException {
        grid.paint(action);
        broadcastGrid();
    }

    private void broadcastGrid() throws EncodeException, IOException {
        for (Session client : clients) {
            sendGrid(client);
        }
    }
    
    private void sendGrid(Session s) throws EncodeException, IOException {
        s.getBasicRemote().sendObject(grid);
    }
}
