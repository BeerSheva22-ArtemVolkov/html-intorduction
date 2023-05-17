// const thumbnailsItem = document.querySelectorAll(".thumbnails-item");
// thumbnailsItem.forEach(item => {
//     item.addEventListener("click", function () {
//         let img = item.getElementsByTagName("img")[0].src;
//         let name = item.getElementsByTagName("span")[0].innerText;
//         document.querySelector(".details-image").src = img;
//         document.querySelector(".details-title").innerText = name;
//     })
// })

const detailsImageElemet = document.querySelector(".details-image");
const detailsTitleElement = document.querySelector(".details-title");
const thumbnailsAnchors = document.querySelectorAll(".thumbnails-anchor");
const detailsSection = document.querySelector(".details-section");
const main = document.querySelector("main");
const HIDDEN = "hidden";
const POINT = "point";

// for (let i = 0; i < thumbnailsAnchors.length; i++) {
//     thumbnailsAnchors[i].addEventListener("click", function () {
//         setDetails(thumbnailsAnchors[i]);
//     })
// }
thumbnailsAnchors.forEach(anchor => anchor.addEventListener("click", setDetails.bind(undefined, anchor)))

thumbnailsAnchors[0].addEventListener("", function(){
    detailsSection.classList.remove(POINT);
});

function setDetails(anchor) {
    showDetails();
    detailsImageElemet.src = anchor.getAttribute("data-datails-image");
    detailsTitleElement.innerHTML = anchor.getAttribute("data-details-text");
}

function showDetails(){
    main.classList.remove(HIDDEN);
    detailsSection.classList.add(POINT);
    setTimeout(function(){
        detailsSection.classList.remove(POINT)
    }, 0);
    
}

function hideDetails(){
    
    main.classList.add(HIDDEN);
}