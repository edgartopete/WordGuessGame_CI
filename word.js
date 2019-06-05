var Letter = require("./letter.js");

function Word(answer) {
  //Letter objects array
  this.objArray = [];

  for (var i = 0; i < answer.length; i++) {
    var letter = new Letter(answer[i]);
    this.objArray.push(letter);
  }

  this.print = function() {
    answer = "";
    for (var i = 0; i < this.objArray.length; i++) {
      answer += this.objArray[i] + " ";
    }
    console.log(answer );
    console.log("\n**************************\n");
  };

  this.userGuess = function(input) {
    for (var i = 0; i < this.objArray.length; i++) {
      this.objArray[i].guess(input);
    }
  };
}

module.exports = Word;