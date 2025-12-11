document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Contador animado ---------- */
  const contador = document.getElementById("contador");
  if (contador) {
    let v = 0;
    const final =27.45; // puedes ajustar
    const step = Math.max(1, Math.round(final / 20));
    const t = setInterval(() => {
      v += step;
      if (v >= final) { v = final; clearInterval(t); }
      contador.textContent = v + "%";
    }, 60);
  }

  /* ---------- Expandable cards ---------- */
  document.querySelectorAll(".expandable").forEach(card => {
    card.addEventListener("click", () => {
      const extra = card.querySelector(".extra");
      if (!extra) return;
      if (extra.style.display === "block") {
        extra.style.display = "none";
      } else {
        extra.style.display = "block";
      }
      card.classList.toggle("open");
    });
  });

  /* ---------- Checklist ---------- */
  document.querySelectorAll(".checklist li").forEach(li => {
    li.addEventListener("click", () => li.classList.toggle("checked"));
  });

  /* ---------- Barras (set width via inline style or CSS var) ---------- */
  document.querySelectorAll(".barra span").forEach(span => {
    const w = span.getAttribute("data-w") || span.style.width || "0%";
    // animate width
    setTimeout(()=> { span.style.width = w; }, 200);
  });

  /* ---------- Poster Maker (Canvas) ---------- */
  const canvas = document.getElementById("posterCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    // default poster size
    const W = 800, H = 1120;
    canvas.width = W; canvas.height = H;
    // controls
    const bgSelect = document.getElementById("posterBg");
    const sloganInput = document.getElementById("posterText");
    const fontSizeInput = document.getElementById("posterSize");
    const colorInput = document.getElementById("posterColor");
    const emojiSelect = document.getElementById("posterEmoji");
    const downloadBtn = document.getElementById("posterDownload");
    const preview = document.getElementById("posterPreview");

    function drawPoster(){
      // background
      const bg = bgSelect.value;
      if (bg.startsWith("grad:")) {
        const cols = bg.replace("grad:","").split("|");
        const g = ctx.createLinearGradient(0,0, W, H);
        g.addColorStop(0, cols[0]); g.addColorStop(1, cols[1]);
        ctx.fillStyle = g;
      } else {
        ctx.fillStyle = bg;
      }
      ctx.fillRect(0,0,W,H);

      // icon (emoji)
      ctx.font = "140px serif";
      ctx.textAlign = "center";
      ctx.fillText(emojiSelect.value, W/2, H*0.32);

      // slogan
      const text = sloganInput.value || "IGUALDAD DE GÉNERO";
      ctx.fillStyle = colorInput.value;
      ctx.textAlign = "center";
      ctx.font = `700 ${fontSizeInput.value}px "Arial"`;
      wrapText(ctx, text, W/2, H*0.6, W - 120, fontSizeInput.value * 1.1);
      // footer small text
      ctx.font = "18px Arial";
      ctx.fillStyle = "#5a391f";
      ctx.fillText("Proyecto Brecha de Género — ¡Actúa hoy!", W/2, H - 60);
      // update preview image
      preview.src = canvas.toDataURL("image/png");
    }

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';
      let testLine, metrics;
      let curY = y;
      for (let n = 0; n < words.length; n++) {
        testLine = line + words[n] + ' ';
        metrics = context.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          context.fillText(line, x, curY);
          line = words[n] + ' ';
          curY += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, x, curY);
    }

    // events
    [bgSelect, sloganInput, fontSizeInput, colorInput, emojiSelect].forEach(el => {
      el.addEventListener("input", drawPoster);
      el.addEventListener("change", drawPoster);
    });

    downloadBtn.addEventListener("click", () => {
      const link = document.createElement('a');
      link.download = 'cartel-igualdad.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });

    // initial draw
    drawPoster();
  }

  /* ---------- Smooth scroll for anchor links (if any) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({behavior:'smooth'});
    });
  });

});