const main_content = document.getElementById("main__block");
let command_block = document.getElementById("command__block");
let command_line = command_block.childNodes[3].childNodes[5];
command_line.addEventListener("keypress", handleEnterPress);

document.addEventListener("keydown", (e)=>{
    if(e.ctrlKey && e.key === "l"){
        handleClear();
    }
});

function handleClear(e){

    const header = document.getElementById("headerId");

    if(header != undefined){
        header.remove();
    }
    
    removeAllChildNodes(main_content);

    main_content.appendChild(command_block);
}

function handleEnterPress(e){
    if(e.key === "Enter"){

        /*Handle Output*/
        output(command_block, command_line.innerHTML);

        /*Creating copy of div and adding*/
        const clone = command_block.cloneNode(true);
        main_content.appendChild(clone);

        /*Adding and removing the event listener*/
        cleanEventListenerAndInput(clone);
        cleanOutput(clone);

        command_block = clone;
    }

    else if(e.ctrlKey && e.key === "l"){
        handleClear();
    }
}

function cleanEventListenerAndInput(clonedBlock){
    const cloneInput = clonedBlock.childNodes[3].childNodes[5];
    command_line.removeEventListener('keypress', arguments.callee);
    cloneInput.addEventListener("keypress", handleEnterPress);
    cleanInput(cloneInput);
}

function cleanInput(cloneInput){
    cloneInput.innerHTML = "";
    command_line.removeAttribute("contenteditable");
    cloneInput.setAttribute("contenteditable", "true");
    command_line = cloneInput;
}

function cleanOutput(clone){
    removeAllChildNodes(clone.childNodes[5]);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createElement(tagname, classname){
    const newTag = document.createElement(tagname);
    if(classname != undefined){
        newTag.classList.add(classname);
    }
    return newTag;
}

function cleanString(command){
    command = command.replaceAll("&nbsp;", "");
    command = command.replaceAll("&nbsp; ", "");
    command = command.trim();
    return command;
}

function output(block, command){
    const divOutput = block.childNodes[5];
    
    command = cleanString(command);
    let args = command.split(" ");

    switch(args[0]){
        case "":
            break;
        case "help":
            helpHandle(divOutput);
            break;
        case "smedia":
            smediaHandle(divOutput);
            break;
        case "exit":
            exitHandle();
            break;
        case "reload":
            window.location.reload();
            break;
        case "projects":
            projectsHandle(divOutput, args);
            break;
        case "whoami":
            whoamiHandle(divOutput);
            break;
        default:
            defaultHandle(divOutput, command);
            break;
    }
}


function defaultHandle(block, command){
    const defaultAnswer = document.createElement('p');
    defaultAnswer.innerHTML = `Comando "${command}" não foi encontrado`;
    defaultAnswer.classList.add("command__text__terminal");
    block.appendChild(defaultAnswer);
}

function helpHandle(divOutput){
    const commandList = [
        "smedia -> exibe as redes sociais",
        "exit -> voltar para a página inicial",
        "projects -> listar principais projetos",
        "whoami -> sobre usuário atual",
        "sobre -> sobre levi",
        "reload -> recarrega a página",
        "color -> muda cor das letras da página"
    ]
    const explainParagraph = createElement("p", "command__text__terminal");
    explainParagraph.innerHTML = "Comandos:"
    divOutput.appendChild(explainParagraph);

    const commandUl = createElement("ul", "command__text__ul");

    for(let i = 0; i < commandList.length; i++){
        const li = createElement("li", "command__text__terminal");
        li.innerHTML = commandList[i];
        commandUl.appendChild(li);
    }

    const help1 = createElement("p", "command__text__terminal");
    help1.innerHTML = "Clique na tela ou pressione tab para usar o terminal";
    const help2 = createElement("p", "command__text__terminal");
    help2.innerHTML = "Digite help para ver a lista de comandos disponiveis";

    divOutput.appendChild(commandUl);
    divOutput.appendChild(help1);
    divOutput.appendChild(help2);
}

function smediaHandle(divOutput){
    const linkGithub = createElement("a", "command__link");
    const gitImg = createElement("img");
    gitImg.setAttribute("src", "../assets/github-logo-white.png");

    linkGithub.setAttribute("target", "__blank");
    linkGithub.appendChild(gitImg);
    linkGithub.setAttribute("href", "https://github.com/levimaciell");

    const linkLinkedin = createElement("a", "command__link");
    const linkedinImg = createElement("img");
    linkedinImg.setAttribute("src", "../assets/linkedin-branc.png");

    linkLinkedin.setAttribute("target", "__blank");
    linkLinkedin.appendChild(linkedinImg);
    linkLinkedin.setAttribute("href", "https://linkedin.com/in/levi-maciel");
    
    divOutput.appendChild(linkGithub);
    divOutput.appendChild(linkLinkedin);
}

function exitHandle(){
    window.location.assign("./../index.html")
}

function projectsHandle(divOutput, args){

    if(args.length === 1){
        const projectsList = [
            "MatrixCrypt -> Site que criptografa e descriptografa textos. Utiliza as tecnologias HTML, CSS e Javascript",
            "FeedApi -> API que dá suporte a um sistema de feed de noticias. Utiliza as tecnologias Java, Springboot e PostgreSQL"
        ]
    
        const projectsUl = createElement("ul", "command__text__ul");
    
        for(let i = 0; i < projectsList.length; i++){
            const li = createElement("li", "command__text__terminal");
            li.innerHTML = projectsList[i];
            projectsUl.appendChild(li);
        }
        
        divOutput.appendChild(projectsUl);
        const info = createElement("p", "command__text__terminal");
        info.innerHTML = "Digite projects com o projeto que deseja ver para ser redirecionado!";
        divOutput.appendChild(info);
    }
    else{
        args.shift();
    
        switch(args[0].toLowerCase()){
            case "matrixcrypt":
                window.location.assign("https://levimaciell.github.io/MatrixCrypt");
                break;
            case "feedapi":
                window.location.assign("https://github.com/levimaciell/feedApi");
                break;
            default:
                const inv = createElement("p", "command__text__terminal");
                inv.innerHTML = `Argumento inválido: ${args[0]}`
                divOutput.appendChild(inv);
                break;
        }
    }
}

function whoamiHandle(divOutput){
    const person = createElement("p", "command__text__terminal");
    person.innerHTML = "visitor";
    divOutput.appendChild(person);
}   

function excuse(divOutput, command){
    const defaultAnswer = document.createElement('p');
    defaultAnswer.innerHTML = `"${command}" será adicionado em uma atualização futura. Por favor, volte outra hora!`;
    defaultAnswer.classList.add("command__text__terminal");
    divOutput.appendChild(defaultAnswer);
}

