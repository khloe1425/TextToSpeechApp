//DOM
const textInput = document.querySelector("#textInput");
const rate = document.querySelector("#rate");
const pitch = document.querySelector('#pitch');
const selectVoice = document.querySelector("#voiceList");
const speakButton = document.querySelector('#speakBtn');
const rateValue = document.querySelector("#rateValue");
const pitchValue = document.querySelector("#pitchValue");

const body = document.querySelector("body")
const synth = window.speechSynthesis;
let voiceList = [];
synth.onvoiceschanged = () => {
    voiceList = synth.getVoices();
    console.log(voiceList);
    voiceList.forEach(item => {
        let option = document.createElement('option');
        option.textContent = `${item.name} (${item.lang})`
        option.setAttribute('data-lang', item.lang)
        option.setAttribute('data-name', item.name)
        selectVoice.appendChild(option)
    })
}

const speak = () => {
    if (!synth.speaking) {
        if (textInput.value) {
            console.log(textInput.value);
            const speakText = new window.SpeechSynthesisUtterance(textInput.value)
            speakText.onend = () => {
                console.log("end");
                body.style.background = "#141414"
            }
            speakText.onerror = e => {
                console.log(e);
            }
            let selectedVoice = voiceList.find(item => item.name === selectVoice.selectedOptions[0].getAttribute("data-name"))
            speakText.voice = selectedVoice;
            speakText.rate = rate.value;
            speakText.pitch = pitch.value;

            body.style.backgroundRepeat = "repeat-x"
            body.style.backgroundImage = 'url(./img/wave.gif)'
            body.style.backgroundSize = "100% 100%"
            synth.speak(speakText);
        }
    }
}
rate.addEventListener('input', e => { rateValue.textContent = e.target.value })
pitch.addEventListener('input', e => { pitchValue.textContent = e.target.value })
selectVoice.addEventListener('change', speak)
speakButton.addEventListener("click", speak)
console.log(textInput);