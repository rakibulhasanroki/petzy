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

loadCategories();
