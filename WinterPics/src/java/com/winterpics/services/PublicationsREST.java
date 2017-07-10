package com.winterpics.services;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.Publication;
import com.winterpics.entities.WinterUser;
import com.winterpics.services.customParams.NewPublicationRequest;
import java.util.Calendar;
import java.util.List;
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

@Path("publications")
public class PublicationsREST {

    Query makeQuery(long id){
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        Query query = em.createQuery("SELECT p FROM Publication AS p WHERE p.author.id=:id ORDER BY p.moment DESC");
        query.setParameter("id", id);
        return query;
    }    
    List<Publication> getPublications(long id){
        return makeQuery(id).getResultList();
    }    
    List<Publication> getPublications(long id, int offset, int limit){
        Query query = makeQuery(id);
        query.setFirstResult(offset);
        if (limit > 0){
            query.setMaxResults(limit);
        }
        return query.getResultList();
    }
    
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Publication> getMyPublicationsLimited(
        @QueryParam("offset") int offset,
        @QueryParam("limit") int limit,
        @Context HttpServletRequest request
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        List<Publication> publications = getPublications( user.getId(), offset, limit );
        publications.parallelStream().forEach((Publication p) -> {
            p.loadReactionResume(user);
        });
        return publications;
    }
    
    
    @GET
    @Path("{otherID}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Publication> getOtherPublicationsLimited(
            @PathParam("otherID") long otherID,
            @QueryParam("offset") int offset,
            @QueryParam("limit") int limit,
            @Context HttpServletRequest request
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        List<Publication> publications = getPublications(otherID,offset,limit);
        publications.parallelStream().forEach((Publication p) -> {
            p.getAuthor().setisFollowing(
                user.getFollowing().contains(p.getAuthor())
            );
            p.loadReactionResume(user);
        });
        return publications;
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Publication newPublication(
        NewPublicationRequest data,
        @Context HttpServletRequest request,
        @Context HttpServletResponse response
    ){
        if (data == null){
            response.setStatus(500);
            return null;
        }
        EntityManager em = null;
        String photo = null;
        try {
            WinterUser user = (WinterUser) request.getAttribute("winteruser");
            
            data.getPublication().setAuthor(user);
            data.getPublication().setMoment(Calendar.getInstance().getTime());
            
            em = DefaultEntityManagerFactory.newDefaultEntityManager();
            em.getTransaction().begin();
            
            photo = ImageConversor.saveImage(data.getPhoto(), user, request);
            
            data.getPublication().setImagepath(photo);
            
            em.persist(data.getPublication());
            em.flush();
            em.getTransaction().commit();
            
            response.setStatus(200);
            return data.getPublication();
        } catch (Exception e){
            e.printStackTrace();
        }
        if (em != null && em.getTransaction().isActive()){
            em.getTransaction().rollback();
        }
        if (photo != null){
            ImageConversor.deleteImage(photo, request);
        }
        response.setStatus(500);
        return null;
    }
    
}
