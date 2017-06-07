package com.winterpics.auth;

import java.io.IOException;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.Query;
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
import sun.misc.BASE64Decoder;

@WebFilter(filterName = "AuthenticationFilter", urlPatterns = {"/*"}, dispatcherTypes = {DispatcherType.REQUEST})
public class AuthenticationFilter implements Filter {

    private FilterConfig filterConfig = null;
    
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
        
        if (userAuthenticated(httpRequest.getHeader("authorization"))){
            chain.doFilter(request, response);
        } else {
            ((HttpServletResponse) response).setHeader("WWW-Authenticate", "Basic realm=\"Autenticação\"");
            ((HttpServletResponse) response).sendError(401);
        }
        
    }

    private boolean userAuthenticated(String authString) throws IOException {
        if (authString == null){
            return false;
        }
        authString = fromBase64( authString.split("\\s+")[1] );
        String auth[] = authString.split(":");
        EntityManager em = Persistence
                                .createEntityManagerFactory("WinterpicsPersistence")
                                .createEntityManager();
        Query query = em.createQuery
        (
            "SELECT 1 FROM WinterUser WHERE login=:login AND pass=md5(:password)"
        );
        query.setParameter("login", auth[0]);
        query.setParameter("password", auth[1]);
        int res = query.getFirstResult();
        return (res == 1);
    }
    
    private String fromBase64(String str) throws IOException{
        byte[] bytes = new BASE64Decoder().decodeBuffer(str);
        return new String(bytes);
    }
    
    @Override
    public void destroy() {        
    }

}
