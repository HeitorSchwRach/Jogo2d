//adicionar pontuação
//arrumar o problema de double jump
//privar a propriedade y do personagem
//Utilizar polimorisfomo e modificar a função e desenhar obstaculo e personagem com imagens personalizadas
//criar multiplos obstaculos
//fazer a tecla R reiniciar o jogo
//Arrumar a função atualizarColisão e pararObjeto

const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space') {
        personagem.saltar()
    }
})

class Entidade {
    constructor(x, y, largura, altura, cor) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor
    }
    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Personagem extends Entidade {
    #velocidade_y
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor)
        this.#velocidade_y = 0
        this.pulando = false
        
    }
    saltar() {
        this.#velocidade_y = 15;
        this.pulando = true;
    }
    atualizar() {
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
    verificarColisao() {
        if (jogo.obstaculo.x < this.x + this.largura &&
            jogo.obstaculo.largura + jogo.obstaculo.x > this.x &&
            this.y < jogo.obstaculo.y + jogo.obstaculo.altura &&
            this.y + this.altura > jogo.obstaculo.y) {
                pararObstaculo()
                this.#velocidade_y = 0
                ctx.fillStyle = 'Black'
                ctx.font = '50px Arial'
                ctx.fillText('GAME OVER', 300, 100)
               Jogo.gameOver = true
            
            }
    }
}


class Obstaculo extends Entidade {
    #velocidade_x
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor)
        this.#velocidade_x = 3
    }
    atualizar() {
        this.x -= this.#velocidade_x;
        if (this.x <= 0 - this.largura) {
            this.x = canvas.width;
            this.#velocidade_x += 1;
            let novaAltura = Math.random() * (150 - 90) + 90;
            this.altura = novaAltura
            this.y = canvas.height - novaAltura
        }
    }
    pararObstaculo(){
        this.#velocidade_x = 0
    }
};
class Jogo {
    static gravidade = 0.5
    static gameOver = false
    constructor() {
        this.personagem = new Personagem(100, canvas.height - 50, 50, 50, 'blue')
        this.obstaculo = new Obstaculo(canvas.width - 50, canvas.height - 100, 50, 100, 'red')
        this.loop = this.loop.bind(this)
    }
    loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.obstaculo.desenhar()
        this.personagem.desenhar()
        this.personagem.atualizar()
        this.obstaculo.atualizar()
        requestAnimationFrame(this.loop)
        this.personagem.verificarColisao()
        
    }
}


const jogo = new Jogo()
jogo.loop()

// const canvas = document.getElementById('jogoCanvas');
// const ctx = canvas.getContext('2d');

// document.addEventListener('keypress', (e) => {
//     if (e.code == 'Space') {
//         personagem.saltar();
//     }
//     if (e.code == 'KeyR') {
//         jogo.reiniciar();
//     }
// });

// class Entidade {
//     constructor(x, y, largura, altura, cor) {
//         this.x = x;
//         this.y = y;
//         this.largura = largura;
//         this.altura = altura;
//         this.cor = cor;
//     }
//     desenhar() {
//         ctx.fillStyle = this.cor;
//         ctx.fillRect(this.x, this.y, this.largura, this.altura);
//     }
// }

// class Personagem extends Entidade {
//     #y;
//     #velocidade_y;
//     constructor(x, y, largura, altura, cor) {
//         super(x, y, largura, altura, cor);
//         this.#y = y;
//         this.#velocidade_y = 0;
//         this.pulando = false;
//     }
//     saltar() {
//         this.#velocidade_y = 15;
//         this.pulando = true;
//     }
//     atualizar() {
//         if (this.pulando) {
//             this.#y -= this.#velocidade_y;
//             this.#velocidade_y -= Jogo.gravidade;
//             if (this.#y >= canvas.height - 50) {
//                 this.#velocidade_y = 0;
//                 this.#y = canvas.height - 50;
//                 this.pulando = false;
//             }
//         }
//     }
//     desenhar() {
//         ctx.fillStyle = this.cor;
//         ctx.fillRect(this.x, this.#y, this.largura, this.altura);
//     }
//     verificarColisao(obstaculos) {
//         for (let obstaculo of obstaculos) {
//             if (
//                 obstaculo.x < this.x + this.largura &&
//                 obstaculo.x + obstaculo.largura > this.x &&
//                 this.#y < obstaculo.y + obstaculo.altura &&
//                 this.#y + this.altura > obstaculo.y
//             ) {
//                 Jogo.gameOver = true;
//                 ctx.fillStyle = 'black';
//                 ctx.font = '50px Arial';
//                 ctx.fillText('GAME OVER', 300, 100);
//             }
//         }
//     }
// }

// class Obstaculo extends Entidade {
//     #velocidade_x;
//     constructor(x, y, largura, altura, cor) {
//         super(x, y, largura, altura, cor);
//         this.#velocidade_x = 3;
//     }
//     atualizar() {
//         if (!Jogo.gameOver) {
//             this.x -= this.#velocidade_x;
//             if (this.x <= 0 - this.largura) {
//                 this.x = canvas.width;
//                 Jogo.pontuacao++;
//                 this.#velocidade_x += 0.5;
//             }
//         }
//     }
// }

// class Jogo {
//     static gravidade = 0.5;
//     static gameOver = false;
//     static pontuacao = 0;
//     constructor() {
//         this.obstaculos = [
//             new Obstaculo(canvas.width - 50, canvas.height - 100, 50, 100, 'red'),
//             new Obstaculo(canvas.width + 200, canvas.height - 120, 50, 120, 'red')
//         ];
//         this.loop = this.loop.bind(this);
//         this.loop();
//     }
//     reiniciar() {
//         Jogo.gameOver = false;
//         Jogo.pontuacao = 0;
//         this.obstaculos.forEach(obstaculo => {
//             obstaculo.x = canvas.width + Math.random() * 300;
//         });
//         this.loop();
//     }
//     loop() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         personagem.desenhar();
//         personagem.atualizar();
//         this.obstaculos.forEach(obstaculo => {
//             obstaculo.desenhar();
//             obstaculo.atualizar();
//         });
//         personagem.verificarColisao(this.obstaculos);
//         ctx.fillStyle = 'black';
//         ctx.font = '20px Arial';
//         ctx.fillText(`Pontuação: ${Jogo.pontuacao}`, 10, 20);
//         if (!Jogo.gameOver) {
//             requestAnimationFrame(this.loop);
//         }
//     }
// }

// const personagem = new Personagem(100, canvas.height - 50, 50, 50, 'blue');
// const jogo = new Jogo();
