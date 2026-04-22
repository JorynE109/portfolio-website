const title = document.querySelector('title');
let titleText = title.dataset["title"].split('');
window.addEventListener("load", () => {
    titleText.push(" ");
    startTimer();
})
window.addEventListener("unload", () => {
    stopTimer();
})
function setTitleText()
{
    if (document.hasFocus())
    {
        requestAnimationFrame(titleIterate);
        title.innerText = titleText.join("");
    }
    else
    {
        title.innerText = "Come back :(";
    }
}
function titleIterate()
{
    if (titleText[0] == title.dataset["title"].split('')[0])
    {
        stopTimer();
        setTimeout(startTimer, 1000);
    }
    let letter = titleText.shift();
    titleText.push(letter);
}
function startTimer() {
    timer = setInterval(function (){
        requestAnimationFrame(setTitleText);
    }, 50);
}
function stopTimer() {
    clearInterval(timer);
}