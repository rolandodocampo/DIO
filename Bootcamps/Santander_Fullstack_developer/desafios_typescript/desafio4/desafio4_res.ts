"use strict";
// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito? 
var __awaiter:Function = (this && this.__awaiter) || function (thisArg:any, _arguments:any, P:any, generator:any) {
    function adopt(value:any) { return value instanceof P ? value : new P(function (resolve:any) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve:any, reject:any) {
        function fulfilled(value:any) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value:any) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result:any) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela
// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction
var apiKey:string = '3f301be7381a03ad8d352314dcc3ec1d';
let requestToken:string
let username:string;
let password:string;
let sessionId:string;
let listId:string = '7101979';
let loginButton = document.getElementById('login-button') as HTMLButtonElement
let searchButton = document.getElementById('search-button') as HTMLButtonElement
let searchContainer = document.getElementById('search-container') as HTMLDivElement
loginButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield criarRequestToken();
    yield logar();
    yield criarSessao();
}));
searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let query1 = document.getElementById('search') as HTMLInputElement 
    let query:string = query1.value;
    let listaDeFilmes:object = yield procurarFilme(query);
    let ul = document.createElement('ul');
    ul.id = "lista";
    for (const item of listaDeFilmes.results) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item.original_title));
        ul.appendChild(li);
    }
    console.log(listaDeFilmes);
    searchContainer.appendChild(ul);
}));
function preencherSenha() {
    let password1 = document.getElementById('senha') as HTMLInputElement 
    let password = password1.value;
    validateLoginButton();
}
function preencherLogin() {
    let username1 = document.getElementById('login') as HTMLInputElement
    let username = username1.value;
    validateLoginButton();
}
function preencherApi() {
    let apiKey1 = document.getElementById('api-key') as HTMLInputElement
    let apiKey = apiKey1.value;
    validateLoginButton();
}
function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    }
    else {
        loginButton.disabled = true;
    }
}

class HttpClient {
    static get({ url, method, body = null}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open(url, method, true);
                request.onload = () => {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(JSON.parse(request.responseText));
                    }
                    else {
                        reject({
                            status: request.status,
                            statusText: request.statusText
                        });
                    }
                };
                request.onerror = () => {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                };
                if (body) {
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    body = (JSON.stringify(body));
                }
                request.send(body);
            });
        });
    }
}
function procurarFilme(this: any, query:string) {
    return __awaiter(this, void 0, void 0, function* () {
        query = encodeURI(query);
        console.log(query);
        let result:object = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
            method: "GET"
        });
        return result;
    });
}
function adicionarFilme(this: any, filmeId:string) {
    return __awaiter(this, void 0, void 0, function* () {
        let result:object = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
            method: "GET"
        });
        console.log(result);
    });
}
function criarRequestToken(this: any) {
    return __awaiter(this, void 0, void 0, function* () {
        let result:object = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
            method: "GET"
        });
        requestToken = result.request_token;
    });
}
function logar(this: any) {
    return __awaiter(this, void 0, void 0, function* () {
        yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
            method: "POST",
            body: {
                username: `${username}`,
                password: `${password}`,
                request_token: `${requestToken}`
            }
        });
    });
}
function criarSessao(this: any) {
    return __awaiter(this, void 0, void 0, function* () {
        let result:object = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
            method: "GET"
        });
        sessionId = result.session_id;
    });
}
function criarLista(this: any, nomeDaLista:string, descricao:string) {
    return __awaiter(this, void 0, void 0, function* () {
        let result:object = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: {
                name: nomeDaLista,
                description: descricao,
                language: "pt-br"
            }
        });
        console.log(result);
    });
}
function adicionarFilmeNaLista(this: any, filmeId:string, listaId:string) {
    return __awaiter(this, void 0, void 0, function* () {
        let result:object = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: {
                media_id: filmeId
            }
        });
        console.log(result);
    });
}
function pegarLista(this: any) {
    return __awaiter(this, void 0, void 0, function* () {
        let result:string = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
            method: "GET"
        });
        console.log(result);
    });
}
{ /* <div style="display: flex;">
  <div style="display: flex; width: 300px; height: 100px; justify-content: space-between; flex-direction: column;">
      <input id="login" placeholder="Login" onchange="preencherLogin(event)">
      <input id="senha" placeholder="Senha" type="password" onchange="preencherSenha(event)">
      <input id="api-key" placeholder="Api Key" onchange="preencherApi()">
      <button id="login-button" disabled>Login</button>
  </div>
  <div id="search-container" style="margin-left: 20px">
      <input id="search" placeholder="Escreva...">
      <button id="search-button">Pesquisar Filme</button>
  </div>
</div>*/
}
