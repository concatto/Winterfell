/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package grid;

import java.nio.ByteBuffer;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

/**
 *
 * @author Fernando
 */
public class GridDecoder implements Decoder.Binary<PaintAction> {

    @Override
    public PaintAction decode(ByteBuffer buf) throws DecodeException {
        return new PaintAction(buf.get(0), buf.get(1), ((byte) (buf.get(2) & 0xF)));
    }

    @Override
    public boolean willDecode(ByteBuffer buf) {
        System.out.println(buf.capacity());
        return buf.capacity() == 3;
    }

    @Override
    public void init(EndpointConfig config) {}

    @Override
    public void destroy() {}
    
}
