export const calendarioEntregas = () => {
  const d = document;
  const fechaActual = new Date();

  const renderizadoMes = () => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];

    const calendario = d.querySelector(".calendario");

    const fechaCompleta = `${
      diasSemana[new Date().getDay()]
    } ${new Date().getDate()}, ${
      meses[new Date().getMonth()]
    }, ${new Date().getFullYear()}`;

    const indexPrimerDia = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      1
    ).getDay();

    const indexUltimoDia = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth() + 1,
      0
    ).getDay();

    const ultimoDiaMes = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth() + 1,
      0
    ).getDate();

    const ultimoDiaMesAnterior = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      0
    ).getDate();

    const diasSiguientes = 7 - indexUltimoDia;

    let dias = "";

    const diasMes = d.querySelector(".mes-completo");

    d.querySelector(".mes-actual").innerHTML = meses[fechaActual.getMonth()];

    d.querySelector(".fecha-actual").innerHTML = fechaCompleta;

    for (let j = indexPrimerDia; j > 1; j--) {
      dias += `<div class="dia dia-mes-ant">${
        ultimoDiaMesAnterior - j + 2
      }</div>`;
    }

    for (let i = 1; i <= ultimoDiaMes; i++) {
      if (
        new Date().getDate() === i &&
        fechaActual.getMonth() === new Date().getMonth()
      ) {
        dias += `<div class = "dia dia-actual">${i}</div>`;
      } else {
        dias += `<div class = "dia">${i}</div>`;
      }
    }

    for (let x = 1; x <= diasSiguientes; x++) {
      dias += `<div class="dia dia-mes-sig">${x}</div>`;
      diasMes.innerHTML = dias;
    }

    const eventoDia = d.querySelector(".evento-dia");

    d.querySelectorAll(".dia").forEach((dia) => {
      dia.addEventListener("click", () => {
        eventoDia.style.visibility = "visible";
      });
    });
  };

  d.querySelector(".ant").addEventListener("click", () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    renderizadoMes();
  });
  d.querySelector(".sig").addEventListener("click", () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    renderizadoMes();
  });

  const eventosDia = () => {
    const ventanaEvento = d.querySelector(".evento-dia");
    const botonCerrar = d.querySelector(".btn-cerrar");

    botonCerrar.addEventListener("click", () => {
      ventanaEvento.style.visibility = "hidden";
    });
  };

  eventosDia();
  renderizadoMes();
};
