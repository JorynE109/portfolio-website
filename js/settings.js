const $settings = document.getElementById("settings");
const $settingsBtn = document.getElementById("settingsBtn")
let settingsOpen = 0;
let startWidth;
let goalWidth;
window.addEventListener("load", ()=>{
    $settings.style.width = $settingsBtn.offsetWidth + "px";
    updateSettingsWidth();
})
$settingsBtn.addEventListener("click", ()=>{
    if (settingsOpen == 0)
    {
        $settings.classList.add("open");
        settingsOpen = 1;
        updateSettingsWidth()
    }
    else
    {
        $settings.classList.remove("open");
        settingsOpen = 0;
        updateSettingsWidth()
    }
})
function updateSettingsWidth()
{
    if (settingsOpen > 0)
    {
        goalWidth = 0;
        for (let i = 0; i < $settings.childElementCount; i++)
        {
            goalWidth += $settings.children[i].offsetWidth;
        }
        console.log("Goal width is: " + goalWidth)
        // let setWidth = setInterval(setSettingsWidth, 1000, width, $settingsBtn.offsetWidth);
        startWidth = $settings.offsetWidth;
        if (startWidth < goalWidth)
        {
            // setSettingsWidth(startWidth, width);
            console.log("Start width is: " + startWidth);
            setSettingsWidth();
        }
    }
    else
    {
        $settings.style.height = $settingsBtn.offsetHeight + 'px';
        goalWidth = $settingsBtn.offsetWidth;
        console.log("Goal width is: " + goalWidth)
        startWidth = $settings.offsetWidth;
        if (startWidth > goalWidth)
        {
            // setSettingsWidth(startWidth, width);
            console.log("Start width is: " + startWidth);
            setSettingsWidth();
        }
    }
}
function setSettingsWidth()
{
    if (goalWidth > startWidth)
    {
        const shift = Math.min(0.1 * (goalWidth - startWidth), 200);
        startWidth = startWidth + shift;
        $settings.style.width = (startWidth) + "px";
        if (startWidth < goalWidth)
        {
            setTimeout(requestAnimationFrame, 10, setSettingsWidth);
        }
    }
    else
    {
        const shift = Math.max(0.1 * (goalWidth - startWidth), -200);
        startWidth = startWidth + shift;
        $settings.style.width = (startWidth) + "px";
        if (startWidth > goalWidth)
        {
            setTimeout(requestAnimationFrame, 10, setSettingsWidth);
        }
    }
    
}