package com.winterpics.services.customParams;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ReactionRequest implements Serializable {
    
    @XmlElement
    private int type;
    
    @XmlElement
    private long publication;
    
    public long getPublication() {
        return publication;
    }
    
    public int getReactionType() {
        return type;
    }
    
    public void setPublication(long publication) {
        this.publication = publication;
    }
    
    public void setType(int type) {
        this.type = type;
    }
    
}