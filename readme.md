# 📋 Task Flow - Sistema de Gestão de Tarefas & XP

O **Task Flow** é uma aplicação Full Stack de gerenciamento de produtividade desenvolvida para consolidar conceitos de **Programação Orientada a Objetos (POO)** e **Arquitetura Cliente-Servidor** utilizando TypeScript.

Este projeto marca a conclusão dos meus estudos em TypeScript Vanilla antes do ingresso na especialização em **Angular** na Itália.

## 🚀 Tecnologias Utilizadas

* **Linguagem:** TypeScript (v5.x).
* **Frontend:** HTML5, CSS3 (com foco em Flexbox e animações de estado), DOM API.
* **Backend:** Node.js com Express.
* **Banco de Dados:** Persistência via arquivo JSON (`node:fs/promises`).
* **Desktop:** Preparado para empacotamento via **Electron**.



## 🛠️ Funcionalidades Principais

* **CRUD Completo:** Criação, leitura, edição e exclusão de tarefas com persistência em tempo real.
* **Gestão de Prazos:** Organização automática em três colunas inteligentes:
    * **Pendentes:** Tarefas do dia atual.
    * **Vencidas:** Alertas visuais para tarefas não concluídas com prazos expirados.
    * **Concluídas:** Histórico de atividades finalizadas no dia.
* **Sistema de Gamificação:** Atribuição de recompensas em XP para incentivar a conclusão de atividades.
* **Feedback Inteligente:** Mensagens personalizadas que orientam o usuário a focar em tarefas atrasadas quando a lista do dia está vazia.

## 🏗️ Conceitos de Engenharia de Software Aplicados

Durante o desenvolvimento, foram resolvidos desafios críticos de arquitetura:

* **Composição sobre Herança:** Refatoração de classes (`MenuClass` e `TaskClass`) para eliminar redundância de eventos e garantir uma única instância de controle (Singleton Pattern).
* **Gerenciamento de Eventos:** Implementação de ouvintes de eventos centralizados no construtor para evitar disparos duplicados e vazamentos de memória.
* **Comunicação Assíncrona:** Integração fluida entre Frontend e Backend através de rotas RESTful (GET, POST, PUT, DELETE e PATCH).



## 📦 Como Executar o Projeto

1.  **Clonar o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/task-flow.git](https://github.com/seu-usuario/task-flow.git)
    ```
2.  **Instalar dependências:**
    ```bash
    npm install
    ```
3.  **Compilar o TypeScript:**
    ```bash
    tsc
    ```
4.  **Iniciar a aplicação:**
    ```bash
    npm start
    ```

---