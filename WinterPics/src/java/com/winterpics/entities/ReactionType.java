package com.winterpics.entities;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;

@XmlType(name = "reactionType")
@XmlEnum(Integer.class)
public enum ReactionType implements Serializable {

    @XmlEnumValue(value = "0") SAD(0),
    @XmlEnumValue(value = "1") HAPPY(1),
    @XmlEnumValue(value = "2") R2(2),
    @XmlEnumValue(value = "3") R3(3),
    @XmlEnumValue(value = "4") R4(4),
    @XmlEnumValue(value = "5") R5(5),
    @XmlEnumValue(value = "6") R6(6),
    @XmlEnumValue(value = "7") R7(7),
    @XmlEnumValue(value = "8") R8(8);
    
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
    
    @Override
    public String toString(){
        return Integer.toString(reactionCode);
    }
    
}
