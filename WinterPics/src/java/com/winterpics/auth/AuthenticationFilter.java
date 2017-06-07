package com.winterpics.auth;

import com.winterpics.entities.WinterUser;
import com.winterpics.entities.DefaultEntityManagerFactory;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter(
        filterName = "AuthenticationFilter",
        urlPatterns = {"/services/*"},
        dispatcherTypes = {DispatcherType.REQUEST}
)
public class AuthenticationFilter implements Filter {

    private FilterConfig filterConfig = null;
    private final UserAuthenticator userAuthenticator;

    public AuthenticationFilter() {
        userAuthenticator = new UserAuthenticator();
    }
    
    @Override
    public void init(FilterConfig filterConfig) {        
        this.filterConfig = filterConfig;
    }
    
    /**
     *
     * @param request The servlet request we are processing
     * @param response The servlet response we are creating
     * @param chain The filter chain we are processing
     *
     * @exception IOException if an input/output error occurs
     * @exception ServletException if a servlet error occurs
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        if (userAuthenticator.userAuthenticated(httpRequest.getHeader("authorization"))){
            chain.doFilter(request, response);
        } else {
            httpResponse.setHeader("WWW-Authenticate", "Basic realm=\"Autenticação\"");
            httpResponse.sendError(401);
        }
        
    }
    
    
    @Override
    public void destroy() {        
    }

}
