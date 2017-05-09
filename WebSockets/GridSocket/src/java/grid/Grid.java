/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package grid;

/**
 *
 * @author Fernando
 */
public class Grid {
    private static final int BITS = 4;
    private int width;
    private int height;
    private byte[] data;
    
    public Grid(int width, int height) {
        this.width = width;
        this.height = height;
        
        data = new byte[width * height * (Byte.SIZE / BITS)];
    }
    
    public void setColorAt(int x, int y, byte color) {
        int index = toIndex(x, y);
        int mask = (int) (Math.pow(2, BITS) - 1);
				
        if (x % 2 == 0) {
            data[index] = (byte) ((data[index] & mask) | ((color & mask) << BITS)); //Set upper half
        } else {
            data[index] = (byte) ((data[index] & ~mask) | (color & mask)); //Set lower half
        }
    }
    
    private int toIndex(int x, int y) {
        return y * (width / 2) + ((int) (x / 2));
    }

    public byte[] getData() {
        return data;
    }
    
    public void paint(PaintAction action) throws IllegalArgumentException {
        if (action.getX() < 0 || action.getX() > width ||
            action.getY() < 0 || action.getY() > height) {
            throw new IllegalArgumentException("Index out of bounds.");
        }
        
        setColorAt(action.getX(), action.getY(), action.getColor());
    }
}
