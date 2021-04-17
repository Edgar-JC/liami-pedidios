export const hamburgerMenu = () => {
  const d = document;
  const hamburgerBtn = d.querySelector(".btn-hamburger");
  const panelEnlaces = d.querySelector(".enlaces");
  const main = d.querySelector(".main-pagina");

  hamburgerBtn.addEventListener("click", () => {
    panelEnlaces.classList.toggle("is-active");
    hamburgerBtn.classList.toggle("toggle");
    main.classList.toggle("oculto");
  });
};
