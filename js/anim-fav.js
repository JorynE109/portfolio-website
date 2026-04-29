const title = document.querySelector('title');
let titleText = title.dataset["title"].split('');
const fav = document.getElementById('favicon');
let favMainHref;
if (window.location.href.split("/").length < 6)
{
    favMainHref = "./img/icons/favicon.ico"
}
else
{
    favMainHref = "../../img/icons/favicon.ico"
}
console.log(favMainHref)
console.log(window.location.href.split("/").length);
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
        fav.setAttribute("href", favMainHref) 
        fav.setAttribute("type", "image/x-icon")
        requestAnimationFrame(titleIterate);
        title.innerText = titleText.join("");
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
        if (window.location.href.split("/").length < 6)
        {
            fav.href = `./img/icons/sad-emoji-split/frame_${favFrame}.gif`
            favFrame++;
        }
        else
        {
            fav.href = `../../img/icons/sad-emoji-split/frame_${favFrame}.gif`
            favFrame++;
        }
    }
    else
    {
        if (window.location.href.split("/").length < 6)
        {
            favFrame = 0;
            fav.href = `./img/icons/sad-emoji-split/frame_${favFrame}.gif`
        }
        else
        {
            favFrame = 0;
            fav.href = `../../img/icons/sad-emoji-split/frame_${favFrame}.gif`
        }
    }
}