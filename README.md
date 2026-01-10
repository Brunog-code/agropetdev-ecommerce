# 🌾 AgroPetDev - E-commerce Agropecuário

👉 **[Acesse o projeto aqui](https://agropetdev-ecommerce.vercel.app/)**

Sistema completo de e-commerce voltado para o setor agropecuário, desenvolvido com **Next.js**, **TypeScript** e **PostgreSQL**. O projeto oferece autenticação social, gerenciamento de carrinho, chat com IA e um fluxo de pagamento totalmente integrado e automatizado via API do **Stripe**, utilizando **webhooks** para garantir transações seguras, confiáveis e em tempo real, com confirmação instantânea de pedidos após o pagamento.

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

### 🤖 Automação & IA

| Tecnologia | Badge |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **n8n** | ![n8n](https://img.shields.io/badge/n8n-EA4B71?style=flat-square&logo=n8n&logoColor=white) |

---

### 🛠️ Ferramentas e Infraestrutura

- **Editor de Código:** Visual Studio Code
- **Controle de Versão:** Git & GitHub
- **Hospedagem Frontend/Backend:** Vercel
- **Hospedagem n8n:** VPS Oracle Cloud
- **Processamento de Pagamentos:** Stripe API

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

### 🔐 Segurança e Usabilidade

- **Login Social com Google:** Autenticação simplificada e segura através de OAuth com Google, facilitando o acesso dos usuários.
- **Validação de Dados:** Implementação de **Zod** em todos os formulários para garantir que apenas dados válidos sejam processados.
- **Layout Responsivo:** Interface otimizada para **desktop e mobile**, utilizando **Tailwind CSS**.
- **Full-Stack Next.js:** Arquitetura moderna com API Routes do Next.js, unificando frontend e backend em um único projeto.

---

## 📸 Visualização

### Página Inicial
*[Adicione aqui uma screenshot da página inicial]*

### Catálogo de Produtos
*[Adicione aqui uma screenshot do catálogo]*

### Carrinho de Compras
*[Adicione aqui uma screenshot do carrinho]*

### Chat com IA
*[Adicione aqui uma screenshot do chat]*

### Processo de Pagamento
*[Adicione aqui uma screenshot do checkout com Stripe]*

### Confirmação de Pedido
*[Adicione aqui uma screenshot da confirmação]*

---

## 🏗️ Arquitetura do Projeto

O projeto utiliza uma arquitetura full-stack moderna:

- **Frontend:** Next.js 15+ com App Router, TypeScript e Tailwind CSS
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

> 💡 **Dica:** Para testar o fluxo completo de pagamento, utilize os cartões de teste fornecidos pela documentação do Stripe.