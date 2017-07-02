package com.winterpics.auth;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.PasswordConverter;
import com.winterpics.entities.WinterUser;
import java.io.IOException;
import java.util.Base64;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;

public class UserAuthenticator {

    public UserAuthenticator() {
    }

    public WinterUser userAuthenticated(String authString) throws IOException, UserNotFoundException {
        if (authString == null){
            throw new UserNotFoundException();
        }
        String auth[];
        auth = authString.split("\\s+");
        if (auth.length != 2){
            throw new UserNotFoundException();
        }
        authString = fromBase64(auth[1]);
        auth = authString.split(":");
        if (auth.length != 2){
            throw new UserNotFoundException();
        }
        WinterUser userAuthenticated = userAuthenticated( auth[0], auth[1] );
        if (userAuthenticated == null){
            throw new UserNotFoundException();
        }
        return userAuthenticated;
    }
    
    public WinterUser userAuthenticated(String login, String password) throws UserNotFoundException {
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        Query query = em.createQuery(
            "SELECT u FROM WinterUser u WHERE u.login=:login AND u.pass=:password"
        );
        query.setParameter("login", login);
        query.setParameter("password", password);
        try {
            return (WinterUser) query.getSingleResult();
        } catch (NoResultException e) {
            throw new UserNotFoundException();
        }
    }
    
    public String fromBase64(String str) throws IOException
    {
        return new String( Base64.getDecoder().decode(str) );
    }
    
    public static class UserNotFoundException extends Exception {
        public UserNotFoundException() {
            super("User not found");
        }
    }
    
}
