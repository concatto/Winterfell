# Funcionalidades:

### PÁGINA PRINCIPAL
* Deverá haver um botão de Login e um botão de Cadastro. Deverá haver uma breve descrição do site, com imagens (simples) e elementos textuais, possivelmente contendo um slider (carousel).

### PERFIL DE USUÁRIO:
* Imagem de perfil e nome próprio deverão ser bem visíveis. Deverá haver uma barra de pesquisa de usuários. Deverá haver uma maneira de ver quais pessoas o usuário está seguindo.
* Caso a página seja o perfil próprio, também deverá haver a opção de editar a foto de perfil (onde um file chooser se abrirá imediatamente) e o nome. Além disso, deverá haver um feed de publicações, contendo as publicações das pessoas que o utilizador está seguindo em ordem decrescente de data, e a opção de realizar uma nova publicação. Deve haver uma opção para ver apenas as próprias publicações.
* Caso a página seja o perfil de outra pessoa, a opção de realizar uma publicação será substituída por "Seguir"/"Parar de seguir" e o feed será substituído pelas imagens publicadas pelo usuário.

### RESULTADOS DA PESQUISA:
* Deverá conter uma barra de pesquisa e um botão de busca, caso o usuário queira realizar outra busca. Deverá conter uma lista com as pessoas que correspondem com termo pesquisado, ordenadas por um critério a ser definido (qtd. pessoas seguindo/publicações?). Possuirá uma quantidade fixa de usuários (a definir); ao atingir o último item, mais usuários serão carregados. Cada elemento da lista deve apresentar a imagem pessoal do usuário, seu nome e um indicador caso o utilizador atual esteja seguindo o usuário em questão. (Em discussão: apresentar a quantidade de pessoas que o usuário segue e quantas publicações ele realizou.) 

### PUBLICAÇÃO (componente - perfil):
* Deverá conter o título da imagem (caso exista), a imagem em si, a data de publicação (formato a definir), a imagem e o nome do autor da publicação e a reação mais popular. Deverá haver uma opção para reagir/ver reações, e também deverá explicitar quantas pessoas reagiram. 
* Caso a publicação seja DO USUÁRIO, não será possível reagir, apenas ver reações. Deverá ser possível excluir a publicação (com confirmação).
* Em discussão: haver uma página que contenha somente este componente, onde a imagem é apresentada em tamanho completo. Acessível clicando na data de publicação ou na imagem.

### REAÇÕES (componente - publicação):
* Deverá apresentar uma quantia (a definir) de emojis (a definir) que representem reações. Cada reação será associada à porcentagem de pessoas que reagiram daquela maneira. A reação selecionada (caso aplicável) deverá ser realçada de alguma maneira. Será possível trocar de reação e também removê-la. Um usuário só pode reagir uma única vez a cada publicação.

### CADASTRO (modal - home):
* Acessível a partir da página principal. Deverá conter campos para inserção de nome próprio, e-mail, nome de usuário e senha. Haverá validação nos campos de e-mail (sintaxe inválida), nome de usuário (apenas letras, números, hífen e underscore) e senha (6 a 20 caracteres). Nenhum campo poderá estar vazio. Caso alguma validação falhe, uma mensagem informativa deverá aparecer abaixo do campo apropriado, e o campo será realçado em vermelho.

### LOGIN (modal - home):
* Acessível a partir da página principal. Deverá conter campos para inserção do nome de usuário ou e-mail e a senha. Caso a autenticação falhe (nome de usuário/e-mail inválidos, senha errada, etc), uma mensagem informativa deverá aparecer abaixo dos campos. A mensagem não fará distinção sobre qual campo estava incorreto.
* Deverá conter uma opção para recuperação de senha. O método a ser utilizado se encontra em discussão no momento.

### SEGUINDO (modal - perfil):

* Presente nos perfis de usuário, acessível por um link/botão. Apresentará uma lista similar aos resultados da pesquisa, incluindo o comportamento de carregamento de usuários, porém sem a indicação de estar seguindo.

### NOVA PUBLICAÇÃO (modal - perfil):

* Diálogo apresentado quando o usuário desejar criar uma nova publicação. Conterá um campo de texto para a inserção do título da publicação (opcional, pode ser deixado em branco), um *preview* da imagem a ser inserida, um botão para selecionar uma imagem (formato JPG, PNG ou GIF, máximo de 10 MB) um botão para cancelar e um botão para publicar.
* Caso a imagem ultrapasse o limite de tamanho, o usuário deverá ser notificado de alguma maneira (caixa informativa, linha de texto próxima do botão, etc).

### EDITAR NOME (modal - perfil):

* Caixa de diálogo apresentada quando o usuário desejar realizar uma alteração no seu nome de perfil. Conterá um campo de texto para a inserção do novo nome, além de botões de cancelar e confirmar.

### CONFIRMAÇÃO DE EXCLUSÃO (modal - perfil):

* Solicitação de confirmação apresentada quando o usuário optar por excluir uma publicação própria. Deverá conter uma mensagem informativa e opções para cancelar e confirmar.

# Mudanças históricas

* Conceito de reações adicionado.
* Página própria para cada publicação em questionamento.
* Publicações não mais terão descrição, e o título será opcional.
