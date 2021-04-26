export const calendarioEntregas = () => {
  const d = document;
  const fechaActual = new Date();

  //Obtener datos de JSON
  const obtenerDatosPedidos = () => {
    const archivo = "/js/pedidos.json";

    fetch(archivo)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const { pedidos } = datos;
        pedidos.forEach((element) => {
          const { diaEntrega, mesEntrega, anioEntrega } = element;
          const prueba = `dia${diaEntrega}-${mesEntrega}-${anioEntrega}`;
          const idPrueba = d.querySelector(`#${prueba}`);
          if (idPrueba) {
            idPrueba.classList.add("dia-entrega");
          }
        });
      });
  };

  const renderizadoMes = () => {
    obtenerDatosPedidos();
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

    d.querySelector(".mes-actual").innerHTML = `${
      meses[fechaActual.getMonth()]
    } ${fechaActual.getFullYear()}`;

    d.querySelector(".fecha-actual").innerHTML = fechaCompleta;

    //genera los ultimos dias del mes anterior
    for (let j = indexPrimerDia; j > 1; j--) {
      dias += `<div class="dia dia-mes-ant">${
        ultimoDiaMesAnterior - j + 2
      }</div>`;
    }

    //genera los dias del mes en curso

    for (let i = 1; i <= ultimoDiaMes; i++) {
      if (
        new Date().getDate() === i &&
        fechaActual.getMonth() === new Date().getMonth()
      ) {
        dias += `<div id = "dia${i}-${
          fechaActual.getMonth() + 1
        }-${fechaActual.getFullYear()}" class = "dia dia-actual">${i}</div>`;
      } else {
        dias += `<div id = "dia${i}-${
          fechaActual.getMonth() + 1
        }-${fechaActual.getFullYear()}" class = "dia">${i}</div>`;
      }
    }

    //Genera los primeros dias del mes siguiente
    for (let x = 1; x <= diasSiguientes; x++) {
      dias += `<div class="dia dia-mes-sig">${x}</div>`;
      diasMes.innerHTML = dias;
    }

    //Abrir la ventana de eventos en un dia
    const eventoVentana = () => {
      const eventoDia = d.querySelector(".evento-dia");
      d.querySelectorAll(".dia").forEach((dia) => {
        dia.addEventListener("click", () => {
          eventoDia.style.visibility = "visible";
        });
      });
    };

    eventoVentana();
  };

  //Generar el renderizado de los siguientes o anteriores meses
  d.querySelector(".ant").addEventListener("click", () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    renderizadoMes();
  });
  d.querySelector(".sig").addEventListener("click", () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    renderizadoMes();
  });

  //Funcion para cerrar la ventana de eventos
  const cerrarVentanaEventos = () => {
    const ventanaEvento = d.querySelector(".evento-dia");
    const botonCerrar = d.querySelector(".btn-cerrar");

    botonCerrar.addEventListener("click", () => {
      ventanaEvento.style.visibility = "hidden";
    });
  };

  // const mensajeCalendario = `Pedido #${idPedido}\n${nombreCliente}\nTel. ${numeroTelefono}\nCol. ${zonaEntrega}\n${cantidadPinatas} ${
  //   cantidadPinatas > 1 ? "pinatas" : "pinata"
  // }`;

  // Invocacion de funciones
  cerrarVentanaEventos();
  renderizadoMes();
};
