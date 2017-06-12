# Winterfell
Rede Social para Compartilhamento de Imagens

### Documentação Back-end

#### Rest
* /authentication/newuser
    * Cadastro de novo usuário;
    * Post com Json;
    * Retorna true ou false;
    * Body: 
   ```json
        {
          "name": "Samuel Brati Favarin",
          "login": "samuelbfav",
          "pass": "666666",
          "email": "a@b.com.br",
          "photoPath": "./avatar.jpg"
        }
   ```

* /authenticatin/login
   * Login de usuário;
   * Post com Json;
   * Retorna Id;
   * Body: 
   ```json
           {
             "name": "Samuel Brati Favarin",
             "login": "samuelbfav",
             "pass": "666666",
             "email": "a@b.com.br",
             "photoPath": "./avatar.jpg"
           }
   ```






