/**
 * Eventos são chamados sempre que determinada ação acontece, seja na janela da sua aplicação (window)
 * ou seja na página em que se está navegando, (document).
 */
window.addEventListener('focus', () => {
    console.log("focus");
});

document.addEventListener('click', () => {
    console.log("click")
})