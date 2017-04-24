/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.winterpics.ftp;
//https://www.mkyong.com/java/java-properties-file-examples/
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.net.ftp.FTPClient;
/**
 *
 * @author User
 */
public class FTPWinterClient {
    private FTPClient conexao = null;
    private String server;
    private String port;
    private String user;
    private String pass;
    
    public FTPWinterClient() {
        try (FileInputStream input = new FileInputStream("ftp.properties")) {
            Properties ftp_properties = new Properties();
            ftp_properties.load(input);
//        ftp.changeWorkingDirectory("meuDir");
//
//        String[] arq = ftp.listNames();
//
//        System.out.println("Listando arquivos: \n");
//
//        for (String f : arq) {
//
//            System.out.println(f);
//        }
          server    = ftp_properties.getProperty("server");
          port      = ftp_properties.getProperty("port");
          user      = ftp_properties.getProperty("user");
          pass      = ftp_properties.getProperty("pass");
        } catch (FileNotFoundException ex) {
            Logger.getLogger(FTPWinterClient.class.getName()).log(Level.SEVERE, null, ex);
        }
        catch (IOException ex) {
            Logger.getLogger(FTPWinterClient.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public boolean conectar(){
        if (this.conexao == null){
            this.conexao = new FTPClient();
        }
        try {
            this.conexao.connect(server);
            this.conexao.login(user, pass);
            return true;
        } catch (IOException ex) {
            return false;
        }
    }
}
