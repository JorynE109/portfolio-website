const $projectGallery = document.getElementById('projectGallery');
let items = [];
let catEnum = {
    photography: 0,
    video: 1,
    web: 2
}
let projCats = ["photography", "video", "web"]
curCat = -1; //this is the value for all.
let allImageRatios = {
    "1.1":0,
    "3.2":1,
    "3.4": 2
}
let imageRatioCount = [0, 0, 0]

window.addEventListener('load',()=>{
    fetchItems();
});
async function fetchItems()
{
    try{
        const res = await fetch('./project/list.json');
        data = await res.json();
        if(res.ok) items = data;
        console.log(items);
    }catch(err){
        $projectGallery.innerHTML = `<p>Unable to load. Try again later. <br><br>${err}</p>`
    }
        updateGallery();
}
function updateGallery()
{
    let galleryHTML = [];
    if (curCat < 0)
    {
        galleryHTML = updateAllCats();
        $projectGallery.innerHTML = galleryHTML;
    }
    else
    {
        galleryHTML = updateSpecCat();
        $projectGallery.innerHTML = galleryHTML;
    }
}
function updateCat(cat)
{
    curCat = catEnum[cat];
    console.log(projCats[curCat]);
    updateGallery();
}
function updateAllCats()
{
    let galleryHTML = [];
    let allItems = [];
    projCats.forEach(cat => {
        items[cat].forEach(item =>{
            allItems.push(item);
        })
    })
    return projHTML(sortItems(allItems));
}
function updateSpecCat()
{
    let cat = projCats[curCat];
    let catItems = [];
    items[cat].forEach(item => {
        catItems.push(item);
    })
    return projHTML(sortItems(catItems));
}
function sortItems(a_toSort)
{
    let a_sorted = [];
    a_toSort.forEach(item => {
        let itemRatio = allImageRatios[item.ratio]
        imageRatioCount[itemRatio]++;
    })
    console.log(imageRatioCount);
    /*
    Pair each 3.4 with 2x(3.2)
    meaning, add to array in either of these orders:
    1. 3.2, 3.4, 3.2
    2. 3.4, 3.2, 3.2
    */
    //TODO: FIRST SORT BY DATE BEFORE DOING ALL THIS!!
    a_toSort = sortObjArrByDate(a_toSort);
    while (a_toSort.length > 0)
    {
        if (imageRatioCount[allImageRatios[3.4]] >= 1 && imageRatioCount[allImageRatios[3.2]] >= 2)
        {
            let tmpItem;
            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 6;
            tmpItem["grid-row"] = 1;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[3.2]]--;

            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.4), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 6;
            tmpItem["grid-row"] = 2;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[3.4]]--;

            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 6;
            tmpItem["grid-row"] = 1;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[3.2]]--;
        }
        else if (imageRatioCount[allImageRatios[1.1]] >= 3)
        {
            console.log("3 or more squares available")
            let tmpItem;
            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(1.1), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 8;
            tmpItem["grid-row"] = 2;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[1.1]]--;

            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(1.1), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 4;
            tmpItem["grid-row"] = 2;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[1.1]]--;
            
            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(1.1), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 4;
            tmpItem["grid-row"] = 2;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[1.1]]--;
        }
        else if (imageRatioCount[allImageRatios[1.1]] >= 1 && imageRatioCount[allImageRatios[3.4]] >= 1)
        {
            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(1.1), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 8;
            tmpItem["grid-row"] = 1;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[1.1]]--;
            
            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.4), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 4;
            tmpItem["grid-row"] = 2;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[3.4]]--;
        }
        else if (imageRatioCount[allImageRatios[1.1]] >= 1 && imageRatioCount[allImageRatios[3.2]] >= 2)
        {
            let tmpItem;
            console.log("1 square, 2 landscape available")
            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(1.1), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 7;
            tmpItem["grid-row"] = 2;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[1.1]]--;

            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 5;
            tmpItem["grid-row"] = 1;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[3.2]]--;

            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 5;
            tmpItem["grid-row"] = 1;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[3.2]]--;
        }
        else
        {
            //THIS MAY CAUSE ISSUES!! Need to make sure i correctly remove count from imageRatioCount
            a_toSort.forEach(item => {
                console.log(imageRatioCount)
                imageRatioCount[allImageRatios[item.ratio]]--
                console.log(imageRatioCount)
                a_toSort.shift();
                a_sorted.push(item);
            })
        }
    }
    return a_sorted;
}
function sortObjArrByDate(array)
{
    if (array.length < 2) 
    {
        return array;
    }
    let doneSorting = 0;
    while (doneSorting == 0)
    {
        for (let i = 1; i < array.length; i++)
        {
            console.log(array[i].date)
            console.log(new Date(array[i].date))
            console.log(new Date(array[i].date).getTime())
            if (new Date(array[i].date).getTime() > new Date(array[i - 1].date).getTime())
            {
                let buffer = array[i - 1];
                array[i - 1] = array[i];
                array[i] = buffer;
                break;
            }
            else if(i == (array.length - 1)){
                doneSorting = 1;
            }
        }

    }
    return array;
}
function projHTML(sortedItems)
{
    let galleryHTML = [];
    sortedItems.forEach(item =>{
        galleryHTML.push(`
        <div class="proj grid-col-${item["grid-col"]} grid-row-${item["grid-row"]}">
            <a href="${item.path}" target"_self"><img src="${item.mainSrc}" alt="${item.alt}">
            <img class="cover-image" src="${item.coverSrc}" alt="${item.alt}">
            <div class="projTxt">
                <h3>${item.title}</h3>
                <p class="category">${item.cat}</p>
                <div class="resp">${getResp(item.resp)}</div>
                <p class="description">${getDesc(item.desc)}</p>
            </div></a>
        </div>
        `)
    })
    return galleryHTML.join("");
}
function getDesc(desc)
{
    let descMin = desc.split("");
    if (descMin.length > 40)
    {
        descMin = descMin.slice(0,40);
        descMin.push("...")
    }
    return descMin.join("");
}
function getResp(respArr)
{
    let respHTML = [];
    respArr.forEach(item => {
        respHTML.push(`<p class="pill">${item}</p>`)
    })
    if (respHTML.length > 1)
    {
        return respHTML.join("");
    }
    else
    {
        return respHTML.join("");
    }
}
// function getGridCol(ratio)
// {
//     let myWidth = ratio.toString().charAt(0);
//     let myHeight = ratio.toString().charAt(2);
//     let myRatio = myWidth / myHeight;

//     console.log(myRatio);
//     if (myRatio == 1.5)
//     {
//         return 6;
//     }
//     else if (myRatio == 0.75)
//     {
//         return 6;
//     }
//     else
//     {
//         return (1.0 / 3.0 * 12.0);
//     }
// }
// function getGridRow(ratio)
// {
//     let myWidth = ratio.toString().charAt(0);
//     let myHeight = ratio.toString().charAt(2);
//     let myRatio = myWidth / myHeight;

//     console.log(myRatio);
//     if (myRatio == 1.5)
//     {
//         return 1;
//     }
//     else if (myRatio == 0.75)
//     {
//         return 2;
//     }
//     else
//     {
//         return 0;
//     }
// }

/*
1. Get count of each ratio.
2. Determine adequate pairing. 

*/
function catSelected(category)
{
    curCat = category;
    fetchItems();
}