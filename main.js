const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.style.backgroundColor = "#FBF4E9";
    navbar.style.backgroundColor = "#6ECB63";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
});
