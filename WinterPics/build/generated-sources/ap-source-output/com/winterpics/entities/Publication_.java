package com.winterpics.entities;

import com.winterpics.entities.Reaction;
import com.winterpics.entities.WinterUser;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-06-07T16:31:24")
@StaticMetamodel(Publication.class)
public class Publication_ { 

    public static volatile SingularAttribute<Publication, Date> date;
    public static volatile SingularAttribute<Publication, WinterUser> author;
    public static volatile SingularAttribute<Publication, String> imagePath;
    public static volatile ListAttribute<Publication, Reaction> reactions;
    public static volatile SingularAttribute<Publication, Long> id;
    public static volatile SingularAttribute<Publication, String> title;

}