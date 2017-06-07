package com.winterpics.auth;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.WinterUser;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import javax.persistence.EntityManager;

public class UserAuthenticator {

    public boolean userAuthenticated(String authString) throws IOException {
        if (authString == null){
            return false;
        }
        authString = fromBase64(authString);
        String auth[] = authString.split(":");
        return userAuthenticated( auth[0], auth[1] );
    }
    
    public boolean userAuthenticated(String login, String password){
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        Map<String,Object> data = new HashMap<>();
        data.put("login", login);
        data.put("pass", password);
        WinterUser found = em.find( WinterUser.class, data );
        return ( found != null );
//        Query query = em.createQuery
//        (
//            "SELECT 1 FROM WinterUser WHERE login=:login AND pass=md5(:password)"
//        );
//        query.setParameter("login", auth[0]);
//        query.setParameter("password", auth[1]);
//        int res = query.getFirstResult();
//        return (res == 1);
    }
    
    public String fromBase64(String str) throws IOException
    {
        return new String( Base64.getDecoder().decode(str) );
    }
    
}
