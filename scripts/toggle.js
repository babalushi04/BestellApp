const toggleButton = document.querySelector(".toggle_button");
const listContainer = document.getElementById("list_cont");

toggleButton.addEventListener("click", () => {
  listContainer.classList.toggle("active");
});


const navLinks = document.querySelectorAll(".list_container a");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", () => {
    listContainer.classList.remove("active");
  });
}