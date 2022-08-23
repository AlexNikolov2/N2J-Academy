let thumbnails = document.querySelectorAll(".thumbnails button");
let profileIcon = document.querySelector("#profile-icon");
let amountButtons = document.querySelectorAll(".amount button");
let cart = document.querySelector(".cart");
let cartIcon = document.getElementById("cart-grey");
var isCartOpen = false;
var images = document.querySelectorAll(".container-left>img");
let cartFull = document.querySelector(".cart-full");
const addButton = document.getElementById("add-button");
var k = 0; 

addButton.disabled = true;

function thumbFocus() {
  for(i=0; i<thumbnails.length; i++){
    thumbnails[i].style.borderStyle = "none";
    thumbnails[i].querySelector("img").style.opacity = "1";
  }
  this.querySelector("img").style.opacity = "0.25";
  this.style.borderStyle = "solid";
}

function thumbFocusLightbox() {
  for(i=0; i<thumbnails.length; i++){
    thumbnailsLightbox[i].style.borderStyle = "none";
    thumbnailsLightbox[i].querySelector("img").style.opacity = "1";
  }
  this.querySelector("img").style.opacity = "0.25";
  this.style.borderStyle = "solid";
}

function thumbMouseOver() {
  const image = this.querySelector("img");
  const styles = window.getComputedStyle(image);
  const opacity = styles.opacity;
  if (opacity == 1) {
    this.querySelector("img").style.opacity = "0.5";
  }
}

function thumbMouseOut() {
  const image = this.querySelector("img");
  const styles = window.getComputedStyle(image);
  const opacity = styles.opacity;
  if (opacity == 0.5) {
    this.querySelector("img").style.opacity = "1";
  }
}


function profileIconHover() {
  this.style.borderStyle = "solid";
  this.querySelector("img").style.top = "0px";
  this.querySelector("img").style.left = "0px";
}

function profileIconUnhover() {
  this.style.borderStyle = "none";
  this.querySelector("img").style.top = "2px";
  this.querySelector("img").style.left = "2px";
}

function buttonHover() {
  this.querySelector("use").style.fill = "#FFAB6A";
}

function buttonUnhover() {
  this.querySelector("use").style.fill = "#FF7E1B";
}

function cartToggle() {
  if (isCartOpen) {
    cart.style.display = "none";
    isCartOpen = false;
    this.querySelector("path").setAttribute("fill", "#69707D");

  } else {
    cart.style.display = "inline";
    isCartOpen = true;
    this.querySelector("path").setAttribute("fill", "#1D2026");
  }
}

function amountSubstract() {
  let amount = document.querySelector(".amount-number").innerHTML;
  if (amount > 0) {
    amount--;
    document.querySelector(".amount-number").innerHTML = amount;
    if (amount == 0) {
      addButton.disabled = true;
    }
  }
}

function amountAdd() {
  let amount = document.querySelector(".amount-number").innerHTML;
  amount++;
  document.querySelector(".amount-number").innerHTML = amount;
  if (amount == 1) {
    addButton.disabled = false;
  }
}

for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("mouseover", thumbMouseOver);
  thumbnails[i].addEventListener("mouseout", thumbMouseOut);
  thumbnails[i].addEventListener("focus", thumbFocus);
  thumbnails[i].addEventListener("focus", () => {
    for (let j = 0; j < thumbnails.length; j++) {
      images[j].style.display = "none";
    }
    images[i].style.display = "inline";
  })

}

profileIcon.addEventListener("mouseover", profileIconHover);
profileIcon.addEventListener("mouseout", profileIconUnhover)

amountButtons[0].addEventListener("mouseover", buttonHover);
amountButtons[1].addEventListener("mouseover", buttonHover);

amountButtons[0].addEventListener("mouseout", buttonUnhover);
amountButtons[1].addEventListener("mouseout", buttonUnhover);

amountButtons[0].addEventListener("click", amountSubstract);
amountButtons[1].addEventListener("click", amountAdd);

cartIcon.addEventListener("click", cartToggle);

addButton.addEventListener("click", addToCart);

var cartItems = [];

function addToCart() {
  let cartInfo = {};
  let sPrice = document.querySelector(".container-right h3").innerHTML;
  sPrice = sPrice.slice(1);
  const name = document.querySelector(".container-right h2").innerHTML;
  cartInfo.amount = document.querySelector(".amount-number").innerHTML;
  cartInfo.amount = parseFloat(cartInfo.amount);
  cartInfo.imageUrl = document.querySelector(".thumbnails img").getAttribute("src");
  let tPrice = parseFloat(sPrice) * cartInfo.amount;
  tPrice = parseFloat(tPrice).toFixed(2);

  cartInfo.content = `<p>${name}<br>$${sPrice} x ${cartInfo.amount}<b> $${tPrice}</b></p>`;

  cart.style.display = "inline";
  cart.querySelector(".cart-full").style.display = "block";
  cart.querySelector(".cart-empty").style.display = "none";
  isCartOpen = true;

  cartItems.push(cartInfo);


  renderCart();

}

