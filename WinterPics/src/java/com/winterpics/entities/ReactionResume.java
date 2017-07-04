package com.winterpics.entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ReactionResume implements Serializable {

    @XmlElement(name = "reactions")
    private int[] reactions;

    public ReactionResume() {
    }

    public ReactionResume(Publication publication) {
        try {
            EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
            Query query = em.createNamedQuery("Reaction.findByPublication");
            query.setParameter("publication", publication);
            reactions = new int[9];
            ((List<Reaction>) query.getResultList()).forEach((Reaction r) -> {
                reactions[ r.getType().getReactionCode() ]++;
            });
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    public int[] getReactions() {
        return reactions;
    }

    public void setReactions(int[] reactions) {
        this.reactions = reactions;
    }
    
    
}
