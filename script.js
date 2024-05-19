const form = document. querySelector('form');
form. addEventListener('submit', function(event) {
event. preventDefault();
});


var boxall = document.getElementById('hidescrollbar');
var readygo = false;
function about(){
  unseewords();
  document.getElementById("scrollbar").innerHTML = "This Application is for the compliance of our subject HCI101 <br> Made by Canoy, Dupay, & Tabigne <br> Submitted to Sir Wilz<br>Source Code: <a style='color: black' href='https://github.com/frannytabigs/dictionary' target='/'>https://github.com/frannytabigs/dictionary (Click Me!)</a><br>Contact Us through <a href='https://www.facebook.com/franny.bolantoy' target='/' style='color: black' >FB! (Click Me!)</a>";
  stop =  document.getElementById("scrollbar").innerHTML;
}
function httpGet(url) {
const xhr = new XMLHttpRequest();
xhr.open("GET", url, false); 
xhr.send();
return xhr.responseText;
}

function dictionary(word){
  const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  try {var raw = httpGet(api+word);} catch(error){alert("An error occured!\n Try again or contact the owner");alert(error);}
  var jsonResponse = JSON.parse(raw);
  console.log(jsonResponse);





  var content = word.toUpperCase() + "\n";
  var partOfSpeech = {};
  var examples = [];
  var synonyms = [];
  var antonyms = [];

  for (var data of jsonResponse) {
    if (data.phonetic && !content.includes(data.phonetic)) {
      content += data.phonetic + "\n";
    }

    if (data.antonyms) {
      synonyms.push(...data.antonyms);
    }

    if (data.synonyms) {
      synonyms.push(...data.synonyms);
    }

    for (var meaning of data.meanings) {
      if (!partOfSpeech[meaning.partOfSpeech]) {
        partOfSpeech[meaning.partOfSpeech] = [];
      }
      synonyms.push(...meaning.synonyms);
      antonyms.push(...meaning.antonyms);
      for (var definition of meaning.definitions) {
        var currentDefinition = definition.definition;
        synonyms.push(...definition.synonyms);
        antonyms.push(...definition.antonyms);
        partOfSpeech[meaning.partOfSpeech].push(currentDefinition);
        examples.push(definition.example);
      }
    }

    let aysy = "";
    if (synonyms.length) {
      aysy += "Synonyms: ";
      var uniqueSynonyms = new Set(synonyms);
      for (var synonym of uniqueSynonyms) {
        aysy += synonym + ", ";
      }
      aysy = aysy.slice(0, -2) + "\n";
    }

    if (antonyms.length) {
      aysy += "Antonyms: ";
      var uniqueAntonyms = new Set(antonyms);
      for (var antonym of uniqueAntonyms) {
        aysy += antonym + ", ";
      }
      aysy = aysy.slice(0, -2) + "\n";
    }

    if (aysy) {
      content += "\n" + aysy;
    }

    let count = 0;
    for (var example of examples) {
      if (example && !content.includes(example)) {
        if (count == 0) {
          content += "\nExamples:\n";
        }
        count++;
        content += "- " + example + "\n";
      }
    }

    for (var pos in partOfSpeech) {
       if (!content.includes(pos.toUpperCase())){
      content += "\n" + pos.toUpperCase() + "\n";
      for (var definition of partOfSpeech[pos]) {
        content += "- " + definition + "\n";
      }
    }}




  }


  console.log(partOfSpeech);
  console.log(content);
  return content.replace(/\n/g,"<br>");
}



function searchword(){
  unseewords();
    var word = document.getElementById("boxsearch").value;
    if (word != ""){
       try{var contents = dictionary(word);}catch(error){var contents = "Word not found! <br>";}
      var oldElement = document.getElementById("scrollbar");
     
        oldElement.innerHTML = contents;
       stop = contents
    }
  

}



function unseewords(){
  var old = document.getElementById("scrollbar");
  old.style.display =  'block';
  
  
}

function seewords(){
  
  if (!readygo){
    document.getElementById('loadingScreen').style.display = 'flex';
    alert("The words are still loading please wait!"); 
    allwords();
    return;
  }
  var old = document.getElementById("scrollbar");
  boxall.style.display = 'block';
  old.style.display = 'none';
}


function allwords(){
   setTimeout(function() {
     const largeText = httpGet("/dictionary/allwords.html");
    hidescrollbar.innerHTML = largeText;
 ready(); document.getElementById('loadingScreen').style.display = 'none';
},17896);
}

function ready(){
  readygo = true;
  alert("All the words are now loaded!");
  seewords();
}





