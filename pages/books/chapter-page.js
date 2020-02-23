var chText = document.querySelector(".chapter");

const CARD_HTML = '<div class="card mx-auto my-2" style="width: 18rem;"><div class="card-body"><h5 class="card-title">New Vocabulary:</h5><p class="card-text"></p></div></div>'

chText.addEventListener('dblclick', function(e) {
  var selObj = window.getSelection();
  const url = "https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=de&target=en&input=" + selObj.toString();

  fetch(url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
        "x-rapidapi-key": "5d84921f1emsh9c0d4c749d52e5cp1b179djsnfd40f9b1fd04"
      }
    })
    .then(response => {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      var translation = json.outputs[0].output;
      if (document.querySelector("#vocab") == null) {
        cardHtml = '<div id="vocab" class="card mx-auto my-2" style="width: 18rem;"><div class="card-body"><h5 class="card-title">New Vocabulary:</h5><p id="vocab-list" class="card-text">'
        cardHtml += addVocabWord(selObj.toString(), translation);
        cardHtml += '</p></div></div>';
        document.querySelector(".chapter").innerHTML += cardHtml;
      }
      else {
        document.querySelector("#vocab-list").innerHTML += addVocabWord(selObj.toString(), translation);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

function addVocabWord(word, translation) {
  return word + ": " + translation + "<br>";
}
