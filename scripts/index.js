const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );

  const data = await res.json();

  displayCategories(data.categories);
};

const displayCategories = (categories) => {
  const categoriesSection = document.getElementById("categories");

  categories.forEach((pet) => {
    const btnConatiner = document.createElement("div");
    if (pet.id === 1) {
      btnConatiner.classList = "lg:justify-self-start ";
    } else if (pet.id === 2) {
      btnConatiner.classList = "lg:justify-self-center ";
    } else if (pet.id === 3) {
      btnConatiner.classList = "lg:justify-self-center ";
    } else if (pet.id === 4) {
      btnConatiner.classList = "lg:justify-self-end";
    }

    btnConatiner.innerHTML = `
     <button id=${pet.id}  class="w-full lg:w-[200px] xl:w-[264px] btn rounded-xl text-2xl font-bold px-12 py-10 categories"
     onclick="activeButton(this,'${pet.category}')"
     >
      <img src=${pet.category_icon}   alt="" />
        <span>${pet.category}</span>
    </button>
      `;

    categoriesSection.append(btnConatiner);
  });
};

// spiner
const withSpinner = async (newFunction) => {
  const loading = document.createElement("div");
  const petContainer = document.getElementById("pet-card");
  petContainer.innerHTML = "";
  loading.classList = "flex justify-center";
  loading.innerHTML = `
  <span class="loading loading-bars loading-xl"></span>
  `;
  petContainer.classList.remove("grid");
  petContainer.append(loading);

  const delayed = new Promise((resolve) => setTimeout(resolve, 2000));
  const [data] = await Promise.all([newFunction(), delayed]);

  if (data.pets) {
    displayPets(data.pets);
  } else if (data.data) {
    displayPets(data.data);
  }
};

// display pet by categories

const categoriesName = async (categoryName) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await res.json();

  sortByPrice(data.data);
  return data;
};

// withSpinner(categoriesName);
const activeButton = (e, categoryName) => {
  withSpinner(() => categoriesName(categoryName));
  const getButtons = document.getElementsByClassName("categories");
  for (const btn of getButtons) {
    btn.classList.remove("active");
  }
  e.classList.add("active");
};

// load all pets-card

const loadPets = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  sortByPrice(data.pets);
  return data;
};

const displayPets = (pets) => {
  const petContainer = document.getElementById("pet-card");
  petContainer.innerHTML = "";
  if (pets == "") {
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `
    <div class=" bg-gray-100 shadow-lg md:p-20 p-10 flex justify-center flex-col items-center rounded-lg text-center">
    <div>
    <img src="./images/no-info.png"/>
    </div>
    <div>
    <h1 class="text-3xl font-bold">No Information Available</h1>
    <p class="text-gray-400 text-base">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
      its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    </div>
    
    `;
  } else {
    petContainer.classList.add("grid");
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "p-5 rounded-xl shadow-2xl border border-gray-100";

    card.innerHTML = `
    <div id = pet-${pet.petId}>
    <div>
    <img src=${
      pet.image
    } alt="" class="w-full h-full object-cover rounded-lg" />
  </div>
  <div class="mt-4">
    <h1 class="text-xl font-bold">${pet.pet_name}</h1>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/square.png" alt="" class="object-cover w-5 h-5" />
      <span>Breed:${pet.breed}</span>
    </div>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/calender.png" alt="" class="object-cover w-5 h-5" />
       ${
         pet.date_of_birth === null || pet.date_of_birth === undefined
           ? "No info available"
           : ` <span><span>${pet.date_of_birth}</span></span>`
       }
    </div>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/gender.png" alt="" class="object-cover w-5 h-5" />
       ${
         pet.gender === null || pet.gender === undefined
           ? "No info available"
           : ` <span>Gender : <span>${pet.gender}</span></span>`
       }
    </div>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/price.png" alt="" class="object-cover w-5 h-5" />
     ${
       pet.price === null || pet.price === undefined
         ? "No price tag added"
         : ` <span>Price : <span>${pet.price}</span> $</span>`
     }
    </div>
  </div>
  <div class="border border-gray-400"></div>
  <div class="flex justify-between mt-6">
    <div>
      <button class="btn" onclick="likedPhoto(${pet.petId})">
        <img src="./images/like.png" alt="" />
      </button>
    </div>
    <div>
      <button id="adopt-${
        pet.petId
      }" class="btn text-teal-600 text-base"  onclick="adopted(this);">Adopt</button>
    </div>
    <div>
      <button class="btn text-teal-600 text-base"   onclick="showModal(${
        pet.petId
      }); customModal.showModal();">Details</button>
    </div>
  </div>
    </div>
    `;

    petContainer.append(card);
  });
  displaySessionStorage();
};

// sort by price

const sortByPrice = (pets) => {
  const sortButton = document.getElementById("sort-btn");
  sortButton.addEventListener("click", () => {
    if (!!sortButton) {
      pets.sort((a, b) => b.price - a.price);
      displayPets(pets);
    }
  });
};

