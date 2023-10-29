const searchBtn = document.getElementById("search-btn");
const wordInput = document.getElementById("word-input");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  const word = wordInput.value;
  if (!word) {
    resultDiv.textContent = "Please enter a word";
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      resultDiv.innerHTML = "";
      data[0].meanings.forEach(meaning => {
        const partOfSpeech = meaning.partOfSpeech;
        const definition = meaning.definitions[0].definition;
        const example = meaning.definitions[0].example || "";
        const pronunciation = data[0].phonetics[0].text;

        const meaningDiv = document.createElement("div");
        meaningDiv.classList.add("definition");

        const partOfSpeechSpan = document.createElement("span");
        partOfSpeechSpan.classList.add("part-of-speech");
        partOfSpeechSpan.textContent = partOfSpeech;

        meaningDiv.appendChild(partOfSpeechSpan);
        meaningDiv.appendChild(document.createTextNode(`: ${definition}`));

        if (example) {
          const exampleSpan = document.createElement("span");
          exampleSpan.classList.add("example");
          exampleSpan.textContent = ` (${example})`;
          meaningDiv.appendChild(exampleSpan);
        }

        const pronunciationDiv = document.createElement("div");
        pronunciationDiv.textContent = `Pronunciation: ${pronunciation}`;

        resultDiv.appendChild(meaningDiv);
        resultDiv.appendChild(pronunciationDiv);
      });
    })
    .catch(error => {
      console.error(error);
      resultDiv.textContent = "Error: Could not retrieve data";
    });
})