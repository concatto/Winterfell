package com.winterpics.services;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.services.customParams.SearchResponse;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("search")
public class SearchREST {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public SearchResponse searchUsers(
        @QueryParam("data") String data,
        @QueryParam("offset") int offset,
        @QueryParam("limit") int limit
    ){
        String query = "FROM WinterUser u WHERE LOWER(u.name) LIKE LOWER(:name)";
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        
        Query counter = em.createQuery("SELECT COUNT(u.id) "+query);
        counter.setParameter("name", "%"+data+"%");
        long count = (long) counter.getSingleResult();
        
        Query res = em.createQuery("SELECT u "+query);
        res.setParameter("name", "%"+data+"%");
        res.setFirstResult(offset);
        if (limit > 0){
            res.setMaxResults(limit);
        }
        
        return new SearchResponse( res.getResultList(), count );
    }
    
}
