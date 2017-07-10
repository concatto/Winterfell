package com.winterpics.services;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.WinterUser;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Stateless
@Path("winteruser")
public class WinterUserREST {
    
    private static final Map<String,String> avaiableColumns = new HashMap<>();
    
    static {
        avaiableColumns.put("changename" , "name");
        avaiableColumns.put("changephoto", "photopath");
        avaiableColumns.put("changelogin", "login");
        avaiableColumns.put("changepass" , "pass");
        avaiableColumns.put("changeemail", "email");
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public WinterUser getUser(@Context HttpServletRequest request){
        return (WinterUser) request.getAttribute("winteruser");
    }
    
    @GET
    @Path("{otherID}")
    @Produces(MediaType.APPLICATION_JSON)
    public WinterUser getOtherUser(
            @PathParam("otherID") long otherID,
            @Context HttpServletRequest request
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        Query query = em.createNamedQuery("WinterUser.findById");
        query.setParameter("id", otherID);
        try {
            WinterUser other = (WinterUser) query.getSingleResult();
            Query followingQuery = em.createQuery(
                    "SELECT COUNT(f.id) FROM WinterUser u JOIN u.following f WHERE u=:user AND f=:other"
                )
                    .setParameter("user", user)
                    .setParameter("other", other);
            other.setisFollowing( (long) followingQuery.getSingleResult() > 0 );
            return other;
        } catch (NoResultException e){}
        return null;
    }
    
    @PUT
    @Path("{action}")
    @Consumes({MediaType.TEXT_PLAIN, MediaType.APPLICATION_FORM_URLENCODED})
    public Response edit(
            @PathParam("action") String action,
            String data,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response
    ) {
        
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        
        String oldPhoto = user.getPhotopath();
        
        EntityManager em = null;
        try {
            if ("changephoto".equals(action)){
                data = ImageConversor.saveImage(data, user, request);
            }
            
            em = DefaultEntityManagerFactory.newDefaultEntityManager();
            Query query = em.createQuery(
                "UPDATE WinterUser SET " + getColumn(action) + "=:data WHERE id=:id"
            );
            query.setParameter("data", data);
            query.setParameter("id", user.getId());
            em.getTransaction().begin();
            query.executeUpdate();
            
            
            if ("changephoto".equals(action)){
                ImageConversor.deleteImage(oldPhoto, request);
            }
            
            em.getTransaction().commit();
            return Response.ok().build();
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        if (em != null && em.getTransaction().isActive()){
            em.getTransaction().rollback();
        }
        return Response.serverError().build();
    }
    
    
    private String getColumn(String action) throws InvalidActionException {        
        if (avaiableColumns.containsKey(action)){
            return avaiableColumns.get(action);
        }
        throw new InvalidActionException();
    }
    
    public static class InvalidActionException extends Exception {};
    
}
