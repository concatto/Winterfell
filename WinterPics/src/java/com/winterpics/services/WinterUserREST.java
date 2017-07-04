package com.winterpics.services;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.WinterUser;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;
import java.util.Calendar;
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
    
    String getImagesFolder(HttpServletRequest request){
        String folder = request.getServletContext().getRealPath("/assets");
        File ff = new File(folder);
        if (!ff.exists()){
            ff.mkdir();
        }
        return folder + "/";
    }
    
    @PUT
    @Path("{action}")
    @Consumes({MediaType.TEXT_PLAIN, MediaType.APPLICATION_FORM_URLENCODED})
    public boolean edit(
            @PathParam("action") String action,
            String data,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response
    ) {
        
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        
        String imageName = null;
        File old = new File(getImagesFolder(request)+"/"+user.getPhotopath());
        
        if ("changephoto".equals(action)){
            String allData[] = data.split(";");
            String imageType = allData[0];
            imageName = Long.toString(Calendar.getInstance().getTimeInMillis())
                            + Long.toString(user.getId()) +"."+ imageType.split("/")[1];
        
            try {
                
                String fileData = data.substring(data.indexOf(",")+1);
                
                byte[] decoded = Base64.getDecoder().decode(fileData);

                try (OutputStream stream = new FileOutputStream(getImagesFolder(request)+"/"+imageName)) {
                    stream.write(decoded);
                }
            } catch (Exception e){
                e.printStackTrace();
                response.setStatus(520);
                return false;
            }
        }
        
        try {
            EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
            Query query = em.createQuery(
                "UPDATE WinterUser SET "+getColumn(action)+"=:data WHERE id=:id"
            );
            if ("changephoto".equals(action)){
                query.setParameter("data", "assets/"+imageName);
            } else {
                query.setParameter("data", data);
            }
            query.setParameter("id", user.getId());
            em.getTransaction().begin();
            boolean res = query.executeUpdate() > 0;
            em.getTransaction().commit();
            
            
            if ("changephoto".equals(action) && old.exists()){
                try {
                    old.delete();
                } catch (Exception e){}
            }
            
            
            return res;
        } catch (InvalidActionException ex) {
            return false;
        }
    }
    
    
    private String getColumn(String action) throws InvalidActionException {        
        if (avaiableColumns.containsKey(action)){
            return avaiableColumns.get(action);
        }
        throw new InvalidActionException();
    }
    
    public static class InvalidActionException extends Exception {};
    
}
