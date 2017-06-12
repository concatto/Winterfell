package com.winterpics.auth;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.WinterUser;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("newuser")
public class AuthenticationREST {

//    private final UserAuthenticator userAuthenticator = new UserAuthenticator();
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces(MediaType.TEXT_PLAIN)
    public boolean newUser(WinterUser entity) {
        if (entity == null){
            return false;
        }
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        em.getTransaction().begin();
        em.persist(entity);
        em.getTransaction().commit();
        em.close();
        return true;
    }
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void login(){
        
    }
}