const likedPhoto = (petId) => {
  const getPet = document.getElementById(`pet-${petId}`);
  const imgdiv = getPet.querySelector("div");
  const img = imgdiv.querySelector("img").cloneNode(true);

  const imgSrc = img.src;
  const btnId = getPet.id;

  const petImgConatiner = document.getElementById("pet-img");
  const petImg = document.createElement("div");

  petImg.id = `liked-${petId}`;
  const likeId = petImg.id;

  if (document.getElementById(likeId)) {
    return;
  } else {
    petImg.append(img);
    petImgConatiner.append(petImg);
    const getItem = getPhotoStorage();
    getItem[btnId] = imgSrc;
    sessionStorage.setItem("photo", JSON.stringify(getItem));
  }
};

const showModal = async (pet_id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${pet_id}`
  );

  const data = await res.json();
  const pet = data.petData;
  console.log(pet);
  const modalContainer = document.getElementById("modal-content");

  modalContainer.innerHTML = `

  <div>
    <img src=${
      pet.image
    } alt="" class="w-full h-full object-cover rounded-lg" />
  </div>
  <div class="mt-4">
    <h1 class="text-xl font-bold">${pet.pet_name}</h1>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/square.png" alt="" class="object-cover w-5 h-5" />
      <span>Breed:${pet.breed}</span>
    </div>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/calender.png" alt="" class="object-cover w-5 h-5" />
      <span>${pet.date_of_birth}</span>
    </div>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/gender.png" alt="" class="object-cover w-5 h-5" />
      <span>Gender: ${pet.gender}</span>
    </div>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/price.png" alt="" class="object-cover w-5 h-5" />
     ${
       pet.price === null
         ? "No price tag added"
         : ` <span>Price : <span>${pet.price}</span> $</span>`
     }
    </div>
  </div>
  <div class="border border-gray-300"></div>
  <div class="space-y-2">
  <h3 class="text-base font-bold">Details Information</h3>
  <p>${pet.pet_details}</p>
  </div>

  
  `;
};

const adopted = (adoptButton) => {
  console.log(adoptButton);
  const countdown = document.getElementById("countdown");
  adoptButton.innerText = "Adopted";
  adoptButton.disabled = true;
  adoptButton.style.backgroundColor = "#aaa";
  adoptButton.style.cursor = "not-allowed";
  countdown.innerHTML = `
  
   <div class="w-full h-full bg-black fixed opacity-80"></div>
  <div
    class="w-[300px] h-[300px] inset-0 m-auto bg-white fixed  rounded-lg flex justify-center flex-col items-center"
  >
    <h1 class="text-3xl font-bold">Processing</h1>
    <p class="text-3xl font-bold" id="sec"></p>
  </div>
  
  `;
  let timeLeft = 3;

  const interval = setInterval(() => {
    sec.innerText = timeLeft--;
    if (timeLeft < 0) {
      clearInterval(interval);
      countdown.innerHTML = "";
    }
  }, 1000);
  setSessionStorage(adoptButton);
};
// for adopt button storage
const setSessionStorage = (btn) => {
  const getItem = getSessionStorage();
  const id = btn.id;
  getItem[id] = {
    innerText: btn.innerText,
    disabled: btn.disabled,
    bgColor: btn.style.backgroundColor,
  };
  sessionStorage.setItem("adopt", JSON.stringify(getItem));
};

const getSessionStorage = () => {
  let emptyObj = {};
  const getItem = sessionStorage.getItem("adopt");
  if (getItem) {
    emptyObj = JSON.parse(getItem);
  }

  return emptyObj;
};

const displaySessionStorage = () => {
  const storage = getSessionStorage();

  for (let id in storage) {
    const peserveItem = storage[id];
    const btnId = document.getElementById(id);
    if (!btnId) {
      continue;
    }
    btnId.innerText = peserveItem.innerText;
    btnId.style.backgroundColor = peserveItem.bgColor;
    btnId.disabled = peserveItem.disabled;
  }
};
// for photos storage
const setPhotoStorage = (btn) => {};

const getPhotoStorage = () => {
  let obj = {};
  let getItem = sessionStorage.getItem("photo");
  if (getItem) {
    obj = JSON.parse(getItem);
  }

  return obj;
};

const displayPhotoSTorage = () => {
  const storage = getPhotoStorage();
  for (id in storage) {
    const imgSrc = storage[id];

    const img = document.createElement("img");
    img.src = imgSrc;
    img.classList = "rounded-xl";
    const petImgConatiner = document.getElementById("pet-img");

    const petImg = document.createElement("div");

    const likedId = id.replace("pet", "liked");
    petImg.id = likedId;
    petImg.append(img);
    petImgConatiner.append(petImg);
  }
};

const removePhoto = () => {
  const imgContainer = document.getElementById("pet-img");
  imgContainer.addEventListener("click", (e) => {
    const clikedItem = e.target.parentElement;
    const likedId = clikedItem.id;
    const petId = likedId.replace("liked", "pet");
    const getItem = getPhotoStorage();
    delete getItem[petId];

    sessionStorage.setItem("photo", JSON.stringify(getItem));
    clikedItem.remove();
  });
};
withSpinner(loadPets);
loadCategories();
displayPhotoSTorage();
removePhoto();
