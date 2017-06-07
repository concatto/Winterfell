package com.winterpics.model;

public class Pessoa {

    private String email;
    private String foto_perfil;
    private String nome;
    private String senha;
    private String usuario;
    private Publicacao publicacoes;
    private Pessoa seguindo;

    public Pessoa(){

    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    @Override
    public void finalize() throws Throwable {
        super.finalize();
    }

}