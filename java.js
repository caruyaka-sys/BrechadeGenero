document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnInfo");
    const frase = document.getElementById("frase");

    if (btn) {
        btn.addEventListener("click", () => {
            const frases = [
                "La igualdad no es un privilegio, es un derecho.",
                "Empoderar a una mujer transforma generaciones.",
                "Donde hay educación, hay igualdad.",
                "El futuro es inclusivo o no es futuro.",
                "Cada acción cuenta: informa, escucha, actúa.",
                "Las brechas se reducen con políticas y voluntad social."
            ];
            const text = frases[Math.floor(Math.random() * frases.length)];
            frase.style.opacity = 0;
            frase.textContent = text;
            setTimeout(()=> frase.style.opacity = 1, 40);
        });
    }
});