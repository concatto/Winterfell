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
//        Query query = em.createQuery("SELECT p FROM Publication AS p WHERE p.author=:user");
//        query.setParameter("user", user);
//        return query.getResultList();
//        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
//        
//        Query query = em.createQuery("select p from Publication p where p.author in (:autores)").setParameter("autores",user.getFollowing().toArray());
//        Query query = em.createQuery(
//              "SELECT ps "
//            + "FROM WinterUser u "
//            + "INNER JOIN u.following fo "
//            + "INNER JOIN fo.publications ps "
//            + "WHERE u = :user OR ps.author in (:autores)"
//        )
        Query query = em.createQuery(
            "SELECT p "
            + "FROM WinterUser u "
            + "JOIN u.following f "
            + "JOIN f.publications p "
            + "WHERE u = :user OR p.author = :user "
            + "ORDER BY p.moment DESC"
        )
        .setParameter("user", user);
//        .setFirstResult(offset)
//        .setMaxResults(limit);
        query.setFirstResult(offset);
        if (limit > 0){
            query.setMaxResults(limit);
        }
//        Query query = em.createQuery(
//                "SELECT p "
//                        +"FROM Publication AS p "
//                        + ""
//        );
//.setParameter("autores",user.getFollowing().toArray());
//        Query query = em.createQuery("select p from Publication p where p.author in (:autores)").setParameter("autores",user.getFollowing().toArray());
//        Query query = em.createQuery(
//            "SELECT p "+
//            " FROM winteruser_winteruser AS ww"+
//            " INNER JOIN Publication AS p"+
//            " ON ( ww.winteruser_id = :id AND p.author_id = ww.following_id )"+
//            " OR p.author_id = :id"
////            +
////            " ORDER BY p.date DESC"
//        );
        //query.setParameter("id", user.getId());
//        return res.toArray(new Publication[res.size()]);
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
