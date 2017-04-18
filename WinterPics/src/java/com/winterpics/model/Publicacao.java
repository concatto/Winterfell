package com.winterpics.model;

import java.util.Date;

public class Publicacao {

	private String caminho;
	private Date data_envio;
	private String titulo;
	private Reacao reacoes;

	public Publicacao(){

	}

        @Override
	public void finalize() throws Throwable {
	    super.finalize();
	}

}