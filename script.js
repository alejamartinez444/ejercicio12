const barra = document.querySelector("#barra");
const relleno = document.querySelector("#relleno");
const porcentaje = document.querySelector("#porcentaje");
const arriba = document.querySelector("#arriba");

let pendiente = false;

function actualizar() {
    const maximo =
        document.documentElement.scrollHeight - window.innerHeight;

    const valor = maximo > 0
        ? Math.round((window.scrollY / maximo) * 100)
        : 100;

    barra.setAttribute("aria-valuenow", valor);
    relleno.style.width = `${valor}%`;
    porcentaje.textContent = `${valor}%`;

    arriba.hidden = window.scrollY < 400;

    pendiente = false;
}

window.addEventListener("scroll", () => {
    if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(actualizar);
    }
}, { passive: true });

window.addEventListener("resize", actualizar);

arriba.addEventListener("click", () => {
    const reducir = matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        behavior: reducir ? "auto" : "smooth"
    });
});

actualizar();