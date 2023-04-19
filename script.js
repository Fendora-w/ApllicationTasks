class Agenda {

    constructor(){
        this.li;
        this.rodape = document.querySelector("#empty-tasks");
        this.listaOrdenada = document.querySelector('.task-hide');
        this.container = document.querySelector('.task-hide');
        this.addBtn = document.querySelector('#add');
        this.tarefa = document.querySelector('#task');
    }
    
    //Altera o valor da propriedade li 
    set(li){
        this.li = li;
    }
    
    //Cria tag do Icone da lixeira
    criaIconeLixeira(){
        const lx = document.createElement('lixeira');
        lx.className = 'lx';
        const i = document.createElement('i');
        i.className = 'fa fa-trash hide';
        i.id = 'lixeira'
        lx.appendChild(i)
        this.li.appendChild(lx)  
       
    }

    //Cria tag do Icone do checkout
    criaIconeCheckout() {
       
        const i = document.createElement('i');
        i.id = 'icone'
        i.className = 'fa fa-check';
        this.li.appendChild(i)

    }
    
    //Cria a tag span
    criaTagSpan(){
        const addTaks = document.createElement('span');
        addTaks.textContent = this.tarefa.value.toUpperCase().trim();
        this.li.appendChild(addTaks);
        this.container.appendChild(this.li);

    }

}



const ag = new Agenda();

const filhos = ag.listaOrdenada.children

   
//Bloco de ação adicionar as tarefas
ag.addBtn.addEventListener('click', function(e) {

    e.preventDefault()
    
    //Bloco testa se campo input está vazio ou não
    try {
        if(ag.tarefa.value == ''){
           throw new Error()
        }
    }catch(erro){
        console.log('Campo de texto vazio')
        return
    }
    
    //Bloco verifica se existe algum valor digitado repetido pelo usuário
    try {
        for(let i=0; i < filhos.length; i++){
            const item = filhos[i]
            const listTextSpan = item.querySelector('span')
            if(ag.tarefa.value.toUpperCase().trim() === listTextSpan.textContent){
                ag.tarefa.value = ''
                throw new Error()
            }
            
        }
    }catch(erro){
        console.log('Valor tarefa já existe')
        return
    }
   
    
    //cria elmento li
    const li = document.createElement('li')
    ag.set(li)
   
    //Cria o icone de checkout
    ag.criaIconeCheckout()
   
    //cria a tag
    ag.criaTagSpan()
    
    //cria icone de Lixeira
    ag.criaIconeLixeira()

    //Limpa o campo de adicionar tarefas
    ag.tarefa.value = '';
    
    //Desabilita o rodape Não há tarefas cadastradas.
    if(ag.tarefa.value.toUpperCase().trim() == ''){
        ag.rodape.style.display = 'none'
    }

})




//Bloco apaga o itens do botão lixeira.
//Acessa lista filhos da tag ol tarefas
const itensLista = ag.listaOrdenada.children;

ag.listaOrdenada.addEventListener('mouseover', function() {
   
    for(let i = 0; i < itensLista.length; i++){
        // console.log(itensLista[i].id)
        const item = itensLista[i]
        const tagLixeira = item.querySelector('lixeira')
        const idLixeira = item.querySelector('#lixeira')
        const icone = item.querySelector('#icone')
        
        //Bloco de ação click sobre icone de Checkout
        //altera a cor do icone     
        icone.addEventListener("click", function() {
            icone.style.color = "#0DD657";
            icone.style.borderColor = "#0DD657";
            idLixeira.style.display = "inline";
        });
        
        //Bloco de ação de lixeira ícone apaga tags <li> das tarefas
        tagLixeira.addEventListener('click', function(){

            tagLixeira.remove()
            item.remove()

            //Reabilita o radape novamente
            if(itensLista.length <= 0){
                ag.rodape.style.display = 'block'
            }
                
        })     
    }
    
    
})






