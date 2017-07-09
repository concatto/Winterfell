package com.winterpics.services;

import com.winterpics.entities.WinterUser;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;
import java.util.Calendar;
import javax.servlet.http.HttpServletRequest;

public abstract class ImageConversor {

    private ImageConversor() {
    }
    
    public static String getImagesFolder(HttpServletRequest request){
        String folder = request.getServletContext().getRealPath("/assets");
        File ff = new File(folder);
        if (!ff.exists()){
            ff.mkdir();
        }
        return folder + "/";
    }
    
    private static String generateName(WinterUser user)
    {
        return Long.toString(          Calendar.getInstance().getTimeInMillis())
                +"_" + Long.toString(  user.getId());
    }
    
    /**
     *
     * @param data
     * @param user
     * @param request
     * @return generated image name
     * @throws Exception
     */
    public static String saveImage(
            String data,
            WinterUser user,
            HttpServletRequest request
    ) throws Exception
    {
        String allData[] = data.split(";");
        String imageType = allData[0];
        String imageName = generateName(user) +"."+ imageType.split("/")[1];
        String fileData  = data.substring(data.indexOf(",")+1);
        
        byte[] decoded = Base64.getDecoder().decode(fileData);
        try (OutputStream stream = new FileOutputStream(getImagesFolder(request)+"/"+imageName)) {
            stream.write(decoded);
        }
        
        return "assets/"+imageName;
    }

}
