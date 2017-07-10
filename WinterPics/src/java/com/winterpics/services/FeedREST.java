package com.winterpics.services;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.Publication;
import com.winterpics.entities.WinterUser;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("feed")
public class FeedREST {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Publication> getFeed(
            @Context HttpServletRequest request,
            @QueryParam("offset") int offset,
            @QueryParam("limit") int limit
    ){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        Query query = em.createQuery(
            "SELECT DISTINCT p "
            + "FROM WinterUser u "
            + "JOIN u.following f "
            + "JOIN f.publications p "
            + "WHERE u = :user OR p.author = :user "
            + "ORDER BY p.moment DESC"
        )
        .setParameter("user", user);
        
        query.setFirstResult(offset);
        if (limit > 0){
            query.setMaxResults(limit);
        }
        
        List<Publication> feed = query.getResultList();
        feed.parallelStream().forEach((Publication p) -> {
            p.getAuthor().setisFollowing(
                user.getFollowing().contains(p.getAuthor())
            );
            p.loadReactionResume(user);
        });
        
        return feed;
    }
    
    
}
