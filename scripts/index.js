botao = document.getElementById('botao');
conteudo = document.getElementById('links');

document.addEventListener('DOMContentLoaded', function(){


    botao.addEventListener('click', function(event){
        event.preventDefault();

        if(conteudo.style.display === 'block'){
            conteudo.style.display = 'none';
        }
        else{
            conteudo.style.display = 'block';
        }
    });
});

