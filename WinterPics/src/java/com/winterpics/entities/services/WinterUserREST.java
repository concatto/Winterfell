package com.winterpics.entities.services;

import com.google.common.collect.HashBiMap;
import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.WinterUser;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
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
    
    private Map<String,String> avaiableColumns = new HashMap<>();
            
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public WinterUser getUser(@Context HttpServletRequest request){
        return (WinterUser) request.getAttribute("winteruser");
    }
    
    @PUT
    @Path("{action}")
    @Consumes(MediaType.APPLICATION_JSON)
    public boolean edit(
            @PathParam("action") String action,
            String data,
            @Context HttpServletRequest request
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        try {
            EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
            Query query = em.createQuery(
                "UPDATE WinterUser SET "+getColumn(action)+"=:data WHERE id=:id"
            );
            query.setParameter("data", data);
            query.setParameter("id", user.getId());
            em.getTransaction().begin();
            boolean res = query.executeUpdate() > 0;
            em.getTransaction().commit();
            return res;
        } catch (InvalidActionException ex) {
            return false;
        }
    }
    
    
    private String getColumn(String action) throws InvalidActionException {
        avaiableColumns.put("changename", "name");
        avaiableColumns.put("changephoto", "photoPath");
        avaiableColumns.put("changelogin", "login");
        avaiableColumns.put("changepass", "pass");
        avaiableColumns.put("changeemail", "email");
        
        if (avaiableColumns.containsKey(action)){
            return avaiableColumns.get(action);
        }
        throw new InvalidActionException();
    }
    
    public static class InvalidActionException extends Exception {};
    
}
