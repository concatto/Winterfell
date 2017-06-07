package com.winterpics.model;

public class Associacao {

	private Pessoa seguido;
	private Pessoa seguidor;

	public Associacao(){

	}

        @Override
	public void finalize() throws Throwable {
	    super.finalize();
	}

}