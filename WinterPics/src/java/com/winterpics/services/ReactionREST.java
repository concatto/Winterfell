package com.winterpics.services;

import com.winterpics.services.customParams.ReactionRequest;
import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.Publication;
import com.winterpics.entities.Reaction;
import com.winterpics.entities.ReactionType;
import com.winterpics.entities.WinterUser;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("reaction")
public class ReactionREST {
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public boolean newReaction(ReactionRequest reactionRequest, @Context HttpServletRequest request){
        if (reactionRequest == null){
            return false;
        }
        Reaction reaction = new Reaction();
        reaction.setType(ReactionType.fromReactionCode(reactionRequest.getReactionType()));
        reaction.setPublication(new Publication(reactionRequest.getPublication()));
        try {
            WinterUser user = (WinterUser) request.getAttribute("winteruser");
            reaction.setAuthor(user);
            EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
            em.getTransaction().begin();
            em.persist(reaction);
            em.flush();
            em.getTransaction().commit();
            return true;
        } catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }
    
}
