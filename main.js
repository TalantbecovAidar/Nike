// http://localhost:8000/product
let API = "http://localhost:8000/product"

let inpDetails = document.querySelector(".section__add_details")
let inpPrice = document.querySelector(".section__add_price")
let inpQuantity = document.querySelector(".section__add_quantity")
let inpSales = document.querySelector(".section__add_sales")
let inpCategory = document.querySelector(".section__add_category")
let inpUrl = document.querySelector(".section__add_url")
let btnAdd = document.querySelector(".section__add_btn-add")
let accordion = document.querySelector("#accordion__header")
console.log(inpCategory, inpDetails, inpPrice, inpQuantity, inpSales, inpUrl, btnAdd, accordion)


let sectionRead = document.getElementById("section__read")


// !=========== КОДОВОЕ СЛОВО ==========
let section_add = document.querySelector(".section__add");
let clickAdmin = document.getElementById("open-admin");
// let admin_panel_arr = document.getElementsByClassName("admin-panel");
let code = "";
console.log(section_add, clickAdmin);

function adminReturn() {
  section_add.style.display = "block";
  // if (code == "70-80") {
  //   setTimeout(() => {
  //     for (let i of admin_panel_arr) {
  //       i.style.display = "block";
  //     }
  //   }, 50);
  // }
}

clickAdmin.addEventListener("click", ()=> {
  code = prompt("введите кодовое слово")
  if (code == "lera") {
    section_add.style.display = "block"
  } else {
    section_add.style.display = "none"
  }
})

//!==================== accordion start ==============================
accordion.addEventListener("click",()=>{
  accordion.classList.toggle("active")
  let accordionBody = document.getElementById("accordion__body");
  if (accordion.classList.contains("active")) {
    accordionBody.style.maxHeight = 
    accordionBody.scrollHeight + "px"
  }else{
    accordionBody.style.maxHeight = 0
  }
})

// async function createProduct(){
//   await fetch(API, {
//     method: "POST",
//     headers:{
//       "Content-type" : "application/json; charset=utf-8"
//     },
//     body: JSON.stringify(obj)
//   }).then((res) => res.json())
// }

async function createProduct(obj) {
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then((res) => res.json());
}

btnAdd.addEventListener("click", ()=> {
    // проверка на заполненность полей
    if(!inpDetails.value.trim() || 
    !inpCategory.value.trim() ||
    !inpPrice.value.trim() || 
    !inpQuantity.value.trim() || 
    !inpSales.value.trim() ||     
    !inpUrl.value.trim() ){
      alert("Заполните поля")
      return;
    }
    let obj = {
      details: inpDetails.value,
      price: inpPrice.value,
      quanlity: inpQuantity.value,
      category: inpCategory.value,
      sale: inpSales.value,
      urlImg: inpUrl.value,    
    }
    console.log(obj)
    createProduct(obj)
    inpDetails.value = "";
    inpQuantity.value = "";
    inpPrice.value = "";
    inpCategory.value = "";
    inpSales.value = "";
    inpUrl.value = "";
})

// <!-- ! READ START -->
    // `<section id="section__read"></section>`
    // <!-- ! READ End -->
      

//! read product 
async function readProducts() {
  let data = await fetch(API).then((res) => res.json());
  console.log(data);
  sectionRead.innerHTML = "";
  data.forEach((item) => {
    // let productCard = document.createElement("div");
    sectionRead.innerHTML += `
      <div class="card">
        <div class="card2">
          <div class="front2" style="background-image: url(${item.urlImg})"></div>
          <div class="back2">
            <div id="card-details2">
            <p>${item.details}</p>
            </div>
          </div>
          <div class="text">
            <h2>${item.category}</h2>
            <span class="card_price">Цена: ${item.price} сом</span>
            <br />
            <span class="card_sales">Скидка: ${item.sale} %</span>
          </div>
          <div class="userIcon" id="userPanel">
            <img src="https://cdn-icons-png.flaticon.com/512/2107/2107956.png" alt="" width="20px" />
            <button class="btnBuy">Выбрать</button>
          </div>
          <div class="admin-panel" id="admin">
            <img src="https://cdn-icons-png.flaticon.com/512/1799/1799391.png" width="20px" class="read_del" />
            <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" width="20px" />
          </div>
        </div>
      </div>
    `;
  });
}
readProducts();