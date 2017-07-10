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
import javax.ws.rs.core.Response;

@Path("reaction")
public class ReactionREST {
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response newReaction(ReactionRequest reactionRequest, @Context HttpServletRequest request){
        if (reactionRequest == null){
            return Response.serverError().build();
        }
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        EntityManager em = null;
        
        try {
            em = DefaultEntityManagerFactory.newDefaultEntityManager();
            
            if (reactionRequest.getReactionType() == -1){
                Reaction r = (Reaction) em.createQuery("SELECT r FROM Reaction r WHERE r.author=:user AND r.publication.id=:publicationID")
                        .setParameter("user", user)
                        .setParameter("publicationID", reactionRequest.getPublication())
                        .getSingleResult();
                em.getTransaction().begin();
                em.remove(r);
                em.getTransaction().commit();
                return Response.ok().build();
            }

            Reaction reaction = new Reaction();
            reaction.setType(ReactionType.fromReactionCode(reactionRequest.getReactionType()));
            reaction.setPublication(new Publication(reactionRequest.getPublication()));
            reaction.setAuthor(user);
            
            em.getTransaction().begin();
            em.persist(reaction);
            em.flush();
            em.getTransaction().commit();
            
            return Response.ok().build();
        } catch (Exception e){
            e.printStackTrace();
        }
        if (em != null && em.getTransaction().isActive()){
            em.getTransaction().rollback();
        }
        return Response.serverError().build();
    }
    
}
