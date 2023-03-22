import dataJson from "../data.json" assert { type: "json" };

const layoutPlaceholder = document.querySelector(".layout-placeholder");
const grid = document.querySelector(".grid");
const cardSpace = document.querySelectorAll("input[name=theme]");
let inputRadio = document.getElementById("lightTheme");
inputRadio.checked = true;
const loadMoreBtn = document.createElement("button");
loadMoreBtn.classList.add("load-more-btn");
loadMoreBtn.innerText = "Load more";
layoutPlaceholder.appendChild(loadMoreBtn);
let toggleBackground = false;
const cardsPerLoad = 4;
let currentCardIndex = cardsPerLoad;

function changeBackgroundColor(el) {
  let bgColor = document.getElementById("cardBackgroundColor");
  bgColor.addEventListener("change", function () {
    el.style.backgroundColor = bgColor.value;
  });
}

function changeCardSpaceBetween(el) {
  let cardSpace = document.getElementById("cardSpaceBetween");
  cardSpace.addEventListener("change", function () {
    el.style.gridGap = cardSpace.value;
  });
}

let gridValue = 4;

const numberOfColumns = document.getElementById("numberOfColumns");
console.log(document.getElementById("numberOfColumns").value);
numberOfColumns.addEventListener("change", function (event) {
  let selectedValue = event.target.value;
  if (numberOfColumns.value === "dynamic") {
    if (window.innerWidth < 768) {
      grid.style.gridTemplateColumns = "1fr";
      grid.style.gridAutoRows = "auto";
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      grid.style.gridTemplateColumns = "1fr 1fr";
      grid.style.gridAutoRows = "auto";
    } else if (window.innerWidth > 992) {
      grid.style.gridTemplateColumns = `repeat(${selectedValue}, 1fr)`;
      grid.style.gridAutoRows = "auto";
    }
  } else {
    gridValue = Number(selectedValue);
    if (window.innerWidth < 768) {
      grid.style.gridTemplateColumns = "1fr";
      grid.style.gridAutoRows = "auto";
    } else if (window.innerWidth > 768 && window.innerWidth < 992) {
      grid.style.gridTemplateColumns = "1fr 1fr";
      grid.style.gridAutoRows = "auto";
    } else if (window.innerWidth > 992) {
      gridValue = Number(selectedValue);
      grid.style.gridTemplateColumns = `repeat(${selectedValue}, 1fr)`;
      grid.style.gridAutoRows = "auto";
    }
  }
});

function setGridStyles() {
  if (document.getElementById("numberOfColumns").value == "dynamic") {
    gridValue = 4;
    if (window.matchMedia("(max-width: 768px)").matches) {
      grid.style.gridTemplateColumns = `repeat(1, 1fr)`;
      grid.style.gridAutoRows = "auto";
      grid.style.padding = "30px 20px";
      grid.style.display = "grid";
    } else if (
      window.matchMedia("(max-width: 992px) and (min-width: 769px)").matches
    ) {
      grid.style.gridTemplateColumns = `repeat(2, 1fr)`;
      grid.style.gridAutoRows = "auto";
      grid.style.padding = "30px 20px";
      grid.style.display = "grid";
    } else if (window.matchMedia("(min-width: 993px)").matches) {
      console.log(gridValue);
      grid.style.gridTemplateColumns = `repeat(${gridValue}, 1fr)`;
      grid.style.gridAutoRows = "auto";
      grid.style.padding = "30px 20px";
      grid.style.display = "grid";
    }
  } else if (window.matchMedia("(max-width: 768px)").matches) {
    grid.style.gridTemplateColumns = `repeat(1, 1fr)`;
    grid.style.gridAutoRows = "auto";
    grid.style.padding = "30px 20px";
    grid.style.display = "grid";
  } else if (
    window.matchMedia("(max-width: 992px) and (min-width: 769px)").matches
  ) {
    grid.style.gridTemplateColumns = `repeat(2, 1fr)`;
    grid.style.gridAutoRows = "auto";
    grid.style.padding = "30px 20px";
    grid.style.display = "grid";
  } else if (window.matchMedia("(min-width: 993px)").matches) {
    console.log(gridValue);
    grid.style.gridTemplateColumns = `repeat(${gridValue}, 1fr)`;
    grid.style.gridAutoRows = "auto";
    grid.style.padding = "30px 20px";
    grid.style.display = "grid";
  }
}

setGridStyles();
window.addEventListener("resize", setGridStyles); 

renderCard(dataJson);
const filteredCard = document.querySelectorAll("input[name=filterBySource]");
filteredCard.forEach((el) => {
  el.addEventListener("change", function () {
    if (el.value == "all") {
      grid.innerHTML = "";
      loadMoreBtn.classList.remove("noContent");
      toggleBackground = false;
      inputRadio.checked = true;
      renderCard(dataJson);
    } else if (el.value == "instagram") {
      let filteredArray = dataJson.filter((x) => x.source_type == el.value);
      grid.innerHTML = "";
      toggleBackground = false;
      inputRadio.checked = true;
      renderCard(filteredArray);
      if (filteredArray.length <= currentCardIndex) {
        loadMoreBtn.classList.add("noContent");
      } else {
        loadMoreBtn.classList.remove("noContent");
      }
    } else if (el.value == "facebook") {
      let filteredArray = dataJson.filter((x) => x.source_type == el.value);
      grid.innerHTML = "";
      if (filteredArray.length <= currentCardIndex) {
        loadMoreBtn.classList.add("noContent");
      } else {
        loadMoreBtn.classList.remove("noContent");
      }
      toggleBackground = false;
      inputRadio.checked = true;
      renderCard(filteredArray);
    } else if (el.value == "twitter") {
      let filteredArray = dataJson.filter((x) => x.source_type == el.value);
      grid.innerHTML = "";
      toggleBackground = false;
      inputRadio.checked = true;
      renderCard(filteredArray);
      if (filteredArray.length <= currentCardIndex) {
        loadMoreBtn.classList.add("noContent");
      } else {
        loadMoreBtn.classList.remove("noContent");
      }
    }
  });
});

