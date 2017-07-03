package com.winterpics.entities;

import java.io.Serializable;

public enum ReactionType implements Serializable {

    SAD(0),
    HAPPY(1),
    R2(2),
    R3(3),
    R4(4),
    R5(5),
    R6(6),
    R7(7),
    R8(8),
    R9(9);
    
    private int reactionCode;
    private ReactionType(int reactionCode) {
        this.reactionCode = reactionCode;
    }
    
    public int getReactionCode() {
        return reactionCode;
    }
    public void setReactionCode(int reactionCode) {
        this.reactionCode = reactionCode;
    }
    
    public static ReactionType fromReactionCode(int reactionCode){
        for (ReactionType rt : ReactionType.values()){
            if (rt.getReactionCode() == reactionCode){
                return rt;
            }
        }
        return null;
    }
    
}
