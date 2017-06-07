package com.winterpics.entities;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public abstract class DefaultEntityManagerFactory {

    private DefaultEntityManagerFactory() {
    }

    private static final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("WinterPicsPU");

    public static EntityManager newDefaultEntityManager()
    {
        return entityManagerFactory.createEntityManager();
    }

}
