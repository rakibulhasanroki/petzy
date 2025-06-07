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
     onclick="activeButton(this); categoriesName('${pet.category}');"
     >
      <img src=${pet.category_icon}   alt="" />
        <span>${pet.category}</span>
    </button>
      `;

    categoriesSection.append(btnConatiner);
  });
};

// display pet by categories

const categoriesName = async (categoryName) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await res.json();
  sortByPrice(data.data);
  displayPets(data.data);
};

const activeButton = (e) => {
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
  displayPets(data.pets);
  sortByPrice(data.pets);
};

const displayPets = (pets) => {
  const petContainer = document.getElementById("pet-card");
  petContainer.innerHTML = "";
  if (pets == "") {
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `
    <h1 class="text-center text-4xl font-bold">No Content Here</h1>
    
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
  <div class="border border-gray-400"></div>
  <div class="flex justify-between mt-6">
    <div>
      <button class="btn" onclick="likedPhoto(${pet.petId})">
        <img src="./images/like.png" alt="" />
      </button>
    </div>
    <div>
      <button class="btn text-teal-600 text-base">Adopt</button>
    </div>
    <div>
      <button class="btn text-teal-600 text-base">Details</button>
    </div>
  </div>
    </div>
    `;

    petContainer.append(card);
  });
};

// sort by price

const sortByPrice = (pets) => {
  const sortButton = document.getElementById("sort-btn");
  sortButton.addEventListener("click", () => {
    pets.sort((a, b) => b.price - a.price);
    displayPets(pets);
  });
};

const likedPhoto = (petId) => {
  const getPet = document.getElementById(`pet-${petId}`);
  const imgdiv = getPet.querySelector("div");
  const img = imgdiv.querySelector("img").cloneNode(true);

  const petImgConatiner = document.getElementById("pet-img");

  const petImg = document.createElement("div");
  petImg.append(img);
  petImg.classList = "";

  petImgConatiner.append(petImg);
};

loadPets();
loadCategories();