function renderCart() {
  if (cartItems.length === 0) { 
    document.querySelector(".cart-full").style.display = "none";
    document.querySelector(".cart-empty").style.display = "block";
    document.getElementById("cart-number").style.display = "none";
  } else { 
    document.querySelector(".cart-content").innerHTML = "";
    var totalAmount = 0;
    for (let i = 0; i < cartItems.length; i++) {

      totalAmount += cartItems[i].amount;
      var productImage = document.createElement("img");
      var productDescription = document.createElement("p");
      var productDelete = document.createElement("img");

      productImage.setAttribute("src", cartItems[i].imageUrl);
      productImage.className = " product-image";

      productDescription.innerHTML = cartItems[i].content;

      productDelete.setAttribute("src", "images/icon-delete.svg");
      productDelete.className = " icon-delete";

      var productContainer = document.createElement("div");
      productContainer.className = "product-container";
      productContainer.appendChild(productImage);
      productContainer.appendChild(productDescription);
      productContainer.appendChild(productDelete);

      document.querySelector(".cart-content").appendChild(productContainer);

      productDelete.addEventListener("click", deleteItem);

      function deleteItem() {
        cartItems.splice(i, 1);
        renderCart();
      }

    }

    document.getElementById("cart-number").innerHTML = totalAmount;
    document.getElementById("cart-number").style.display = "inline";
  }
}

let closeButton = document.querySelector(".container-lightbox svg");
let thumbnailsLightbox = document.querySelectorAll(".thumbnails-lightbox button");
let imagesLightbox = document.querySelectorAll(".lightbox-content>img");

for (let i = 0; i < images.length; i++) { 
  images[i].addEventListener("click", () => {
    document.querySelector(".lightbox").style.display = "inline"; 
    for (let j = 0; j < images.length; j++) {
      imagesLightbox[j].style.display = "none"; 
    }
    imagesLightbox[i].style.display = "inline";
    thumbnailsLightbox[i].focus();
    k = i;
  })
}

closeButton.addEventListener("click", () => { 
  document.querySelector(".lightbox").style.display = "none";
  thumbnails[0].focus();

})

for (let i = 0; i < thumbnailsLightbox.length; i++) {
  thumbnailsLightbox[i].addEventListener("mouseover", thumbMouseOver);
  thumbnailsLightbox[i].addEventListener("mouseout", thumbMouseOut);
  thumbnailsLightbox[i].addEventListener("focus", thumbFocusLightbox);
  thumbnailsLightbox[i].addEventListener("focus", () => { 
    for (let j = 0; j < thumbnailsLightbox.length; j++) {
      imagesLightbox[j].style.display = "none";
    }
    imagesLightbox[i].style.display = "inline";
    k = i;
  })
}

let arrows = document.querySelectorAll(".lightbox-content>button");

arrows[0].addEventListener("mouseover", arrowHover);
arrows[0].addEventListener("mouseout", arrowUnhover);
arrows[1].addEventListener("mouseover", arrowHover);
arrows[1].addEventListener("mouseout", arrowUnhover);

arrows[0].addEventListener("click", arrowPrev);
arrows[1].addEventListener("click", arrowNext);


function arrowHover() {
  this.querySelector("path").setAttribute("stroke", "#FF7E1B");
}

function arrowUnhover() {
  this.querySelector("path").setAttribute("stroke", "#1D2026");
}

function arrowPrev() {
  if (k > 0) {
    k--;
  }
  thumbnailsLightbox[k].focus();

}

function arrowNext() {
  if (k < 3) {
    k++;
  }
  thumbnailsLightbox[k].focus();
}

let arrowsMobile = document.querySelectorAll(".arrows-mobile");
var q=0; 

arrowsMobile[0].addEventListener("click", mobilePrev);
arrowsMobile[1].addEventListener("click", mobileNext);

function mobilePrev() {
  if(q>0){
    q--;
    for(let i=0; i<images.length; i++){
      images[i].style.display = "none";
    }
    images[q].style.display = "inline";
  }
}

function mobileNext() {
  if(q<(images.length - 1)){
    q++;
    for(let i=0; i<images.length; i++){
      images[i].style.display = "none";
    }
    images[q].style.display = "inline";
  }
}


let closeMenu = document.querySelector(".menu-mobile-content img");
let openMenu = document.getElementById("icon-menu");

openMenu.addEventListener("click", ()=>{
  document.querySelector(".menu-mobile").style.display = "block";
})

closeMenu.addEventListener("click", ()=>{
  document.querySelector(".menu-mobile").style.display = "none";
})