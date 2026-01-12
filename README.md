# 🌾 AgroPetDev - E-commerce Agropecuário

👉 **[Acesse o projeto aqui](https://agropetdev-ecommerce.vercel.app/)**

Sistema completo de e-commerce de uma agropecuaria ficticia, desenvolvido com **Next.js**. O projeto oferece autenticação social, gerenciamento de carrinho, chat com agente IA e um fluxo de pagamento totalmente integrado e automatizado via API do **Stripe**, utilizando **webhooks** para garantir transações seguras, confiáveis e em tempo real, com confirmação instantânea de pedidos após o pagamento.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack moderna com **Next.js**, focando em performance, escalabilidade e experiência do usuário.

### 🖥️ Frontend & Backend (Full-Stack)

| Tecnologia | Badge |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Next.js** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) |
| **TypeScript** | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **Tailwind CSS** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white) |
| **PostgreSQL** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white) |
| **Prisma ORM** | ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white) |


### 🔐 Autenticação

| Tecnologia | Badge |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Better Auth** | ![Better Auth](https://img.shields.io/badge/Better_Auth-5B21B6?style=flat-square&logo=auth0&logoColor=white) |


### 🤖 Automação & IA

| Tecnologia | Badge |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **n8n** | ![n8n](https://img.shields.io/badge/n8n-EA4B71?style=flat-square&logo=n8n&logoColor=white) |


### 📧 Comunicação

| Tecnologia | Badge |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Nodemailer** | ![Nodemailer](https://img.shields.io/badge/Nodemailer-0F9DCE?style=flat-square&logo=nodemailer&logoColor=white) |

---

### 🛠️ Ferramentas e Infraestrutura

- **Editor de Código:** Visual Studio Code
- **Controle de Versão:** Git & GitHub
- **Hospedagem Frontend/Backend:** Vercel
- **Hospedagem n8n:** VPS Oracle Cloud
- **Processamento de Pagamentos:** Stripe API
- **Envio de E-mails:** Nodemailer

---

## ✨ Funcionalidades em Destaque

O projeto foi construído focando em oferecer uma experiência de compra completa.

### 💳 Sistema de Pagamento e Webhooks

O sistema de pagamento utiliza a **API do Stripe** para segurança e confiabilidade:

- **Pagamento Integrado:** Processamento seguro de pagamentos diretamente na plataforma via Stripe.
- **Webhooks de Confirmação:** Endpoint configurado para receber notificações do Stripe, confirmando o pagamento em tempo real.
- **Confirmação Automática:** O pedido é confirmado no banco de dados **somente após a confirmação do pagamento** via webhook.

---

### ⚙️ Gestão de Pedidos Automatizada

- **Gerenciamento de Carrinho:** Utiliza **Zustand** para gerenciamento de estado eficiente do carrinho de compras, garantindo performance e persistência dos dados.
- **Cancelamento Automático (CronJob):** Uma tarefa agendada monitora os pedidos. Caso um pedido seja criado mas não tenha o pagamento confirmado em até **24 horas**, ele é automaticamente cancelado.
- **Validação com Zod:** Toda entrada de dados é validada utilizando **Zod**, garantindo integridade e segurança em todo o fluxo de compra.

---

### 🤖 Chat com Agente de IA

- **Assistente Virtual Inteligente:** Chat integrado com agente de IA através do **n8n**, oferecendo suporte automatizado aos clientes.
- **Respostas em Tempo Real:** O agente pode responder dúvidas sobre produtos, pedidos e informações gerais do e-commerce.
- **Workflow Personalizado:** Fluxos de automação criados no n8n para processar e responder às interações dos usuários.

---

### 🔐 Autenticação e Segurança

Sistema completo de autenticação gerenciado pela biblioteca **Better Auth**, garantindo segurança e flexibilidade:

- **Login Social com Google:** Autenticação simplificada e segura através de OAuth 2.0 com Google, facilitando o acesso dos usuários.
- **Autenticação com Email e Senha:** Sistema tradicional de login com credenciais, utilizando hash seguro de senhas.
- **Recuperação de Senha via E-mail:** Fluxo completo de recuperação de senha integrado com **Better Auth** e **Nodemailer**:
  - Geração automática de token único e seguro
  - Envio de e-mail com link de recuperação (válido por 1 hora)
  - E-mails transacionais estilizados e profissionais
  - Validação de token antes da redefinição
  - Hash automático de senhas com algoritmos seguros

---

### 🔐 Segurança e Usabilidade

- **Login Social com Google:** Autenticação simplificada e segura através de OAuth com Google, facilitando o acesso dos usuários.
- **Validação de Dados:** Implementação de **Zod** em todos os formulários para garantir que apenas dados válidos sejam processados.
- **Layout Responsivo:** Interface otimizada para **desktop e mobile**, utilizando **Tailwind CSS**.
- **Full-Stack Next.js:** Arquitetura moderna com API Routes do Next.js, unificando frontend e backend em um único projeto.

---

## 📸 Visualização

### Página Inicial
![Pagina inicial](https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prints-doc/hero.png)

### Página Inicial - Mobile
![Pagina inicial - mobile](https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prints-doc/mobile-hero.png)


### Principais Categorias
![Principais categorias](https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prints-doc/principais-categorias.png)

### Pagina subcategorias
![Principais subcategorias](https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prints-doc/categorias.png)

### Carrinho
![Carrinho](https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prints-doc/carrinho-drawer.png)

### Chat com IA
![Chat IA](https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prints-doc/agente%20de%20ia%20chat.png)

### Pagina carrinho
![Pagina carrinho](https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prints-doc/page-carrinho.png)

### Processo de Pagamento STRIPE 
![Pagina carrinho](https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prints-doc/cehckout%20stripe.png)

### Confirmação de Pedido   
![confirmação](https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prints-doc/page%20sucesso%20pagamento.png)

# Workflow n8n   
![worflow n8n](https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prints-doc/workflow.png)
---

## 🏗️ Arquitetura do Projeto

O projeto utiliza uma arquitetura full-stack moderna:

- **Frontend:** Next.js com App Router, TypeScript e Tailwind CSS
- **Backend:** API Routes do Next.js com validação Zod
- **Banco de Dados:** PostgreSQL gerenciado via Prisma ORM
- **Automação:** n8n rodando em VPS Oracle para workflows de IA e notificações
- **Pagamentos:** Integração com Stripe API e Webhooks
- **Estado Global:** Zustand para gerenciamento eficiente do carrinho

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido para demonstrar a implementação de um **e-commerce completo e moderno**, aplicando as melhores práticas de desenvolvimento web, integração com APIs de pagamento, automação com IA e gerenciamento de estado. O foco está em criar uma experiência de usuário fluida, segura e inteligente para o mercado agropecuário.

---

## 👨‍💻 Desenvolvedor

Projeto desenvolvido com foco em **qualidade de código**, **arquitetura escalável** e **experiência do usuário**.

---

## 🧪 Testando o Projeto

Para testar o fluxo completo de pagamento, utilize os seguintes **cartões de teste do Stripe**:

### Cartão de Crédito - Pagamento Aprovado ✅
```
Número: 4242 4242 4242 4242
Data de Validade: Qualquer data futura (ex: 12/34)
CVV: Qualquer 3 dígitos (ex: 123)
CEP: Qualquer CEP válido
```

### Cartão de Crédito - Pagamento Recusado ❌
```
Número: 4000 0000 0000 0002
Data de Validade: Qualquer data futura
CVV: Qualquer 3 dígitos
CEP: Qualquer CEP válido
```