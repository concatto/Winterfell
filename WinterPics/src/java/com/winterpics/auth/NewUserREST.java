package com.winterpics.auth;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.services.ImageConversor;
import com.winterpics.services.customParams.NewUserRequest;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Stateless
@Path("newuser")
public class NewUserREST {
    
    private Response buildResponse(int status){
        return Response.status(status)
            .header("Access-Control-Allow-Origin", "*")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
            .header("Access-Control-Allow-Credentials", "true")
            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
            .header("Access-Control-Max-Age", "1209600")
            .build();
    }
    
    @OPTIONS
    public Response acceptAllWithOptions(){
        return buildResponse(200);
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public Response newUser(
            NewUserRequest data,
            @Context HttpServletRequest request,
            @Context HttpServletResponse response
    ) {
        if (data == null){
            return buildResponse(500);
        }
        EntityManager em = null;
        String photo = null;
        try {
            em = DefaultEntityManagerFactory.newDefaultEntityManager();
            em.getTransaction().begin();
            data.getUserdata().setPhotopath("assets/defaultphoto.png");
            em.persist(data.getUserdata());
            em.flush();
            
            if (data.getPhoto() != null && !data.getPhoto().isEmpty()){
                photo = ImageConversor.saveImage(data.getPhoto(), data.getUserdata(), request);
                data.getUserdata().setPhotopath(photo);
                
                em.persist(data.getUserdata());
                em.flush();
            }
            
            em.getTransaction().commit();
            em.close();
            return buildResponse(200);
        } catch (Exception e){
            e.printStackTrace();
        }
        if (em != null && em.getTransaction().isActive()){
            em.getTransaction().rollback();
        }
        if (photo != null){
            ImageConversor.deleteImage(photo, request);
        }
        return buildResponse(500);
    }
}
