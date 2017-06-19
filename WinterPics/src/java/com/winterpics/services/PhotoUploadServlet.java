package com.winterpics.services;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;


@WebServlet(urlPatterns = {"/fileupload/*"})
@MultipartConfig
public class PhotoUploadServlet extends HttpServlet {
    
    String getImagesFolder(HttpServletRequest request){
        String folder = request.getServletContext().getRealPath("/images");
        File ff = new File(folder);
        if (!ff.exists()){
            ff.mkdir();
        }
        return folder + "/";
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        String filepath = getImagesFolder(request) + request.getPathInfo();
        File file = new File(filepath);
        response.setContentType(Files.probeContentType(file.toPath()));
        
        response.setContentLength((int) file.length());
        
        try (InputStream in = new BufferedInputStream(new FileInputStream(file))){
            try (OutputStream out = new BufferedOutputStream(response.getOutputStream())) {
                int B;
                while ((B = in.read()) != -1){
                    out.write(B);
                }
            }
        }
        
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/plain;charset=UTF-8");        
        
        Part filePart = request.getPart("file");
        
        String contentDisposition = filePart.getHeader("content-disposition");
        String filename = contentDisposition.replaceFirst("(?i)^.*filename=\"([^\"]+)\".*$", "$1");
        
        File serverFile = new File( getImagesFolder(request) + filename );
        
        String contentType = Files.probeContentType(serverFile.toPath());
        if (!contentType.startsWith("image")){
            response.getWriter().write("Only images are allowed");
            response.setStatus(401);
            return;
        }
        
        if (serverFile.exists()){
            serverFile.delete();
        }
        serverFile.createNewFile();
        try (InputStream in = new BufferedInputStream(filePart.getInputStream())){
            try (OutputStream out = new BufferedOutputStream(new FileOutputStream(serverFile))) {
                int B;
                while ((B = in.read()) != -1){
                    out.write(B);
                }
            }
        }
        System.out.println("Uploaded file: "+serverFile.getAbsolutePath());
        response.getWriter().print("/images/"+filename);
    }


    @Override
    public String getServletInfo() {
        return "Photo uploader servlet";
    }

}
