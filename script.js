
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
    criaIconeLixeira(id){
        const lx = document.createElement('lixeira');
        lx.className = 'lx';
        const i = document.createElement('i');
        i.className = 'fa fa-trash hide';
        i.id = 'lixeira'
        i.setAttribute('onclick', `lixeira('${id}')`)
        lx.appendChild(i)
        this.li.appendChild(lx)  
   
    }

    //Cria tag do Icone do checkout
    criaIconeCheckout(id) {
    
        const i = document.createElement('i');
        i.id = 'icone';
        i.className = 'fa fa-check';
        i.setAttribute('onclick', `checkout('${id}')`);
        this.li.appendChild(i);

    }
    
    //Cria a tag span
    criaTagSpan(){
        const addTaks = document.createElement('span');
        addTaks.textContent = this.tarefa.value.toUpperCase().trim();
        this.li.appendChild(addTaks);
        this.container.appendChild(this.li);

    }


    //cria Icone editar Tarefa
    criaIconeEditar(id){
        const i = document.createElement('i')
        i.className = "fas fa-edit"
        i.id = `${id}`
        this.li.appendChild(i)
    
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
            // console.log(filhos)
            const listTextSpan = item.querySelector('span')
            // console.log(ag.tarefa.value.toUpperCase().trim())
            console.log(listTextSpan)
            if(listTextSpan && ag.tarefa.value.toUpperCase().trim() === listTextSpan.innerText){
                ag.tarefa.value = ''
                throw new Error()
            }
            
        }
    }catch(erro){
        console.log(erro)
        return
    }
   
   
    //cria elmento li
    const li = document.createElement('li')
    //cria id de identificar da tag li
    const timestamp = Date.now();
    const id = `li-${timestamp}`;
    li.setAttribute('id', id);
    ag.set(li)

    //cria o icone editar tarefa
    ag.criaIconeEditar(id)

    //Cria o icone de checkout
    ag.criaIconeCheckout(id)
   
    //cria a tag span adicionar tarefa
    ag.criaTagSpan()
    
    //cria icone de Lixeira
    ag.criaIconeLixeira(id)
    
    
    //Limpa o campo de adicionar tarefas
    ag.tarefa.value = '';
    
    //Desabilita o rodape Não há tarefas cadastradas.
    if(ag.tarefa.value.toUpperCase().trim() == ''){
        ag.rodape.style.display = 'none'
    }

})



//Acessa lista filhos da tag ol tarefas
const itensLista = ag.listaOrdenada.children;

//Lixeira apaga a tarefa 
function lixeira(id){
   
  const item = document.getElementById(id)
  
  //remove a tarefa realizada
  if(item){
    item.remove()
  }

  //Reabilita o radape novamente
 if(itensLista.length <= 0){
    ag.rodape.style.display = 'block'
 }

 

}


//Checkout da tarefa realizada com sucesso
function checkout(id){

    const item = document.getElementById(id)
    
    if(item){
         
        const icone = item.querySelector('#icone')
        const idLixeira = item.querySelector('#lixeira')
        const btnEditar = item.querySelector('.fa-edit')

        icone.style.color = "#0DD657";
        icone.style.borderColor = "#0DD657";
        idLixeira.style.display = "inline";
        btnEditar.remove()
    }

}

//manipular tarefa editar
//codigo atualizado
ag.listaOrdenada.addEventListener('click', function(evento) {
    const elementoClicado = evento.target;
    
    if (elementoClicado.className === 'fas fa-edit' || elementoClicado.className === 'task') {
        
        for (let i = 0; i < itensLista.length; i++) {
            const item = itensLista[i];
            
            if (elementoClicado.id === item.id) {

                const span = item.querySelector('span');
                const originalText = span.textContent
                console.log(originalText)
                
                
                const li = document.createElement('li');
                const input = document.createElement('input');
                const button = document.createElement('button');
                const i = document.createElement('i');
                
                li.id = item.id;
                input.id = 'task';
                input.name = 'task';
                input.type = 'text';
                input.style.marginRight = '4px';
                input.value = originalText;
                
                i.className = 'fa fa-plus';
                button.type = 'submit';
                button.id = 'add';
                button.appendChild(i);
                
                button.addEventListener('click', function() {
                    const newText = document.createTextNode(input.value.toUpperCase().trim());
                    span.textContent = ''; // Limpa o conteúdo atual do <span>
                    span.appendChild(newText); // Adiciona o novo valor como um nó de texto
                    li.removeChild(input);
                    li.removeChild(button);
                });
                
                li.appendChild(input);
                li.appendChild(button);
                
                item.parentNode.insertBefore(li, item.nextSibling); // Insere após o item atual
            }
        }
    }
});


  




