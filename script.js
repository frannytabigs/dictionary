const form = document. querySelector('form');
form. addEventListener('submit', function(event) {
event. preventDefault();
});




function about(){
  unsee();
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
  var examples = new Set();
  var synonyms = new Set();
  var antonyms = new Set();

  for (var data of jsonResponse) {
    if (data.phonetic && !content.includes(data.phonetic)) {
      content += data.phonetic + "\n";
    }

    if (data.antonyms) {
      synonyms.add(...data.antonyms);
    }

    if (data.synonyms) {
      synonyms.add(...data.synonyms);
    }

    for (var meaning of data.meanings) {
      if (!partOfSpeech[meaning.partOfSpeech]) {
        partOfSpeech[meaning.partOfSpeech] = new Set();
      }
      synonyms.add(...meaning.synonyms);
      antonyms.add(...meaning.antonyms);
      for (var definition of meaning.definitions) {
        var currentDefinition = definition.definition;
        synonyms.add(...definition.synonyms);
        antonyms.add(...definition.antonyms);
        partOfSpeech[meaning.partOfSpeech].add(currentDefinition);
        examples.add(definition.example);
      }
    }
  }

  let aysy = "";

  if (synonyms.length && !aysy.includes("Synonyms: ")) {
    aysy += "Synonyms: ";
    for (var synonym of synonyms) {
      aysy += synonym + ", ";
    }
    aysy = aysy.slice(0, -2) + "\n";
  }

  if (antonyms.length && !aysy.includes("Antonyms: ")) {
    aysy += "Antonyms: ";
    for (var antonym of antonyms) {
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



  console.log(partOfSpeech);
  console.log(content);
  return content.replace(/\n/g,"<br>");
}



function searchword(){
  unsee();
    var word = document.getElementById("boxsearch").value;
    if (word != ""){
       try{var contents = dictionary(word);}catch(error){var contents = "Word not found! <br>";}
      var oldElement = document.getElementById("scrollbar");

        oldElement.innerHTML = contents;
       stop = contents
    }


}

function unsee(){
  
  var show = document.getElementById('scrollbar');
  show.style.display = 'block';
}

function seewords(id){
  if (!id){
    id = "A";
  }
  
  var html =   document.getElementById('hidescrollbar');
  var text = '<iframe src="/dictionary/' + id + ".html style="width: 100%;height: 100%;" id="frame"></iframe>';
  if (!html.innerHTML.startsWith(text)){html.innerHTML = text;unsee()}
  var show = document.getElementById('scrollbar');
  show.style.display = 'none';
   if (!html.style.display) {html.style.display = 'block';}
}

