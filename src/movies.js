// const thumbnailsItem = document.querySelectorAll(".thumbnails-item");
// thumbnailsItem.forEach(item => {
//     item.addEventListener("click", function () {
//         let img = item.getElementsByTagName("img")[0].src;
//         let name = item.getElementsByTagName("span")[0].innerText;
//         document.querySelector(".details-image").src = img;
//         document.querySelector(".details-title").innerText = name;
//     })
// })

import movObj from '/movies.json' assert {type: 'json'};

const detailsImageElemet = document.querySelector(".details-image");
const detailsTitleElement = document.querySelector(".details-title");

const detailsSection = document.querySelector(".details-section");
const main = document.querySelector("main");
const thumbnails_list = document.querySelector(".thumbnails-list");
const HIDDEN = "hidden";
const POINT = "point";

// for (let i = 0; i < thumbnailsAnchors.length; i++) {
//     thumbnailsAnchors[i].addEventListener("click", function () {
//         setDetails(thumbnailsAnchors[i]);
//     })
// }



function setDetails(anchor) {
    showDetails();
    detailsImageElemet.src = anchor.getAttribute("data-datails-image");
    detailsTitleElement.innerHTML = anchor.getAttribute("data-details-text");
}

function showDetails() {
    main.classList.remove(HIDDEN);
    detailsSection.classList.add(POINT);
    setTimeout(function () {
        detailsSection.classList.remove(POINT)
    }, 0);
}



function readJSON() {

    let httpPrefix = movObj.httpPrefix;

    // <li class="thumbnails-item">
    //     <a href="#" class="thumbnails-anchor" data-datails-image="pictures/cat1.jpg"
    //         data-details-text="The most beautful cat">
    //         <img src="pictures/cat1.jpg" class="thumbnails-image">
    //         <span class="thumbnails-title">Yuki</span>
    //     </a>
    // </li>

    movObj.results.forEach(element => {
        const li = document.createElement('li');
        li.classList.add("thumbnails-item");
        thumbnails_list.appendChild(li);
        const a = document.createElement('a');
        a.classList.add("thumbnails-anchor");
        a.setAttribute("data-datails-image", httpPrefix + element.poster_path);
        a.setAttribute("data-details-text", element.overview.slice(0, 100) + "...");
        li.appendChild(a);
        const img = document.createElement('img');
        img.setAttribute('src', httpPrefix + element.backdrop_path);
        img.classList.add("thumbnails-image");
        a.appendChild(img);
        const span = document.createElement('span');
        span.classList.add("thumbnails-title");
        span.innerText = element.original_title;

        a.appendChild(span);
    });
}

readJSON();

const thumbnailsAnchors = document.querySelectorAll(".thumbnails-anchor");

thumbnailsAnchors.forEach(anchor => anchor.addEventListener("click", setDetails.bind(undefined, anchor)))

function hideDetails() {
    main.classList.add(HIDDEN);
}

window.hideDetails = hideDetails;

