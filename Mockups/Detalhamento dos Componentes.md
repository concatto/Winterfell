# Funcionalidades:

### PÁGINA PRINCIPAL
* Deverá haver um botão de Login e um botão de Cadastro. Deverá haver uma breve descrição do site, com imagens (simples) e elementos textuais, possivelmente contendo um slider (carousel).

### PERFIL DE USUÁRIO:
* Imagem de perfil e nome próprio deverão ser bem visíveis. Deverá haver uma barra de pesquisa de usuários.
* Caso a página seja o perfil próprio, deverá haver uma lista de pessoas que o usuário está seguindo. Também deverá haver a opção de editar a foto de perfil e o nome. Além disso, deverá haver um feed de publicações e a opção de realizar uma nova publicação.
* Caso a página seja o perfil de outra pessoa, a lista de pessoas será substituída por um botão "Home", a opção de realizar uma publicação será substituída por "Seguir"/"Parar de seguir" e o feed será substituído pelas imagens publicadas pelo usuário.

### PUBLICAÇÃO (componente):
* Deverá conter o título da imagem, a imagem em si, a data de publicação (formato a definir) e a reação mais popular. Deverá haver uma opção para reagir/ver reações, e também deverá explicitar quantas pessoas reagiram.
* Caso a publicação NÃO seja do perfil sendo visitado atualmente, deverá ser apresentado a imagem e o nome do autor da publicação.
* Caso a publicação seja DO USUÁRIO, não será possível reagir, apenas ver reações (lógica apenas). Deverá ser possível excluir a publicação.

### REAÇÕES (componente):
* Deverá apresentar uma quantia (a definir) de emojis (a definir) que representem reações. Cada reação será associada à porcentagem de pessoas que reagiram daquela maneira. A reação selecionada (caso aplicável) deverá ser realçada de alguma maneira.

### CADASTRO (modal):
* Acessível a partir da página principal. Deverá conter campos para inserção de nome próprio, e-mail, nome de usuário e senha. Haverá validação nos campos de e-mail (sintaxe inválida), nome de usuário (apenas letras, números, hífen e underscore) e senha (6 a 20 caracteres). Nenhum campo poderá estar vazio. Caso alguma validação falhe, uma mensagem informativa deverá aparecer abaixo do campo apropriado.

### LOGIN (modal):
* Acessível a partir da página principal. Deverá conter campos para inserção do nome de usuário ou e-mail e a senha. Caso a autenticação falhe (nome de usuário inválido, senha errada, etc), uma mensagem informativa deverá aparecer abaixo dos campos.
