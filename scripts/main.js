const command_line = document.getElementById("input_field");
const main_content = document.getElementById("main__content");
const command_block = document.getElementById("command__block");

command_line.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        command_line.value = "";
        console.log("Enter was pressed");
        const copycat = command_block.cloneNode(true);
        main_content.appendChild(copycat);
    }
});

