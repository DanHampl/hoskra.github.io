let axiom = "F";
let sentence = axiom;

let rules = [];

rules[0] = {
    a: "F",
    b: "FF+[+F-F-F]-[-F+F+F]"
}

// rules[1] = {
//     a: "B",
//     b: "A"
// }

let display;
let canvas;

function cl(what) {
    return console.log(what);
}

function turtle() {
    for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);

        if(current == "F") {

        } else if(current == "-") {

        } else if(current == "[") {

        } else if(current == "]") {

        }

    }
}

function generate() {
    let nextSentence = "";
    for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);
        let found = false;

        for (let j = 0; j < rules.length; j++) {
            if (current == rules[j].a) {
                found = true;
                nextSentence += rules[j].b;
                break;
            }
        }

        if (!found) {
            nextSentence += current;
        }
    }
    sentence = nextSentence;
    display.append("<p>" + sentence + "</p>");
}

$(document).ready(() => {
    display = $("#display");
    display = $("#canvas");
    $("#generate").on("click", () => {
        generate();
    })

    generate();
    generate();
    generate();
    generate();
    generate();
    generate();
});