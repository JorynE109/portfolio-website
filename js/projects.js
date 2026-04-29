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
    "3.4": 2,
    "12.1": 3
}
let imageRatioCount = [0, 0, 0, 0];
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
    updateHighlight();
    updateGallery();
}
function updateHighlight()
{
    const $highlightDisp = document.getElementById('highlightProj');
    let featItems = [];
    projCats.forEach(cat => {
        items[cat].forEach(item =>{
            if (item.feature > 0)
            {
                featItems.push(item);
            }
        })
    })


    let item = featItems[(new Date().getDate()) % featItems.length];
    $highlightDisp.innerHTML = `
        <h3>Featured Project</h3>
        <div class="featProj">
            <div class="img-holder">
                <img src="${item.mainSrc}" alt="${item.alt}">
                <img class="cover-image" src="${item.coverSrc}" alt="${item.alt}">
            </div>
            <div class="projTxt">
                <h4>${item.title}</h4>
                <div class="resp">${getResp(item.resp)}</div>
                <p class="category">${item.cat}</p>
                <p class="description">${item.desc}</p>
                <a class="btn-3d" href="${item.path}" target"_self">
                    <span>More</span>
                    <span>More</span>
                    <span>More</span>
                    <span>More</span>
                </a>
            </div>
        </div>
        `
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
    // let latestTime = (new Date(a_toSort[0].date)).getTime();
    // console.log(latestTime)
    while (a_toSort.length > 0)
    //for (let i = 0; i < 7; i++)
    {
        console.log(a_toSort)
        /*
        if (imageRatioCount[allImageRatios[12.1]] >= 1 && new Date(a_toSort[a_toSort.map(p => p.ratio).indexOf(12.1), 1].date).getTime() <= latestTime) //ISSUE: THis will make 12x1 imgs always at the top
        {
            console.log("One 12x1 found")
            a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(12.1), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 12;
            tmpItem["grid-row"] = 1;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[12.1]]--;
            latestTime = (new Date(a_toSort[0].date)).getTime();
        }
        else if (imageRatioCount[allImageRatios[3.4]] >= 1 && imageRatioCount[allImageRatios[3.2]] >= 2)
        // if (imageRatioCount[allImageRatios[3.4]] >= 1 && imageRatioCount[allImageRatios[3.2]] >= 2)
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
        else if (imageRatioCount[allImageRatios[3.2]] >= 2)
        {
            let tmpItem;
            console.log("2 landscape available")
            for (let i = 0; i < 2; i++)
            {
                a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
                tmpItem = a_toSort.shift()
                tmpItem["grid-col"] = 6;
                tmpItem["grid-row"] = 1;
                a_sorted.push(tmpItem)
                imageRatioCount[allImageRatios[3.2]]--;
            }
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
        */
       let currRatio = a_toSort[0].ratio;
       console.log("Considering the object: ", a_toSort[0]);
       console.log("Looking at an image with the ratio: " + currRatio)
       if (currRatio == 12.1)
       {
            console.log("One 12x1 found")
            let tmpItem;
            // a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(12.1), 1)[0]);
            tmpItem = a_toSort.shift()
            tmpItem["grid-col"] = 12;
            tmpItem["grid-row"] = 1;
            a_sorted.push(tmpItem)
            imageRatioCount[allImageRatios[12.1]]--;
       }
    //    else if (a_toSort.length == 2)
    //    {
    //         console.log("Sorting length is 2")
    //         if(a_toSort[0].ratio + a_toSort[1].ratio < (3.3 + 3.2) && a_toSort[0].ratio + a_toSort[1].ratio > (3.1 + 3.2))
    //         {
    //             console.log("Two landscapes found")
    //             let tmpItem;

    //             a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
    //             tmpItem = a_toSort.shift()
    //             tmpItem["grid-col"] = 6;
    //             tmpItem["grid-row"] = 1;
    //             a_sorted.push(tmpItem)
    //             imageRatioCount[allImageRatios[3.2]]--;

    //             a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
    //             tmpItem = a_toSort.shift()
    //             tmpItem["grid-col"] = 6;
    //             tmpItem["grid-row"] = 1;
    //             a_sorted.push(tmpItem)
    //             imageRatioCount[allImageRatios[3.2]]--;
    //         }
    //    }
       else if (a_toSort.length >= 3)
       {
            console.log("Sorting is at least 3");
            if (a_toSort[0].ratio + a_toSort[1].ratio < (3.3 + 3.2) && a_toSort[0].ratio + a_toSort[1].ratio > (3.1 + 3.2))
            {
                console.log("Two landscapes found")
                console.log(a_toSort[0].ratio);
                console.log(a_toSort[1].ratio);
                let tmpItem;

                a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
                tmpItem = a_toSort.shift()
                tmpItem["grid-col"] = 6;
                tmpItem["grid-row"] = 1;
                a_sorted.push(tmpItem)
                imageRatioCount[allImageRatios[3.2]]--;

                a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
                tmpItem = a_toSort.shift()
                tmpItem["grid-col"] = 6;
                tmpItem["grid-row"] = 1;
                a_sorted.push(tmpItem)
                imageRatioCount[allImageRatios[3.2]]--;
            }
            else if (a_toSort[0].ratio + a_toSort[1].ratio + a_toSort[2].ratio < (3.5 + 3.2 + 3.2) && a_toSort[0].ratio + a_toSort[1].ratio + a_toSort[2].ratio > (3.3 + 3.2 + 3.2))
            {
                console.log("2 landscape, 1 portrait found");
                if (a_toSort[0].ratio == 3.2)
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
                else 
                {
                    let tmpItem;
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
                    
                    a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
                    tmpItem = a_toSort.shift()
                    tmpItem["grid-col"] = 6;
                    tmpItem["grid-row"] = 1;
                    a_sorted.push(tmpItem)
                    imageRatioCount[allImageRatios[3.2]]--;
                }
            }
            else if (a_toSort[0].ratio + a_toSort[1].ratio + a_toSort[2].ratio < (1.2 + 3.2 + 3.2) && a_toSort[0].ratio + a_toSort[1].ratio + a_toSort[2].ratio > (1.0 + 3.2 + 3.2))
            {
                let tmpItem;
                console.log("1 square, 2 landscape available")
                if (a_toSort[0] == 1.1)
                {
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
                    a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
                    tmpItem = a_toSort.shift()
                    tmpItem["grid-col"] = 5;
                    tmpItem["grid-row"] = 1;
                    a_sorted.push(tmpItem)
                    imageRatioCount[allImageRatios[3.2]]--;

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
                }
            }
            else if (a_toSort[0].ratio + a_toSort[1].ratio + a_toSort[2].ratio < (1.2 + 1.1 + 1.1) && a_toSort[0].ratio + a_toSort[1].ratio + a_toSort[2].ratio > (1.0 + 1.1 + 1.1))
            {
                console.log("Three squares found")
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
                tmpItem["grid-row"] = 1;
                a_sorted.push(tmpItem)
                imageRatioCount[allImageRatios[1.1]]--;
                
                a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(1.1), 1)[0]);
                tmpItem = a_toSort.shift()
                tmpItem["grid-col"] = 4;
                tmpItem["grid-row"] = 1;
                a_sorted.push(tmpItem)
                imageRatioCount[allImageRatios[1.1]]--;

            }
            else
            {
                console.log(a_toSort[0]);
                console.log(a_toSort[1]);
                console.log(a_toSort[2]);
                console.log(a_toSort[0].ratio);
                console.log(a_toSort[1].ratio);
                console.log(a_toSort[2].ratio);
                console.log(a_toSort[0].ratio + a_toSort[1].ratio + a_toSort[2].ratio)
                console.log(1.1+3.2+3.2)
                
                let tmpItem;
                tmpItem = a_toSort.shift()
                tmpItem["grid-col"] = 12;
                tmpItem["grid-row"] = 1;
                a_sorted.push(tmpItem)
                imageRatioCount[allImageRatios[tmpItem.ratio]]--;
            }
       }
       
    //    else if (currRatio == 3.2)
    //    {
    //         console.log("One landscape found. Performing next actions")
    //         if (a_toSort[1])
    //         {
    //             console.log("Next image ratio is: " + a_toSort[1].ratio);
    //             if(a_toSort[1].ratio == 3.2)
    //             {
    //                 console.log("2 landscape available")
    //                 if (a_toSort[2])
    //                 {
    //                     if (a_toSort[2].ratio == 3.4)
    //                     {
    //                         console.log("Plus a portrait")
    //                         let tmpItem = a_toSort.shift()
    //                         console.log("Sending to array: " + tmpItem)
    //                         tmpItem["grid-col"] = 6;
    //                         tmpItem["grid-row"] = 1;
    //                         a_sorted.push(tmpItem)
    //                         imageRatioCount[allImageRatios[3.2]]--;
                            
                            
    //                         tmpItem = a_toSort[1]
    //                         console.log("Sending to array: " + tmpItem)
    //                         tmpItem["grid-col"] = 6;
    //                         tmpItem["grid-row"] = 2;
    //                         a_sorted.push(tmpItem)
    //                         imageRatioCount[allImageRatios[3.4]]--;

                            
    //                         tmpItem = a_toSort.shift()
    //                         tmpItem["grid-col"] = 6;
    //                         tmpItem["grid-row"] = 1;
    //                         a_sorted.push(tmpItem)
    //                         imageRatioCount[allImageRatios[3.2]]--;

    //                         a_toSort.shift()
    //                     }
    //                 }
    //                 let tmpItem;
    //                 for (let i = 0; i < 2; i++)
    //                 {
    //                     // a_toSort.unshift(a_toSort.splice(a_toSort.map(p => p.ratio).indexOf(3.2), 1)[0]);
    //                     tmpItem = a_toSort.shift();
    //                     tmpItem["grid-col"] = 6;
    //                     tmpItem["grid-row"] = 1;
    //                     a_sorted.push(tmpItem)
    //                     imageRatioCount[allImageRatios[3.2]]--;
    //                 }
    //             }
    //         }
    //         //TODO::::ADD MORE POSSIBLE RATIOS!!

    //         // if (imageRatioCount[allImageRatios[3.4]] >= 1 && imageRatioCount[allImageRatios[3.2]] >= 2)
            

    //         else
    //         {
    //             // tmpItem = a_toSort[0];
    //             imageRatioCount[allImageRatios[currRatio]]--
    //             console.log(imageRatioCount);
    //             a_sorted.push(a_toSort.shift());
    //         }
    //    }
       else
       {
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
            // console.log(array[i].date)
            // console.log(new Date(array[i].date))
            // console.log(new Date(array[i].date).getTime())
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
        console.log(document.documentElement.getAttribute("data-theme"))
        let $coverSrc;
        if (document.documentElement.getAttribute("data-theme") == "dark")
        {
            $coverSrc = item.coverSrcDark;
        }
        else 
        {
            $coverSrc = item.coverSrcLight
        }

        galleryHTML.push(`
        <div class="proj grid-col-${item["grid-col"]} grid-row-${item["grid-row"]}">
            <a href="${item.path}" target"_self">
                <img
                    srcset="
                        ${item.mainSrc}main-160.jpg 160w, 
                        ${item.mainSrc}main-320.jpg 320w,
                        ${item.mainSrc}main-640.jpg 640w,
                        ${item.mainSrc}main-1024.jpg 1024w"
                        ${item.mainSrc}main.jpg 2048w"
                    sizes="
                        (max-width: 160px) 160px,
                        (max-width: 320px) 320px,
                        (max-width: 640px) 640px,
                        (max-width: 1024px) 1024px,
                        2048px,"
                    src="${item.mainSrc}main.jpg"
                    alt="${item.alt}"
                />
                <img class="cover-image"
                    srcset="
                        ${$coverSrc}main-160.jpg 160w, 
                        ${$coverSrc}main-320.jpg 320w,
                        ${$coverSrc}main-640.jpg 640w,
                        ${$coverSrc}main-1024.jpg 1024w"
                        ${$coverSrc}main.jpg 2048w"
                    sizes="
                        (max-width: 160px) 160px,
                        (max-width: 320px) 320px,
                        (max-width: 640px) 640px,
                        (max-width: 1024px) 1024px,
                        2048px,"
                    src="${$coverSrc}main.jpg"
                    alt="${item.alt}"
                />
                <div class="projTxt">
                    <h4>${item.title}</h4>
                    <p class="category">${item.cat}</p>
                    <div class="resp">${getResp(item.resp)}</div>
                    <p class="description">${getDesc(item.desc)}</p>
                </div>
            </a>
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
    console.log("Checking button for category: " + category);
    const $catBtns = document.querySelectorAll(".categorySelection");
    console.log($catBtns)
    $catBtns.forEach(btn => {
        console.log("Current button is: " + btn.dataset['category'])
        if (btn.dataset['category'] == category)
        {
            btn.classList.add("active");
        }
        else
        {
            btn.classList.remove("active");
        }
    });
    fetchItems();
}