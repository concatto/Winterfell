package com.winterpics.services;

import com.winterpics.entities.WinterUser;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("following")
public class FollowingREST {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<WinterUser> getFeed(@Context HttpServletRequest request){
        WinterUser user = (WinterUser) request.getAttribute("winteruser");
        return user.getFollowing();
    }    
    
}
