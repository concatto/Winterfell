package com.winterpics.services;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.WinterUser;
import java.util.List;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("following")
public class FollowingREST {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<WinterUser> getFollowing(@Context HttpServletRequest request){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        return user.getFollowing();
    }
    
    @GET
    @Path("{otherID}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<WinterUser> getOtherFollowing(@PathParam("otherID") long otherID){
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        return em.createQuery("SELECT u.following FROM WinterUser u WHERE u.id=:id")
            .setParameter("id", otherID)
            .getResultList();
    }
    
    private Response updateFolowing(WinterUser user){
        EntityManager em = null;
        try {
            em = DefaultEntityManagerFactory.newDefaultEntityManager();
            em.getTransaction().begin();
            em.merge(user);
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
    
    @POST
    @Path("follow")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response follow(
            WinterUser other,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        user.getFollowing().add(other);
        return updateFolowing(user);
    }
    
    @POST
    @Path("unfollow")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response unfollow(
            WinterUser other,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        user.getFollowing().remove(other);
        return updateFolowing(user);
    }
    
}
