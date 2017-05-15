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
    private int width;
    private int height;
    private byte[] data;
    
    public Grid(int width, int height) {
        this.width = width;
        this.height = height;
        
        data = new byte[(width / 2) * height];
    }
    
    public void setColorAt(int x, int y, byte color) {
        int index = toIndex(x, y);
				
        if (x % 2 == 0) {
            data[index] = (byte) ((data[index] & 0x0F) | ((color & 0xF) << 4)); //Set upper half
        } else {
            data[index] = (byte) ((data[index] & 0xF0) | (color & 0xF)); //Set lower half
        }
    }
    
    private int toIndex(int x, int y) {
        return y * (width / 2) + ((int) (x / 2));
    }

    public byte[] getData() {
        return data;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }
    
    public void paint(PaintAction action) throws IllegalArgumentException {
        if (action.getX() < 0 || action.getX() > width ||
            action.getY() < 0 || action.getY() > height) {
            throw new IllegalArgumentException("Index out of bounds.");
        }
        
        setColorAt(action.getX(), action.getY(), action.getColor());
    }
}
