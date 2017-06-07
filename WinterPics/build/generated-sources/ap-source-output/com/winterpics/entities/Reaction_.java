package com.winterpics.entities;

import com.winterpics.entities.Publication;
import com.winterpics.entities.WinterUser;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-06-07T16:41:36")
@StaticMetamodel(Reaction.class)
public class Reaction_ { 

    public static volatile SingularAttribute<Reaction, WinterUser> author;
    public static volatile SingularAttribute<Reaction, Publication> publication;
    public static volatile SingularAttribute<Reaction, Long> id;
    public static volatile SingularAttribute<Reaction, Integer> type;

}