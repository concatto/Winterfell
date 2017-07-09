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
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("following")
public class FollowingREST {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<WinterUser> getFeed(@Context HttpServletRequest request){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        return user.getFollowing();
    }
    
    private void updateFolowing(WinterUser user, HttpServletResponse response){
        EntityManager em = null;
        try {
            em = DefaultEntityManagerFactory.newDefaultEntityManager();
            em.getTransaction().begin();
            em.merge(user);
            em.getTransaction().commit();
            response.setStatus(200);
            return;
        } catch (Exception e){
            e.printStackTrace();
        }
        if (em != null && em.getTransaction().isActive()){
            em.getTransaction().rollback();
        }
        response.setStatus(500);
    }
    
    @POST
    @Path("follow")
    @Consumes(MediaType.APPLICATION_JSON)
    public void follow(
            WinterUser other,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        user.getFollowing().add(other);
        updateFolowing(user, response);
    }
    
    @POST
    @Path("unfollow")
    @Consumes(MediaType.APPLICATION_JSON)
    public void unfollow(
            WinterUser other,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        user.getFollowing().remove(other);
        updateFolowing(user, response);
    }
    
}
