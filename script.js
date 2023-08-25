const perguntas = [
    {
        pergunta: "Qual é a capital do Brasil?",
        opcoes: {
            a: "São Paulo",
            b: "Rio de Janeiro",
            c: "Brasília",
            d: "Belo Horizonte"
        },
        resposta: "c",
    },
    {
        pergunta: "De quem é a famosa frase “Penso, logo existo”?",
        opcoes: {
            a: "Platão",
            b: "Galileu Galilei",
            c: "Descartes",
            d: "Sócrates"
        },
        resposta: "c",
    },
    {pergunta: "De onde é a invenção do chuveiro elétrico?",
    opcoes: {
        a: "França",
        b: "Brasil",
        c: "Grécia",
        d: "Itália"
    },
    resposta: "b",
},
{pergunta: "Quem é o melhor jogador do mundo?",
    opcoes: {
        a: "Cristiano",
        b: "Messi",
        c: "Neymar",
        d: "Aubameyang"
    },
    resposta: "b",
},
];

const textoPergunta = document.getElementById("question-text");
const listaOpcoes = document.getElementById("options");
const botaoEnviar = document.getElementById("submit-answer");
const mensagem = document.getElementById("message");
const pontuacaoExibicao = document.getElementById("score");

let indicePerguntaAtual = 0;
let pontuacao = 0;
let chances = 2;

function mostrarPergunta(indice) {
    const perguntaAtual = perguntas[indice];
    textoPergunta.textContent = perguntaAtual.pergunta;
    listaOpcoes.innerHTML = "";

    Object.entries(perguntaAtual.opcoes).forEach(([chave, valor]) => {
        const li = document.createElement("li");
        li.className = "option";
        li.textContent = valor;
        li.setAttribute("data-option", chave);
        listaOpcoes.appendChild(li);
    });
}

function verificarResposta(opcaoSelecionada) {
    const perguntaAtual = perguntas[indicePerguntaAtual];
    if (opcaoSelecionada === perguntaAtual.resposta) {
        pontuacao += 10;
        mensagem.textContent = "Resposta correta!";
        indicePerguntaAtual++;
        if (indicePerguntaAtual < perguntas.length) {
            mostrarPergunta(indicePerguntaAtual);
        } else {
            textoPergunta.textContent = "Quiz concluído!";
            listaOpcoes.innerHTML = "";
            botaoEnviar.disabled = true;
            pontuacaoExibicao.textContent = `Pontuação: ${pontuacao}`;
        }
    } else {
        chances--;
        if (chances === 0) {
            mensagem.textContent = "Você perdeu suas chances! Voltando ao início...";
            indicePerguntaAtual = 0;
            pontuacao = 0;
            chances = 2;
            mostrarPergunta(indicePerguntaAtual);
        } else {
            mensagem.textContent = "Resposta incorreta. Tente novamente.";
        }
    }
}

listaOpcoes.addEventListener("click", (event) => {
    const opcaoSelecionada = event.target.getAttribute("data-option");
    if (opcaoSelecionada) {
        verificarResposta(opcaoSelecionada);
    }
});

mostrarPergunta(indicePerguntaAtual);
