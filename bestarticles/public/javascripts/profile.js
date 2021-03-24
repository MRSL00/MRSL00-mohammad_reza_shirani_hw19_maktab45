const $button = document.querySelector("#sidebar-toggle");
const $wrapper = document.querySelector("#wrapper");

document.querySelector(".style-eight").style.setProperty("--left", "7rem");

$button.addEventListener("click", (e) => {
  e.preventDefault();

  $wrapper.classList.toggle("toggled");
  if ($wrapper.classList.value) {
    document.getElementById("photo").style.cssText =
      "margin-left: 22rem !important;";
    document.querySelector(".style-eight").style.setProperty("--left", "1rem");
  } else {
    document.getElementById("photo").style.cssText =
      "margin-left: 15rem !important;";
    document.querySelector(".style-eight").style.setProperty("--left", "7rem");
  }
});
