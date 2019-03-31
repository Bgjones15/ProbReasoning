window.onload = function(){

    var counter = 0;
    var openCounter = 0;
    
    var transition = [[0,1/2,1/2,0,0,0,0],[1,0,0,0,0,0,0],[1/2,0,0,0,1/2,0,0],[0,0,0,0,0,0,1],[0,0,1/2,0,0,1/2,0],[0,0,0,0,1/2,0,1/2],[0,0,0,1/2,0,1/2,0]];
    
    var observed = new Array();
    observed[0] = new Array();
    observed[0,0] = new Array();
    observed[0,0,0] = "hello";
    
    var blocks = document.getElementsByTagName("td");
    Array.from(blocks).forEach(function(elem){
        if(elem.className!="wall"){
            elem.id = counter++;
        }
    });
    observed = new Array(16);
    for(var i = 0; i<16; i++){
        observed[i] = new Array(7);
    }
    
    console.log(transition);
    console.log(observed);
    
    
    var submit = document.getElementById("submit");
    submit.onclick = function(){
        var input = document.getElementById("inputText").value.toUpperCase().split(" ");
        console.log(input);
    }
    
};