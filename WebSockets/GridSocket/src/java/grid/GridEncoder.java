/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package grid;

import java.nio.ByteBuffer;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

/**
 *
 * @author Fernando
 */
public class GridEncoder implements Encoder.Binary<Grid> {

    @Override
    public ByteBuffer encode(Grid grid) throws EncodeException {
        return ByteBuffer.wrap(grid.getData());
    }

    @Override
    public void init(EndpointConfig config) {}

    @Override
    public void destroy() {}
        
}
