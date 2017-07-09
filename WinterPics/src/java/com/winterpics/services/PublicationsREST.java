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
            p.loadReactionResume();
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
            p.loadReactionResume();
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
