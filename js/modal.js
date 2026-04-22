const $modalWrapper = document.getElementById("modalWrapper");
const $close = document.getElementById("modalClose");
window.addEventListener("load", ()=>{
    updateScrollBehaviour();
    if (localStorage.getItem("modalClosed") > 0)
    {
        $modalWrapper.classList.add("hidden");
    }
    else
    {
        $modalWrapper.classList.remove("hidden");
    }
})
function closeModal()
{
    $modalWrapper.style.opacity = 0;
    localStorage.setItem("modalClosed", 1);
    setTimeout(()=>{
        $modalWrapper.classList.add("hidden");
    }, 200);
    updateScrollBehaviour();
}
function deleteLocalStorage()
{
    localStorage.removeItem("modalClosed")
}
function updateScrollBehaviour()
{
    if (localStorage.getItem("modalClosed") == 1)
    {
        document.body.style.overflow = "auto";
    }
    else
    {
        document.body.style.overflow = "hidden";
    }
}
$close.addEventListener("click", closeModal);
$modalWrapper.addEventListener("click", closeModal);