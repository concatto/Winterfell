package com.winterpics.entities;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public abstract class DefaultEntityManagerFactory {

    private static final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("WinterPicsPU");

    private DefaultEntityManagerFactory() {
    }

    public static final EntityManager newDefaultEntityManager()
    {
        return entityManagerFactory.createEntityManager();
    }

}
