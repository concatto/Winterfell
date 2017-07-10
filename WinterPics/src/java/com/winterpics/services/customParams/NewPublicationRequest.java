package com.winterpics.services.customParams;

import com.winterpics.entities.Publication;
import java.io.Serializable;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class NewPublicationRequest implements Serializable {

    @XmlElement
    private Publication publication;
    
    @XmlElement
    private String photo;

    public String getPhoto() {
        return photo;
    }

    public Publication getPublication() {
        return publication;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public void setPublication(Publication publication) {
        this.publication = publication;
    }
}
