package com.winterpics.rest.config;

import java.util.Set;
import javax.ws.rs.core.Application;

@javax.ws.rs.ApplicationPath("authentication")
public class AuthenticationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        resources.add(com.winterpics.auth.NewUserREST.class);
        resources.add(com.winterpics.auth.LoginRest.class);
        return resources;
    }
}
