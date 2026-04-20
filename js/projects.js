const $projectGallery = document.getElementById('projectGallery');
let items = [];
let projCats = ["all", "photography", "video"]
curCat = 0;
window.addEventListener('load',()=>{
    fetchItems();
});
async function fetchItems()
{
    try{
        const res = await fetch('../project/list.json');
        data = await res.json();
        if(res.ok) items = data;
        console.log(items);
        updateGallery();
    }catch(err){
        $projectGallery.innerHTML = `<p>Unable to load. Try again later. <br><br>${err}</p>`
    }
}
function updateGallery()
{
    galleryHTML = [];

    projCats.forEach(cat => {
        console.log("hey")
        items[cat].forEach(item =>{
            galleryHTML.push(`
                <div class="proj">
                    <h3>${item.title}</h3>
                    <button class="pill" onclick="updateCat(${cat})">${cat}</button>
                    <img src="${item.coverSrc}">
                </div>
                `)
        })
    })

    $projectGallery.innerHTML = galleryHTML.join("")
}
function updateCat(cat)
{
    
}