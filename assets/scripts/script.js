//Array de objetos contendo os produtos do carrinho
let produtosCarrinho = [
    {
        id: 1,
        img: '/assets//images/products/produto-1.png',
        nome: 'Pefume Kaiak',
        preço: 100
    },
    {
        id: 2,
        img: '/assets//images/products/produto-2.png',
        nome: 'Pefume Humor',
        preço: 80
    },
    {
        id: 3,
        img: '/assets//images/products/produto-3.png',
        nome: 'Hidratante',
        preço: 50
    },
    {
        id: 4,
        img: '/assets//images/products/produto-4.png',
        nome: 'Sabonetes',
        preço: 150
    },
    {
        id: 5,
        img: '/assets//images/products/produto-5.png',
        nome: 'Shampoo',
        preço: 70
    },
    {
        id: 6,
        img: '/assets//images/products/produto-6.png',
        nome: 'Sabonete Liquido',
        preço: 300
    }
]

let modalQuantidade = 1
let cart = []
let modalKey = 0


const q = (el) => document.querySelector(el) //retorna o item
const all = (el) => document.querySelectorAl(el) //retorna um array com todos os itens

//Mapeando o array
produtosCarrinho.map((item, index) => {
    let produtoItem = q('#produtos-teste #container-produtos').cloneNode(true)

    //Inserindo o index do array como a chave do produto (adicionar um atributo ao elemento e dando o valor do index)
    produtoItem.setAttribute('data-key', index)

    //Preenchendo a tela do carrinho com os produtos
    produtoItem.querySelector('.img-produto').src = item.img
    produtoItem.querySelector('.nome-produto').innerHTML = item.nome
    produtoItem.querySelector('.preco-produto').innerHTML = `R$ ${item.preço.toFixed(2)} `

    //Pegando o index do produto que foi clicado, para colocar no modal
    produtoItem.querySelector('.button-addcarrinho ').addEventListener('click', (e) => {
        let key = e.target.closest('#container-produtos').getAttribute('data-key')

        //Resetando a quantidade para 1 e colocando na tela, sempre que o modal é aberto
        modalQuantidade = 1
        q('#quantidade-produto').innerHTML = modalQuantidade

        //Atribuindo à variavel, o index do produto que foi clicado (assim coseguimos acessar as propriedades do array de produtos)
        modalKey = key

        //Preenchendo o modal com as informações do produto que foi clicado
        q('#header-modalAdicionarItem p').innerHTML = produtosCarrinho[key].nome
        q('#header-modalAdicionarItem #preco').innerHTML = `R$ ${produtosCarrinho[key].preço.toFixed(2)}`
        q('#body-modalAdicionarItem img').src = produtosCarrinho[key].img
        q('#body-modalAdicionarItem p').innerHTML = `R$ ${produtosCarrinho[key].preço.toFixed(2)}`
    })

    q('#quantidade-produto').innerHTML = modalQuantidade

    document.querySelector('.produto-area').append(produtoItem)
})

//Aumentar quantidade dos produtos
q('#quantidade-mais').addEventListener('click', () => {
    modalQuantidade++ //Incrementando 1 na quantidade, sempre que o usuario clica no +

    //Colocando na tela a quantidade atualizada
    q('#quantidade-produto').innerHTML = modalQuantidade

    //Calculando o novo preço, a partir da quantidades de itens
    let novoPreco = (produtosCarrinho[modalKey].preço * modalQuantidade)

    //Substituindo em tela o preço antigo pelo preço novo 
    q('#body-modalAdicionarItem p').innerHTML = `R$ ${novoPreco.toFixed(2)}`
})

//Diminuir quantidade dos produtos
q('#quantidade-menos').addEventListener('click', () => {

    if (modalQuantidade > 1) {
        modalQuantidade--

        //Colocando na tela a quantidade atualizada
        q('#quantidade-produto').innerHTML = modalQuantidade
    }

    //Calculando o novo preço, a partir da quantidades de itens
    let precoFinal = produtosCarrinho[modalKey].preço * modalQuantidade

    q('#body-modalAdicionarItem p').innerHTML = `R$ ${precoFinal.toFixed(2)}`
})

//Adicionando itens ao carrinho (CORRIGIR)
q('#button-addaocarrinho').addEventListener('click', () => {
    //Criando um identificador para o produto
    let identifier = produtosCarrinho[modalKey].id

    //Buscando no carrinho se tem algum item que já tem o mesmo identifier do produto que foi adicionado. (Se NÃO tiver ele retorna -1)
    let validarIdentificador = cart.findIndex((item => item.identifier == identifier))

    //Se tiver, aumenta apenas a quantidade do produto
    if (validarIdentificador > -1) {
        cart[validarIdentificador].qt += modalQuantidade

        // Se NãO tiver, adiciona o produto ao carrinho
    } else {
        cart.push({
            identifier,
            id: produtosCarrinho[modalKey].id,
            qt: modalQuantidade
        })
    }

    updateCart()
})

function updateCart() {
    if (cart.length > 0) {
        q('#carrinho-area').classList.remove('hide')
        q('#carrinho-area').innerHTML = '' //zerando o que vai aparecer a cada vez que começa, pros itens anteriores nao serem repetidos

        let subtotal = 0
        let desconto = 0
        let total = 0

        for (let i in cart) {
            //Encontrando no carrinho o produto pelo id
            let produtoItem = produtosCarrinho.find((item) => item.id == cart[i].id)

            subtotal += produtoItem.preço * cart[i].qt

            let cartItem = q('#carrinho-style #produtos-carrinho-area').cloneNode(true)
            cartItem.querySelector('.img-produto-carrinho').src = produtoItem.img
            cartItem.querySelector('.nome-produto-carrinho').innerHTML = produtoItem.nome
            cartItem.querySelector('.preco-produto-carrinho').innerHTML = `R$ ${produtoItem.preço.toFixed(2)}`
            cartItem.querySelector('.quantidade').innerHTML = cart[i].qt

            cartItem.querySelector('#qt-menos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--
                } else {
                    cart.splice(i, 1)
                }
                updateCart()
            })
            cartItem.querySelector('#qt-mais').addEventListener('click', () => {
                cart[i].qt++
                updateCart()
            })

            document.querySelector('#carrinho-area').append(cartItem)
        }

        total = subtotal

        q('#total-carrinho').innerHTML = `TOTAL: R$${total.toFixed(2)}`

    

    } else {
        q('#carrinho-area').classList.add('hide')
    }
}

//Eventos de abrir e fechar o modal, assim como o de fechar o modal clicando no fade
const fade = document.querySelector('#fade')
const modal = document.querySelector('#modalAdicionarItem')
const buttonFecharModal = document.querySelector('#modalAdicionarItem')
const buttonaddAoCarrinhho = q('#button-addaocarrinho')

function adicionarAoCarrinho() {
    modal.classList.toggle('hide')
    fade.classList.toggle('hide')
}

fade.addEventListener("click", () => {
    buttonFecharModal.classList.toggle('hide')
    fade.classList.toggle('hide')
})

function fecharModal() {
    buttonFecharModal.classList.toggle('hide')
    fade.classList.toggle('hide')
}

function addAoCarrinhho() {
    modal.classList.toggle('hide')
    fade.classList.toggle('hide')
}

