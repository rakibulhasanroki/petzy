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
     <button id=${pet.id} class="w-full lg:w-[200px] xl:w-[264px] btn rounded-xl text-2xl font-bold px-12 py-10 categories"
     onclick="activeButton(this)"
     >
      <img src=${pet.category_icon}   alt="" />
        <span>${pet.category}</span>
    </button>
      `;

    categoriesSection.append(btnConatiner);
  });
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

// {
//   "petId": 1,
//   "breed": "Golden Retriever",
//   "category": "Dog",
//   "date_of_birth": "2023-01-15",
//   "price": 1200,
//   "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//   "gender": "Male",
//   "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//   "vaccinated_status": "Fully",
//   "pet_name": "Sunny"
// }

const displayPets = (pets) => {
  const petContainer = document.getElementById("pet-card");
  petContainer.innerHTML = "";
  pets.forEach((pet) => {
    // console.log(pet);
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
  console.log(petImg);
  petImgConatiner.append(petImg);
};

loadPets();
loadCategories();
