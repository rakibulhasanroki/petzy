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
const activeButton = (id) => {
  const getButtons = document.getElementsByClassName("categories");
  for (const btn of getButtons) {
    btn.classList.remove("active");
  }
  id.classList.add("active");
};

// load all pets-card

const loadPets = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  displayPets(data.pets);
};

const displayPets = (pets) => {
  pets.forEach((pet) => {
    const petContainer = document.getElementById("pet-card");
    const card = document.createElement("div");
    card.classList = "p-5 rounded-xl shadow-2xl border border-gray-100";

    card.innerHTML = `
    <div>
    <img src="" alt="" />
  </div>
  <div class="">
    <h1 class="text-xl font-bold">Mister Tartosh</h1>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/square.png" alt="" class="object-cover w-5 h-5" />
      <span>Breed: Golder retriever</span>
    </div>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/calender.png" alt="" class="object-cover w-5 h-5" />
      <span>Birth: 2024</span>
    </div>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/gender.png" alt="" class="object-cover w-5 h-5" />
      <span>Gender: Female</span>
    </div>
    <div class="flex gap-1 items-center text-gray-400 text-base">
      <img src="./images/price.png" alt="" class="object-cover w-5 h-5" />
      <span>Price : 199$</span>
    </div>
  </div>
  <div class="border border-gray-400"></div>
  <div class="flex justify-between mt-6">
    <div>
      <button class="btn">
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
    `;

    petContainer.append(card);
  });
};

loadPets();
loadCategories();
