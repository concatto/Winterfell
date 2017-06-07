package com.winterpics.entities;

import com.winterpics.entities.WinterUser;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-06-07T02:29:07")
@StaticMetamodel(WinterUser.class)
public class WinterUser_ { 

    public static volatile SingularAttribute<WinterUser, String> pass;
    public static volatile SingularAttribute<WinterUser, String> photoPath;
    public static volatile ListAttribute<WinterUser, WinterUser> following;
    public static volatile SingularAttribute<WinterUser, String> name;
    public static volatile SingularAttribute<WinterUser, Long> id;
    public static volatile SingularAttribute<WinterUser, String> login;
    public static volatile SingularAttribute<WinterUser, String> email;

}