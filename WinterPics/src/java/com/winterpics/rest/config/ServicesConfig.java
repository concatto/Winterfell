package com.winterpics.rest.config;

import java.util.Set;
import javax.ws.rs.core.Application;

@javax.ws.rs.ApplicationPath("services")
public class ServicesConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        resources.add(com.winterpics.entities.services.PublicationFacadeREST.class);
        resources.add(com.winterpics.entities.services.ReactionFacadeREST.class);
        resources.add(com.winterpics.entities.services.WinterUserFacadeREST.class);
        
        resources.add(com.winterpics.entities.services.WinterUserREST.class);
        return resources;
    }
}
