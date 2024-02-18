const main_content = document.getElementById("main__block");
let command_block = document.getElementById("command__block");
let command_line = command_block.childNodes[3].childNodes[5];
command_line.addEventListener("keypress", handleEnterPress);

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

function output(block, command){
    const divOutput = block.childNodes[5];

    switch(command){
        case "help":
            helpHandle(divOutput, command);
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

function helpHandle(divOutput, command){
    excuse(divOutput, command);
}

function excuse(divOutput, command){
    const defaultAnswer = document.createElement('p');
    defaultAnswer.innerHTML = `"${command}" está na lista de comandos, mas estamos enfrentando problemas. Volte outra hora :(`;
    defaultAnswer.classList.add("command__text__terminal");
    divOutput.appendChild(defaultAnswer);
}
