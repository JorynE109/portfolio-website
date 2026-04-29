const $settings = document.getElementById("settings");
const $settingsBtn = document.getElementById("settingsBtn");
const $modeToggle = document.getElementById("modeToggle");
const $setico = document.getElementById("setico")
let settingsOpen = 0;
let startWidth;
let goalWidth;
let darkTheme = 0

const darkModeMql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
console.log("Joryn theme: " + localStorage.getItem("joryn-theme"))

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";
    console.log("Window theme changed to: " + newColorScheme)
    document.documentElement.setAttribute("data-theme", newColorScheme)
    localStorage.setItem("joryn-theme", newColorScheme);
    if (event.matches)
    {
        setLightMode();
    }
    else
    {
        setDarkMode();
    }
});
$modeToggle.addEventListener("click", () => {
    // document.documentElement.setAttribute("data-theme", "dark");
    if (darkTheme == 1) {
        console.log("Switching to light mode")
        setLightMode();
    } else {
        console.log("Switching to dark mode")
        setDarkMode();
    }
    updateGallery();
})
window.addEventListener("load", ()=>{
    $settings.style.width = $settingsBtn.offsetWidth + "px";
    updateSettingsWidth();
    if (localStorage.getItem("joryn-theme"))
    {
        if (localStorage.getItem("joryn-theme") == "dark") 
        {
            setDarkMode();
        }
        else
        {
            setLightMode();
        }

    }
    else
    {
        if (darkModeMql && darkModeMql.matches) 
        {
            setDarkMode();
        }
        else 
        {
            setLightMode();
        }
    }
})
$settingsBtn.addEventListener("click", ()=>{
    if (settingsOpen == 0)
    {
        $setico.classList.add("opening");
        setTimeout(()=>{
            $setico.classList.remove("opening")
            $setico.classList.add("open")
        }, 300)
        $settings.classList.add("open");
        settingsOpen = 1;
        updateSettingsWidth()
    }
    else
    {
        $setico.classList.remove("open")
        $setico.classList.add("closing");
        setTimeout(()=>{
            $setico.classList.remove("closing")
        }, 300)
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
function setDarkMode()
{
    document.documentElement.setAttribute("data-theme", "dark")
    $modeToggle.innerText = "Light";
    darkTheme = 1;
    localStorage.setItem("joryn-theme", "dark");
    $setico.src = "./img/icons/plus-w@4x.png"
}
function setLightMode()
{
    document.documentElement.setAttribute("data-theme", "light")
    $modeToggle.innerText = "Dark";
    darkTheme = 0;
    localStorage.setItem("joryn-theme", "light");
    $setico.src = "./img/icons/plus-b@4x.png"
}