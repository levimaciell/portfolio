const command_line = document.getElementById("input_field");

console.log(command_line);

command_line.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        command_line.value = "";
        console.log("Enter was pressed");
    }
});

