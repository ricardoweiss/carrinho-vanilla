const produtos = [
    {
        id: 'abc123',
        nome: 'JS Raiz para FW',
        preco: 300,
        descricao: 'Melhor curso do mundo1',
        imagem: 'https://loremflickr.com/500/300'
    },
    {
        id: 'abc321',
        nome: 'JS Raiz para Node',
        preco: 1200,
        descricao: 'Melhor curso do mundo2',
        imagem: 'https://loremflickr.com/500/300'
    },
    {
        id: 'abc456',
        nome: 'JS Raiz para Leigos',
        preco: 200,
        descricao: 'Melhor curso do mundo3',
        imagem: 'https://loremflickr.com/500/300'
    },
    {
        id: 'abc789',
        nome: 'JS Raiz para Pros',
        preco: 600,
        descricao: 'Melhor curso do mundo4',
        imagem: 'https://loremflickr.com/500/300'
    }
]

const carrinhoItens = {};


function renderizaProduto(produto, index) {
    return `<div class="col-sm-4 mb-3">
                        <div class="card">
                            <div class="card loja__item">
                                <img src="${produto.imagem}" alt="" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">${produto.nome}</h5>
                                    <small>${produto.preco}</small>
                                    <p class="card-text">${produto.descricao}</p>
                                    <button data-index="${index}" class="btn btn-primary btn-add">Adicionar</button>
                                </div>
                            </div>
                        </div>
                    </div>`
}


function renderizaProdutos() {
    let html = '';
    for (let i = 0; i < produtos.length; i++) {
        html += renderizaProduto(produtos[i], i)
    }
    return html;
}

function renderizaItemCarrinho(produtoCarrinho) {
    return `<div class="card carrinho__item">
                <div class="card-body">
                    <h5 class="card-title">${produtoCarrinho.nome}</h5>
                    <p class="card-text">Preço unidade: R$${produtoCarrinho.preco},00 | Quantidade: ${produtoCarrinho.quantidade}</p>
                    <p class="card-text">Valor: R$${produtoCarrinho.preco * produtoCarrinho.quantidade},00</p>
                    <button data-produto-id="${produtoCarrinho.id}" class="brn btn-danger btn-sm btn-remove">Remover</button>
                </div>
            </div>`
}


function renderizaCarrinho() {
    let html = '';
    for (let produtoId in carrinhoItens) {
        html += renderizaItemCarrinho(carrinhoItens[produtoId])
    }

    document.querySelector('.carrinho-itens').innerHTML = html;
}


function renderizaCarrinhoTotal() {
    let total = 0
    for (let produtoId in carrinhoItens) {
        total += carrinhoItens[produtoId].quantidade * carrinhoItens[produtoId].preco;
    }

    total === 0 ?
        document.querySelector('.carrinho-total').innerHTML = `<h6>Carrinho Vazio</h6>` :
        document.querySelector('.carrinho-total').innerHTML = `<h6>Total: <strong>R$ ${total},00</strong></h6>`
}


function adicionaItemCarrinho(produto) {
    if (!carrinhoItens[produto.id]) {
        carrinhoItens[produto.id] = produto;
        carrinhoItens[produto.id].quantidade = 0;
    }

    carrinhoItens[produto.id].quantidade++


    renderizaCarrinho();
    renderizaCarrinhoTotal();
}

function removeItemCarrinho(elemento) {
    const produtoId = elemento.getAttribute('data-produto-id');

    carrinhoItens[produtoId].quantidade <= 1 ?
        delete carrinhoItens[produtoId] : carrinhoItens[produtoId].quantidade--
    
    
    
    renderizaCarrinho();
    renderizaCarrinhoTotal();
}


document.body
    .addEventListener('click', (event) => {
        const elemento = event.target;

        if (elemento.classList.contains('btn-add')) {
            const index = parseInt(elemento.getAttribute('data-index'));
            const produto = produtos[index];

            adicionaItemCarrinho(produto);

        }

        if (elemento.classList.contains('btn-remove')) {
            removeItemCarrinho(elemento);
        }

    })


document.querySelector('.loja').innerHTML = renderizaProdutos(produtos);
