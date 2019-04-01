window.onload = function () {

    var counter = 0;
    var openCounter = 0;
    var bitInput = 0;

    var blocks = document.getElementsByTagName("td");
    Array.from(blocks).forEach(function (elem) {
        if (elem.className != "wall") {
            elem.id = counter++;
        }
    });

    var transition = [[0, 1 / 2, 1 / 2, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [1 / 2, 0, 0, 0, 1 / 2, 0, 0], [0, 0, 0, 0, 0, 0, 1], [0, 0, 1 / 2, 0, 0, 1 / 2, 0], [0, 0, 0, 0, 1 / 2, 0, 1 / 2], [0, 0, 0, 1 / 2, 0, 1 / 2, 0]];

    var locations = [[1, 1, 0], [1, 0, 1], [1, 1, 1]];

    var observed = new Array(16);
    for (var i = 0; i < 16; i++) {
        observed[i] = new Array(7);
    }
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 7; j++) {
            observed[i][j] = new Array(7);
        }
    }
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 7; j++) {
            for(k =0; k< 7; k++){
                observed[i][j][k] = 0;
            }
        }
    }
    console.log("Here "+math.multiply(math.matrix(locations),locations));
    var actual = new Array(7);
    actual = initialize_actual(locations);

    console.log(transition);
    console.log(observed);


    var submit = document.getElementById("submit");
    var temp;
    
    var previous = new Array(7);
    for (var i = 0; i < 7; i++) {
        previous[i] = new Array(7);
    }
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            previous[i][j] = 0;
        }
        previous[i][i] = 1/7;
    }
    console.log(previous);
    
    submit.onclick = function () {
        var input = document.getElementById("inputText").value.toUpperCase().split(" ");
        input.forEach(function (elem) {
            if (elem.includes("N")) {
                bitInput += 8;
            }
            if (elem.includes("S")) {
                bitInput += 4;
            }
            if (elem.includes("E")) {
                bitInput += 2;
            }
            if (elem.includes("W")) {
                bitInput += 1;
            }
            console.log(bitInput);
            update_sensor_model(bitInput, 0.15, observed, actual);
            console.log(observed)
            temp = math.multiply(math.transpose(math.matrix(transition)), previous).valueOf();
            console.log(temp);
            previous = math.multiply(math.matrix(observed[bitInput]), temp).valueOf();
            normalize(previous);
            console.log(previous);
            bitInput = 0;
            
        });
    }

};

function initialize_actual(given_locations) {

    var return_actual = new Array(7);
    var counter = 0;

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (given_locations[i][j] == 1) {
                return_actual[counter] = 0;
                if ((i - 1) != -1 && given_locations[i - 1][j] == 1) {
                    return_actual[counter] += 8;
                }
                if ((i + 1) != 3 && given_locations[i + 1][j] == 1) {
                    return_actual[counter] += 4;
                }
                if ((j + 1) != 3 && given_locations[i][j + 1] == 1) {
                    return_actual[counter] += 2;
                }
                if ((j - 1) != -1 && given_locations[i][j - 1] == 1) {
                    return_actual[counter] += 1;
                }
                counter++;
            }
        }
    }
    return return_actual;
}

function update_sensor_model(obs, error, observation, actual) {

    console.log(observation);
    var xor = 0;
    var correct = 0;

    for (var i = 0; i < 7; i++) {
        xor = (obs ^ actual[i]).toString(2);
        correct = 4 - (xor.match(/1/g) || []).length;
        observation[obs][i][i] = ((1 - error) ** correct) * (error ** (4 - correct));
    }
}

function normalize(matrix){
    
    console.log(matrix);
    var total = 0;
    for (var i = 0; i < 7; i++){
        total += matrix[i][i];
    }
    for (var i = 0; i < 7; i++){
        matrix[i][i] = matrix[i][i]/total;
    }
    
}