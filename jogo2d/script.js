const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

// let posicaoXPersonagem = 0
// let posicaoYPersonagem = 0
// let larguraPersonagem = 50
// let alturaPersonagem = 50
const personagem = {
    x: 100,
    y: 350,
    largura: 50,
    altura: 50
}
function desenharPersonagem() {
    ctx.fillStyle = 'black'
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura)
}
function atualizarPersonagem(){
    personagem.y -= 1
}

function loop() {
    desenharPersonagem()
    atualizarPersonagem()
    //apagar
    requestAnimationFrame(loop)
}

loop()