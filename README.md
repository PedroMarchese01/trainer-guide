# Trainee Guide


A **Trainee Guide** é um site **MVP (Produto Mínimo Viável)** cujo objetivo é fortalecer a base dos programadores e ajudar iniciantes a terem um guia claro, simples e estruturado para começar sua jornada na programação.

Este MVP foi desenvolvido como parte da **GS 2025 – 2º Semestre**, cujo tema é **"O Futuro do Trabalho"**.  
A conexão com o tema se dá pelo fato de que a tecnologia, especialmente o desenvolvimento de software, continuará sendo uma das áreas mais importantes e acessíveis no futuro do mercado profissional.  
A Trainee Guide busca justamente **democratizar o acesso ao conhecimento**, ajudando novos programadores a entrarem no mercado de forma mais rápida, guiada e prática — um ponto essencial para o futuro do trabalho, onde aprender continuamente e se adaptar será fundamental.

Neste projeto MVP temos as seguintes funcionalidades:

1. Sistema de login e cadastro
2. Sistema de verificação por e-mail
3. Acesso aos guias
4. Sistema de perguntas e respostas
5. Sistema de gamificação das perguntas e respostas

Este projeto é um MVP, logo não é uma versão final definitiva. Aqui estão algumas observações para correções futuras:

Os guias ainda não são definitivos; a falta de implementação de cookies e JWT pode comprometer a segurança do usuário; e, mesmo utilizando banco de dados, alguns dados são armazenados em localStorage para evitar muitas chamadas à API. Em caso de continuidade, a segurança como um todo precisará ser repensada.

Acesse o projeto hospedado na Vercel:  
https://trainee-guide.vercel.app/

---

## Sumário
- Sobre o projeto
- Tecnologias utilizadas
- Como executar o projeto
- Variáveis de ambiente
- Observações sobre segurança
- Integrantes

---

## Sobre o projeto

Este repositório contém o código do MVP da Trainee Guide, utilizando tecnologias modernas de desenvolvimento web e priorizando simplicidade para validar rapidamente a ideia do produto.

---

## Tecnologias utilizadas

- Next.js  
- TypeScript  
- MongoDB  
- Mongoose  
- NextMailer (para verificação por e-mail)  
- TailwindCSS  

---

## Como executar o projeto

### 1. Faça um fork do repositório
Crie uma cópia do projeto na sua conta do GitHub através da opção "Fork".

### 2. Clone o repositório forkado
```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

## Como executar o projeto

### 3. Acesse a pasta
```bash
cd SEU_REPOSITORIO
```
4. Instale as dependências
```
npm install
```

5. Crie o arquivo .env.local na raiz do projeto

O arquivo deve conter:
```
MONGODB_URI=
EMAIL_USER=
EMAIL_PASS=
```
6. Observação sobre EMAIL_PASS

Não é a senha da sua conta de e-mail.

É necessário ativar a autenticação em duas etapas (2FA).

Após ativar, gere uma senha de app no painel do seu provedor de e-mail.

Essa senha gerada deve ser usada em EMAIL_PASS.

7. Execute o projeto
```
npm run dev
```

O projeto estará disponível em:

http://localhost:3000 ou local host fornecido no própio

Observações sobre segurança

Como este é um MVP:

Não há implementação de cookies seguros ou JWT.

Algumas informações são armazenadas em localStorage.

Isso reduz chamadas à API, mas compromete parcialmente a segurança.

Caso o projeto evolua, a segurança precisará ser totalmente reavaliada.

Integrantes

- [Augusto Valerio](https://github.com/Augusto-Valerio) 
- [Jonas Esteves](https://github.com/JonasEstevess) 
- [Pedro Marchese](https://github.com/PedroMarchese01/connect) 



