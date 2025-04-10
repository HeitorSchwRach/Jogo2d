const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');

let pontos = 0;
let teclaEsquerdaPressionada = false;
let teclaDireitaPressionada = false;

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') personagem.saltar();
    if (e.code === 'KeyA') teclaEsquerdaPressionada = true;
    if (e.code === 'KeyD') teclaDireitaPressionada = true;
    if (e.code === 'KeyR' && Jogo.gameOver) window.location.reload();
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyA') teclaEsquerdaPressionada = false;
    if (e.code === 'KeyD') teclaDireitaPressionada = false;
});

class Entidade {
    constructor(x, y, largura, altura, cor) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;
    }
    desenhar() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends Entidade {
    #velocidade_y;
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor);
        this.#velocidade_y = 0;
        this.pulando = false;
        this.imagem = new Image();
        this.imagem.src = './bon.png';
        this.velocidadeX = 5;
    }
    saltar() {
        if (!this.pulando) {
            this.#velocidade_y = 15;
            this.pulando = true;
        }
    }
    moverEsquerda() {
        this.x -= this.velocidadeX;
        if (this.x < 0) this.x = 0;
    }
    moverDireita() {
        this.x += this.velocidadeX;
        if (this.x + this.largura > canvas.width) this.x = canvas.width - this.largura;
    }
    atualizar() {
        if (!Jogo.gameOver) {
            if (teclaEsquerdaPressionada) this.moverEsquerda();
            if (teclaDireitaPressionada) this.moverDireita();
        }
        if (this.pulando) {
            this.y -= this.#velocidade_y;
            this.#velocidade_y -= Jogo.gravidade;
            if (this.y >= canvas.height - 50) {
                this.#velocidade_y = 0;
                this.y = canvas.height - 50;
                this.pulando = false;
            }
        }
    }
    verificarColisao(obstaculo) {
        if (obstaculo.x < this.x + this.largura &&
            obstaculo.x + obstaculo.largura > this.x &&
            this.y < obstaculo.y + obstaculo.altura &&
            this.y + this.altura > obstaculo.y) {
            obstaculo.pararObstaculo();
            this.#velocidade_y = 0;
            ctx.fillStyle = 'black';
            ctx.font = '50px Arial';
            ctx.fillText('GAME OVER', 300, 100);
            Jogo.gameOver = true;
        }
    }
    desenhar() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
}

class Obstaculo extends Entidade {
    constructor(x, y, largura, altura, velocidade) {
        super(x, y, largura, altura, 'green');
        this.velocidade_x = velocidade;
        this.imagem = new Image();
        this.imagem.src = './obs.png';
        this.marcadoParaRemover = false;
        this.contabilizado = false;
    }
    atualizar() {
        if (!Jogo.gameOver) {
            this.x -= this.velocidade_x;
        }
    }
    pararObstaculo() {
        this.velocidade_x = 0;
    }
    desenhar() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
}

class Jogo {
    static gravidade = 0.5;
    static gameOver = false;

    constructor() {
        this.personagem = new Personagem(100, canvas.height - 50, 50, 50, 'blue');
        this.obstaculos = [
            new Obstaculo(canvas.width + 100, canvas.height - 100, 50, 100, 3),
            new Obstaculo(canvas.width + 400, canvas.height - 120, 50, 120, 3),
            new Obstaculo(canvas.width + 700, canvas.height - 90, 50, 90, 3)
        ];
        this.loop = this.loop.bind(this);
        this.contadorFrames = 0;
    }

    loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.personagem.desenhar();
        this.personagem.atualizar();

        this.obstaculos.forEach(obstaculo => {
            obstaculo.desenhar();
            obstaculo.atualizar();
            this.personagem.verificarColisao(obstaculo);

            if (!obstaculo.contabilizado && obstaculo.x + obstaculo.largura < this.personagem.x) {
                pontos++;
                obstaculo.contabilizado = true;
            }
        });

        const primeiroObstaculo = this.obstaculos[0];
        if (primeiroObstaculo && primeiroObstaculo.x + primeiroObstaculo.largura < 0) {
            this.obstaculos = this.obstaculos.slice(1);
        }

        this.contadorFrames++;
        if (this.contadorFrames % 100 === 0 && this.obstaculos.length < 3) {
            const ultimoVelocidade = this.obstaculos.length > 0 ? this.obstaculos[this.obstaculos.length - 1].velocidade_x : 3;
            const novaVelocidade = ultimoVelocidade + 0.2;
            const altura = 90 + Math.random() * 30;
            const novoObstaculo = new Obstaculo(
                canvas.width + Math.random() * 200,
                canvas.height - altura,
                50,
                altura,
                novaVelocidade
            );
            this.obstaculos.push(novoObstaculo);
        }

        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Pontos: ${pontos}`, 10, 30);

        if (!Jogo.gameOver) {
            requestAnimationFrame(this.loop);
        }
    }
}

const jogo = new Jogo();
const personagem = jogo.personagem;
jogo.loop();
