package com.winterpics.rest.config;

import java.util.Set;
import javax.ws.rs.core.Application;

@javax.ws.rs.ApplicationPath("services")
public class ServicesConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        resources.add(com.winterpics.services.WinterUserREST.class);
        resources.add(com.winterpics.services.PublicationsREST.class);
        resources.add(com.winterpics.services.FeedREST.class);
        resources.add(com.winterpics.services.FollowingREST.class);
        resources.add(com.winterpics.services.ReactionREST.class);
        resources.add(com.winterpics.services.SearchREST.class);
        return resources;
    }
}
