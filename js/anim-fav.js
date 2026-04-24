const title = document.querySelector('title');
let titleText = title.dataset["title"].split('');
const fav = document.getElementById('favicon');
let favFrame = 0;
window.addEventListener("load", () => {
    titleText.push(" ");
    startTitleTimer();
})
window.addEventListener("unload", () => {
    stopTitleTimer();
})
function setTitleText()
{
    if (document.hasFocus())
    {
        requestAnimationFrame(titleIterate);
        title.innerText = titleText.join("");
        fav.setAttribute("href", "./img/icons/favicon.ico")
        fav.setAttribute("type", "image/x-icon")
    }
    else
    {
        fav.setAttribute("type", "image/gif")
        title.innerText = "Come back :(";
        requestAnimationFrame(animateFavicon)
    }
}
function titleIterate()
{
    if (titleText[0] == title.dataset["title"].split('')[0])
    {
        stopTitleTimer();
        setTimeout(startTitleTimer, 1000);
    }
    let letter = titleText.shift();
    titleText.push(letter);
}
function startTitleTimer() {
    titleTimer = setInterval(function (){
        requestAnimationFrame(setTitleText);
    }, 50);
}
function stopTitleTimer() {
    clearInterval(titleTimer);
}
function animateFavicon() 
{
    if (favFrame < 60)
    {
        fav.href = `./img/icons/sad-emoji-split/frame_${favFrame}.gif`
        favFrame++;
    }
    else
    {
        favFrame = 0;
        fav.href = `./img/icons/sad-emoji-split/frame_${favFrame}.gif`
    }
}