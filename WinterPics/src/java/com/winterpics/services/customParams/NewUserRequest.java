package com.winterpics.services.customParams;

import com.winterpics.entities.WinterUser;
import java.io.Serializable;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class NewUserRequest implements Serializable {

    @XmlElement
    private WinterUser userdata;
    
    @XmlElement
    private String photo;

    public String getPhoto() {
        return photo;
    }

    public WinterUser getUserdata() {
        return userdata;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public void setUserdata(WinterUser userdata) {
        this.userdata = userdata;
    }
}
