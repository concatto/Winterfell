package com.winterpics.auth;

import com.winterpics.entities.DefaultEntityManagerFactory;
import com.winterpics.entities.PasswordConverter;
import com.winterpics.entities.WinterUser;
import java.io.IOException;
import java.util.Base64;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.ParameterExpression;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;

public class UserAuthenticator {

    private final PasswordConverter passwordConverter;

    public UserAuthenticator() {
        passwordConverter = new PasswordConverter();
    }

    public boolean userAuthenticated(String authString) throws IOException {
        if (authString == null){
            return false;
        }
        String auth[];
        auth = authString.split("\\s+");
        if (auth.length != 2){
            return false;
        }
        authString = fromBase64(auth[1]);
        auth = authString.split(":");
        if (auth.length != 2){
            return false;
        }
        return userAuthenticated( auth[0], auth[1] );
    }
    
    public boolean userAuthenticated(String login, String password){
        EntityManager em = DefaultEntityManagerFactory.newDefaultEntityManager();
        Query query = em.createQuery(
            "SELECT COUNT(u.id) FROM WinterUser u WHERE u.login=:login AND u.pass=:password"
        );
        query.setParameter("login", login);
        query.setParameter("password", password);
        return ((Long) query.getSingleResult()) > 0;
    }
    
    public String fromBase64(String str) throws IOException
    {
        return new String( Base64.getDecoder().decode(str) );
    }
    
}
