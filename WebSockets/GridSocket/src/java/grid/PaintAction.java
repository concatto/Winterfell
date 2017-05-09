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
public class PaintAction {
    private int x;
    private int y;
    private byte color;

    public PaintAction(int x, int y, byte color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public byte getColor() {
        return color;
    }
}
