package com.winterpics.entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ReactionResume implements Serializable {

    @XmlElement(name = "reactions")
    private int[] reactions;
    
    @XmlElement
    private Integer userReaction;

    public ReactionResume() {
    }

    public ReactionResume(Publication publication, WinterUser user) {
        try {
            // get reaction count
            EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
            Query query = em.createNamedQuery("Reaction.findByPublication");
            query.setParameter("publication", publication);
            reactions = new int[ReactionType.values().length];
            ((List<Reaction>) query.getResultList()).forEach((Reaction r) -> {
                reactions[ r.getType().getReactionCode() ]++;
            });
            // get user reaction
            Query rQuery = em.createQuery("SELECT r FROM Reaction r WHERE r.publication.id:publication AND r.author=:author");
            rQuery.setParameter("publication", publication.getId());
            rQuery.setParameter("author", user);
            try {
                Reaction reaction = (Reaction) rQuery.getSingleResult();
                this.userReaction = reaction.getType().getReactionCode();
            } catch (NoResultException e){
                this.userReaction = null;
            }
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
