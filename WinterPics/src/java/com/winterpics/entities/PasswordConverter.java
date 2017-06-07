package com.winterpics.entities;

import com.google.common.hash.HashCode;
import com.google.common.hash.Hashing;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class PasswordConverter implements AttributeConverter<String,String> {

    @Override
    public String convertToDatabaseColumn(String attribute) {
        try {
            //        HashCode hashBytes = Hashing.sha1().hashBytes(attribute.getBytes());
//        byte[] bytes = hashBytes.asBytes();
//        StringBuilder sb = new StringBuilder();
//        for (byte b : bytes) {
//            sb.append(String.format("%02X ", b));
//        }
//        return sb.toString();

            MessageDigest crypt = MessageDigest.getInstance("SHA-1");
            crypt.reset();
            byte[] bytes = crypt.digest(attribute.getBytes("UTF-8"));
            return new BigInteger(1, bytes).toString(16);
            
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException ex) {
            Logger.getLogger(PasswordConverter.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        return dbData;
    }

}
