package com.winterpics.services;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.Publication;
import com.winterpics.entities.WinterUser;
import java.util.Calendar;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("publications")
public class PublicationsREST {

    List<Publication> getPublications(long id){
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        Query query = em.createQuery("SELECT p FROM Publication AS p WHERE p.author.id=:id");
        query.setParameter("id", id);
        return query.getResultList();
    }
    
    List<Publication> getPublications(long id, int offset, int limit){
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        Query query = em.createQuery("SELECT p FROM Publication AS p WHERE p.author.id=:id");
        query.setParameter("id", id);
        query.setFirstResult(offset);
        query.setMaxResults(limit);
        return query.getResultList();
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Publication> getMyPublications(@Context HttpServletRequest request){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        return getPublications(user.getId());
    }
    
    @GET
    @Path("{offset}/{limit}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Publication> getMyPublicationsLimited(
        @PathParam("offset") int offset,
        @PathParam("limit") int limit,
        @Context HttpServletRequest request
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        return getPublications(user.getId(),offset,limit);
    }
    
    
    @GET
    @Path("{otherID}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Publication> getOtherPublications(
            @PathParam("otherID") long otherID,
            @Context HttpServletRequest request
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        List<Publication> publications = getPublications(otherID);
        publications.parallelStream().forEach((Publication p) -> {
            p.getAuthor().setisFollowing(
                user.getFollowing().contains(p.getAuthor())
            );
        });
        return publications;
    }
    
    @GET
    @Path("{otherID}/{offset}/{limit}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Publication> getOtherPublicationsLimited(
            @PathParam("otherID") long otherID,
            @PathParam("offset") int offset,
            @PathParam("limit") int limit,
            @Context HttpServletRequest request
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        List<Publication> publications = getPublications(otherID,offset,limit);
        publications.parallelStream().forEach((Publication p) -> {
            p.getAuthor().setisFollowing(
                user.getFollowing().contains(p.getAuthor())
            );
        });
        return publications;
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Publication newPublication(Publication publication, @Context HttpServletRequest request){
        if (publication == null){
            return null;
        }
        try {
            WinterUser user = (WinterUser) request.getAttribute("winteruser");
            publication.setAuthor(user);
            publication.setMoment(Calendar.getInstance().getTime());
            EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
            em.getTransaction().begin();
            em.persist(publication);
            em.flush();
            em.getTransaction().commit();
            return publication;
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
    
}
