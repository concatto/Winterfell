package com.winterpics.auth;

import com.winterpics.entities.WinterUser;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Stateless
@Path("login")
public class LoginRest {

    private final UserAuthenticator userAuthenticator = new UserAuthenticator();
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces(MediaType.TEXT_PLAIN)
    public long login(WinterUser user) {
        try {
            WinterUser userAuthenticated = userAuthenticator.userAuthenticated(
                user.getLogin(), user.getPass()
            );
            return userAuthenticated.getId();
        } catch (UserAuthenticator.UserNotFoundException ex) {
            return 0;
        }
    }
    
    
}
