export const calendarioEntregas = () => {
  const d = document;
  const fechaActual = new Date();
  const click = null;
  const archivo = "/js/pedidos.json";

  //Obtener datos de JSON para marcar dias de entrega
  const obtenerDatosPedidos = () => {
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
          if (dia.classList.contains("dia-entrega")) {
            eventoDia.style.visibility = "visible";
          }
        });
      });
    };

    const cerrarVentanaEventos = () => {
      const ventanaEvento = d.querySelector(".evento-dia");
      const botonCerrar = d.querySelector(".btn-cerrar");

      botonCerrar.addEventListener("click", () => {
        ventanaEvento.style.visibility = "hidden";
        const infoPedido = d.querySelector(".datos-pedido");
        ventanaEvento.removeChild(infoPedido);
      });
    };

    const mostrarDatosPedido = () => {
      fetch(archivo)
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          const { pedidos } = datos;
          pedidos.forEach((element) => {
            const {
              idPedido,
              nombreCliente,
              numeroTelefono,
              tipoEntrega,
              diaEntrega,
              mesEntrega,
              anioEntrega,
              pinatas,
              img,
              total,
            } = element;
            d.querySelectorAll(".dia").forEach((dia) => {
              dia.addEventListener("click", () => {
                if (
                  dia.id === `dia${diaEntrega}-${mesEntrega}-${anioEntrega}`
                ) {
                  const datosPedido = d.createElement("div");
                  const numeroPedido = `<p class="titulos-info numero-pedido">Pedido<span>No. ${idPedido}</span></p>`;
                  const nombrePedido = `<i class="icono-info fas fa-user"></i><p class="titulos-info">Nombre<span>${nombreCliente}</span></p>`;
                  const telefonoPedido = `<i class="icono-info fas fa-phone-square-alt"></i><p class="titulos-info">Numero de Telefono<span>${numeroTelefono}</span></p>`;
                  const pinatasPedido = `<i class="icono-info fas fa-clipboard-list"></i><p class="titulos-info">Detalles de Pedido<span>${pinatas[0]}\n${pinatas[1]}</span></p>`;
                  const entregaPedido = `<i class="icono-info fas fa-map-marker-alt"></i><p class="titulos-info">Entrega<span>${tipoEntrega}</span></p>`;
                  const imgPedido = `<i class="icono-info fas fa-file-image"></i><p class="titulos-info titulo-img">Imagenes<span id="img1">Imagen 1</span><span id="img2">Imagen 2</span></p>`;
                  const totalPedido = `<i class="icono-info fas fa-file-invoice-dollar"></i><p class="titulos-info">Total<span>${total}</span></p>`;
                  datosPedido.classList.add("datos-pedido");
                  const fondoMensaje = d.querySelector(".evento-dia");
                  datosPedido.innerHTML = `${numeroPedido}${nombrePedido}${telefonoPedido}${pinatasPedido}${entregaPedido}${imgPedido}${totalPedido}`;
                  fondoMensaje.appendChild(datosPedido);
                  const botonImg1 = d.querySelector("#img1");
                  const botonImg2 = d.querySelector("#img2");
                  botonImg1.addEventListener("click", () => {
                    window.open(`${img[0]}`);
                  });
                  botonImg2.addEventListener("click", () => {
                    window.open(`${img[1]}`);
                  });
                }
              });
            });
          });
        });
    };

    eventoVentana();
    cerrarVentanaEventos();
    mostrarDatosPedido();
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

  // Invocacion de funciones

  renderizadoMes();
};
