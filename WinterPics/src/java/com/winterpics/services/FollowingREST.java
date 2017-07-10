package com.winterpics.services;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.WinterUser;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("following")
public class FollowingREST {

    
    private List<WinterUser> searchFollowing(long id, int offset, int limit)
    {
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        
        Query query = em.createQuery("SELECT u.following FROM WinterUser u WHERE u.id=:id ORDER BY u.name")
                .setParameter("id", id);
        query.setFirstResult(offset);
        if (limit > 0){
            query.setMaxResults(limit);
        }
        List<WinterUser> list = query.getResultList();
        for (int i = 0; i < list.size(); ++i) {
            if (list.get(i) == null){
                list.remove(i);
                i--;
            }
        }
        return list;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<WinterUser> getFollowing(
            @Context HttpServletRequest request,
            @QueryParam("offset") int offset,
            @QueryParam("limit") int limit
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        List<WinterUser> following = searchFollowing(user.getId(), offset, limit);
        following.parallelStream().forEach((WinterUser w) -> {
            w.setisFollowing(Boolean.TRUE);
        });
        return following;
    }
    
    @GET
    @Path("{otherID}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<WinterUser> getOtherFollowing(
            @Context HttpServletRequest request,
            @PathParam("otherID") long otherID,
            @QueryParam("offset") int offset,
            @QueryParam("limit") int limit
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        
        List<WinterUser> res = searchFollowing(otherID, offset, limit);
        
        res.parallelStream().forEach((WinterUser w) -> {
            if (w == null){
                return;
            }
            w.setisFollowing(
                user.getFollowing().contains(w)
            );
        });
        
        if (res.isEmpty()){
            return new ArrayList<>();
        }
        return res;
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
        if (em != null){
            em.close();
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
        if (
                Objects.equals(user.getId(), other.getId())
            || user.getFollowing().contains(other)
        ){
            return Response.serverError().build();
        }
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
        if (
                Objects.equals(user.getId(), other.getId())
            || user.getFollowing().contains(other)
        ){
            return Response.serverError().build();
        }
        user.getFollowing().add(other);
        user.getFollowing().remove(other);
        return updateFolowing(user);
    }
    
}