function renderCard(dataArray) {
  let likeCounter = 0;
  let isLiked = false;
  dataArray.forEach((el) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardWraper = document.createElement("div");
    cardWraper.classList.add("card-wraper");
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    const wrapperProfile = document.createElement("div");
    wrapperProfile.classList.add("wrapper-profile");
    const profileImage = document.createElement("div");
    profileImage.classList.add("profile-image");
    const image = document.createElement("img");
    image.src = el.profile_image;
    image.alt = "";
    profileImage.appendChild(image);
    const profileName = document.createElement("div");
    profileName.classList.add("profile-name");
    const h3 = document.createElement("h3");
    h3.textContent = el.name;
    const p = document.createElement("p");
    p.textContent = el.date;
    profileName.appendChild(h3);
    profileName.appendChild(p);
    wrapperProfile.appendChild(profileImage);
    wrapperProfile.appendChild(profileName);
    const socialIcon = document.createElement("div");
    socialIcon.classList.add("social-icon");
    const socialWrap = document.createElement("a");
    socialWrap.setAttribute("href", `${el.source_link}`);
    const socialIconImg = document.createElement("img");
    socialIconImg.src = `${
      el.source_type == "instagram"
        ? "../icons/instagram-logo.svg"
        : "../icons/facebook.svg"
    }`;
    socialWrap.appendChild(socialIconImg);
    socialIcon.appendChild(socialWrap);
    cardHeader.appendChild(wrapperProfile);
    cardHeader.appendChild(socialIcon);
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.style.backgroundImage = `url(${el.image})`;
    cardWraper.appendChild(cardHeader);
    cardWraper.appendChild(cardBody);
    const p2 = document.createElement("p");
    p2.textContent = el.caption;
    cardWraper.appendChild(p2);
    card.appendChild(cardWraper);
    let footerWraper = document.createElement("div");
    footerWraper.classList.add("footer-wraper");
    let hr = document.createElement("hr");
    hr.classList.add("hr");
    footerWraper.appendChild(hr);
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    const p3 = document.createElement("p");
    p3.textContent = `${+el.likes + likeCounter}`;
    let heartImg = document.createElement("span");
    heartImg.innerHTML = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M14.7617 3.26543C14.3999 2.90347 13.9703 2.61634 13.4976 2.42045C13.0248 2.22455 12.518 2.12372 12.0063 2.12372C11.4945 2.12372 10.9878 2.22455 10.515 2.42045C10.0422 2.61634 9.61263 2.90347 9.25085 3.26543L8.50001 4.01626L7.74918 3.26543C7.0184 2.53465 6.02725 2.1241 4.99376 2.1241C3.96028 2.1241 2.96913 2.53465 2.23835 3.26543C1.50756 3.99621 1.09702 4.98736 1.09702 6.02084C1.09702 7.05433 1.50756 8.04548 2.23835 8.77626L2.98918 9.52709L8.50001 15.0379L14.0108 9.52709L14.7617 8.77626C15.1236 8.41448 15.4108 7.98492 15.6067 7.51214C15.8026 7.03935 15.9034 6.53261 15.9034 6.02084C15.9034 5.50908 15.8026 5.00233 15.6067 4.52955C15.4108 4.05677 15.1236 3.62721 14.7617 3.26543V3.26543Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
   </svg>`;
    heartImg.addEventListener("click", function () {
      if (!isLiked) {
        likeCounter++;
        heartImg.classList.add("imgPath");
        isLiked = true;
        p3.textContent = `${+el.likes + likeCounter}`;
      } else {
        likeCounter--;
        heartImg.classList.remove("imgPath");
        isLiked = false;
        p3.textContent = `${+el.likes + likeCounter}`;
      }
    });
    cardFooter.appendChild(heartImg);
    cardFooter.appendChild(p3);
    footerWraper.appendChild(cardFooter);
    card.appendChild(footerWraper);
    grid.appendChild(card);
    changeBackgroundColor(card);
    changeCardSpaceBetween(grid);
  });
  const allCards = document.querySelectorAll(
    ".card:not([style='display: flex;'])"
  );
  for (let i = 4; i < allCards.length; i++) {
    allCards[i].classList.add("hidden");
  }
  loadMoreBtn.addEventListener("click", loadMoreCards);
}

cardSpace.forEach((el) => {
  el.addEventListener("change", function () {
    if (toggleBackground == false) {
      let radioButtonChecked = document.querySelectorAll(".card");
      radioButtonChecked.forEach((el) => el.classList.add("dark-mode"));
      toggleBackground = true;
    } else {
      let radioButtonChecked = document.querySelectorAll(".card");
      radioButtonChecked.forEach((el) => el.classList.remove("dark-mode"));
      toggleBackground = false;
    }
  });
});

function loadMoreCards() {
  const cardsToLoad = Array.from(document.querySelectorAll(".hidden")).slice(
    0,
    cardsPerLoad
  );
  cardsToLoad.forEach((card) => card.classList.remove("hidden"));
  currentCardIndex += cardsPerLoad;
  if (currentCardIndex >= document.querySelectorAll(".card").length) {
    loadMoreBtn.classList.add("noContent");
    currentCardIndex = cardsPerLoad;
  }
}
