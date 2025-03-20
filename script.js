const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');
let gravidade = 0.5;
let gameOver = false;
let ponto = 0
document.getElementById("highscore").innerHTML = localStorage.getItem("highscore")

document.addEventListener('keypress', (evento) => {
    if (evento.code == 'Space' && !gameOver && !personagem.pulando) {
        personagem.velocidade_y = 15;
        personagem.pulando = true;
    }

    if (evento.code == 'KeyR' && gameOver) {
        reiniciarJogo();
    }
});

const personagem = {
    x: 100,
    y: canvas.height - 50,
    largura: 50,
    altura: 50,
    velocidade_y: 0,
    pulando: false
};

const obstaculo = {
    x: 750,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidade_x: 3
};

function desenharPersonagem() {
    ctx.fillStyle = 'black';
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura
    );
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.y -= personagem.velocidade_y;
        personagem.velocidade_y -= gravidade;
        if (personagem.y >= canvas.height - 50) {
            personagem.velocidade_y = 0;
            personagem.y = canvas.height - 50;
            personagem.pulando = false;
        }
    }
}

function desenharObstaculo() {
    ctx.fillStyle = 'green';
    ctx.fillRect(
        obstaculo.x,
        obstaculo.y,
        obstaculo.largura,
        obstaculo.altura
    );
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidade_x;

    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidade_x += 0.5;
        let novaAltura = Math.random() * (150-90)+90;
        obstaculo.altura = novaAltura
        obstaculo.y = canvas.height - novaAltura
    }
}

function verificarColisao() {
    if (
        obstaculo.x < personagem.x + personagem.largura &&
        obstaculo.x + obstaculo.largura > personagem.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        obstaculo.velocidade_x = 0;
        ctx.fillStyle = 'black';
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER', 50, 100);
        ctx.font = '20px Arial';
        ctx.fillText('Press R to restart', 50, 120)
        gameOver = true;
    }
}

function reiniciarJogo() {
    ponto = 0
    document.getElementById("highscore").innerHTML = localStorage.getItem("highscore")

    gameOver = false;
    personagem.x = 100;
    personagem.y = canvas.height - 50;
    personagem.velocidade_y = 0;
    personagem.pulando = false;

    obstaculo.x = 750;
    obstaculo.velocidade_x = 7;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loop();
}

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenharPersonagem();
        atualizarPersonagem();
        desenharObstaculo();
        atualizarObstaculo();
        verificarColisao();
        requestAnimationFrame(loop);
        ponto += 1
        document.getElementById("ponto").innerHTML = ponto
    }   else{

    }

    if (localStorage.getItem("highscore")==null){
        localStorage.setItem("highscore", ponto)
    } else if (localStorage.getItem("highscore")<ponto){
        localStorage.setItem("highscore", ponto)
    }
    console.log(localStorage.getItem("highscore"))
    //salvar pontuação no local storage
    //mostrar melhor pontuação
}

loop();
