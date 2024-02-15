const main_content = document.getElementById("main__block");
let command_block = document.getElementById("command__block");
let command_line = command_block.childNodes[3].childNodes[5];
console.log(command_block.childNodes[3].childNodes[5])
command_line.addEventListener("keypress", handleEnterPress);

function handleEnterPress(e){
    if(e.key === "Enter"){
        /*Creating copy of div and adding*/
        const clone = command_block.cloneNode(true);
        main_content.appendChild(clone);

        /*Adding and removing the event listener*/
        cleanEventListenerAndInput(clone);
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
