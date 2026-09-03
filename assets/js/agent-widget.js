/* ============================================================
   Mujer, Haz lo Tuyo — agente Claude flotante (v1: solo chat)
   -------------------------------------------------------------
   Botón fijo abajo a la derecha, en los 3 portales. Al hacer clic
   abre un panel de chat que le pregunta a Claude (usando la API key
   que Rubí guardó en Administrador → Agente Claude) sobre el
   contenido del sitio: calendario, módulos, facilitadores, datos de
   contacto — arma el contexto solo, a partir de lo que ya está
   cargado en la página (MODULOS, PROGRAMA, ASISTENTES, etc. de
   data.js/roster.js).

   Esta v1 SOLO responde preguntas — todavía no llena formularios ni
   escribe en el sitio (eso es una fase futura). Es position:fixed,
   así que se queda en su lugar al hacer scroll dentro de cada
   página — pero como el sitio es multi-página (no una sola app), el
   historial de chat no viaja de un portal a otro ni sobrevive a
   recargar la página; eso es una limitación conocida, no un bug.
   ============================================================ */
(function () {
  "use strict";

  function detectarPortal() {
    const p = location.pathname;
    if (p.includes("/admin/")) return "Administradora";
    if (p.includes("/ponentes/")) return "Facilitador";
    if (p.includes("/asistentes/")) return "Participante";
    return "General";
  }

  function armarContexto() {
    const partes = [];
    try {
      if (typeof PROGRAMA !== "undefined") {
        partes.push(
          `Programa: ${PROGRAMA.edicion}. Horario: ${PROGRAMA.horario}. Sede: ${PROGRAMA.sede}. ` +
          `Del ${PROGRAMA.inicio} al ${PROGRAMA.fin} (${PROGRAMA.horasTotales} horas). ` +
          `Contacto: correo ${PROGRAMA.contacto.correo}, tel ${PROGRAMA.contacto.tel}, IG ${PROGRAMA.contacto.ig}, web ${PROGRAMA.contacto.web}.`
        );
      }
    } catch (e) {}
    try {
      if (typeof MODULOS !== "undefined" && MODULOS.length) {
        const lista = MODULOS.map((m) => `- Módulo ${m.id} (${m.fechaLabel}): "${m.tema}", facilitador(a): ${m.ponente}.`).join("\n");
        partes.push("Calendario de módulos:\n" + lista);
      }
    } catch (e) {}
    try {
      if (typeof SESION_ESPECIAL !== "undefined" && SESION_ESPECIAL && SESION_ESPECIAL.tema) {
        partes.push(`Sesión especial (fuera de los módulos numerados): "${SESION_ESPECIAL.tema}" — ${SESION_ESPECIAL.fechaLabel}, facilitadora: ${SESION_ESPECIAL.facilitadora}.`);
      }
    } catch (e) {}
    try {
      if (typeof ASISTENTES !== "undefined" && ASISTENTES.length) {
        partes.push("Participantes registradas: " + ASISTENTES.map((a) => a.nombre).join(", ") + ".");
      }
    } catch (e) {}
    return partes.join("\n\n");
  }

  function crearEstilos() {
    if (document.getElementById("mjht-agent-style")) return;
    const style = document.createElement("style");
    style.id = "mjht-agent-style";
    style.textContent = `
      #mjht-agent-btn {
        position: fixed; bottom: 22px; right: 22px; z-index: 9999;
        width: 58px; height: 58px; border-radius: 50%;
        background: linear-gradient(135deg, #00ADBB, #007DA5);
        color: #fff; border: none; box-shadow: 0 6px 18px rgba(0,0,0,.25);
        font-size: 26px; cursor: pointer; display: flex; align-items: center; justify-content: center;
        transition: transform .15s ease;
      }
      #mjht-agent-btn:hover { transform: scale(1.06); }
      #mjht-agent-panel {
        position: fixed; bottom: 90px; right: 22px; z-index: 9999;
        width: min(360px, calc(100vw - 32px)); height: min(520px, calc(100vh - 140px));
        background: var(--blanco, #fff); border-radius: 16px; box-shadow: 0 12px 32px rgba(0,0,0,.28);
        display: none; flex-direction: column; overflow: hidden; font-family: 'Poppins', sans-serif;
        border: 1px solid rgba(0,0,0,.08);
      }
      #mjht-agent-panel.open { display: flex; }
      #mjht-agent-head {
        background: linear-gradient(135deg, #007DA5, #00ADBB); color: #fff;
        padding: 14px 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center;
        flex-shrink: 0;
      }
      #mjht-agent-head span.sub { display:block; font-weight:400; font-size:.72rem; opacity:.9; margin-top:2px; }
      #mjht-agent-close { background: none; border: none; color: #fff; font-size: 20px; cursor: pointer; line-height:1; padding:0 4px; }
      #mjht-agent-msgs { flex: 1; overflow-y: auto; padding: 12px; background: #FAF9F6; }
      .mjht-agent-msg { max-width: 85%; margin-bottom: 10px; padding: 9px 12px; border-radius: 12px; font-size: .88rem; line-height: 1.4; white-space: pre-wrap; }
      .mjht-agent-msg.user { background: #00ADBB; color: #fff; margin-left: auto; border-bottom-right-radius: 3px; }
      .mjht-agent-msg.bot { background: #fff; color: #3D4543; border: 1px solid rgba(0,0,0,.08); border-bottom-left-radius: 3px; }
      .mjht-agent-msg.error { background: #fff3cd; color: #7a5c00; border: 1px solid #ffe08a; }
      #mjht-agent-form { display: flex; gap: 8px; padding: 10px; border-top: 1px solid rgba(0,0,0,.08); flex-shrink: 0; background:#fff; }
      #mjht-agent-input { flex: 1; border: 1px solid rgba(0,0,0,.15); border-radius: 10px; padding: 9px 10px; font-size: .88rem; font-family: inherit; resize: none; }
      #mjht-agent-send { background: #00ADBB; color: #fff; border: none; border-radius: 10px; padding: 0 16px; font-weight: 600; cursor: pointer; }
      #mjht-agent-send:disabled { opacity: .5; cursor: default; }
      @media (prefers-color-scheme: dark) {
        #mjht-agent-panel { background: #24292a; }
        #mjht-agent-msgs { background: #1c2021; }
        .mjht-agent-msg.bot { background: #2c3233; color: #eee; border-color: rgba(255,255,255,.08); }
        #mjht-agent-form { background: #24292a; border-color: rgba(255,255,255,.08); }
        #mjht-agent-input { background: #1c2021; color: #eee; border-color: rgba(255,255,255,.15); }
      }
    `;
    document.head.appendChild(style);
  }

  function crearWidget() {
    if (document.getElementById("mjht-agent-btn")) return;
    crearEstilos();

    const btn = document.createElement("button");
    btn.id = "mjht-agent-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Abrir agente Claude");
    btn.textContent = "💬";

    const panel = document.createElement("div");
    panel.id = "mjht-agent-panel";
    panel.innerHTML = `
      <div id="mjht-agent-head">
        <div>Agente Claude<span class="sub">Pregúntame del diplomado</span></div>
        <button id="mjht-agent-close" type="button" aria-label="Cerrar">✕</button>
      </div>
      <div id="mjht-agent-msgs"></div>
      <form id="mjht-agent-form">
        <textarea id="mjht-agent-input" rows="1" placeholder="Escribe tu pregunta…"></textarea>
        <button id="mjht-agent-send" type="submit">Enviar</button>
      </form>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    const msgsEl = panel.querySelector("#mjht-agent-msgs");
    const formEl = panel.querySelector("#mjht-agent-form");
    const inputEl = panel.querySelector("#mjht-agent-input");
    const sendEl = panel.querySelector("#mjht-agent-send");
    const closeEl = panel.querySelector("#mjht-agent-close");

    const historial = []; // {role, content} — solo vive mientras la pestaña esté abierta
    let saludoMostrado = false;

    function agregarMensaje(texto, tipo) {
      const div = document.createElement("div");
      div.className = "mjht-agent-msg " + tipo;
      div.textContent = texto;
      msgsEl.appendChild(div);
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }

    function abrir() {
      panel.classList.add("open");
      if (!saludoMostrado) {
        agregarMensaje("¡Hola! Soy el agente del diplomado. Puedo ayudarte con dudas sobre el calendario, los módulos, los facilitadores o los datos de contacto. Por ahora solo puedo contestar preguntas, todavía no puedo guardar cambios en el dashboard.", "bot");
        saludoMostrado = true;
      }
      inputEl.focus();
    }
    function cerrar() {
      panel.classList.remove("open");
    }

    btn.addEventListener("click", () => {
      if (panel.classList.contains("open")) cerrar();
      else abrir();
    });
    closeEl.addEventListener("click", cerrar);

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formEl.requestSubmit();
      }
    });

    formEl.addEventListener("submit", async (e) => {
      e.preventDefault();
      const texto = inputEl.value.trim();
      if (!texto) return;
      agregarMensaje(texto, "user");
      historial.push({ role: "user", content: texto });
      inputEl.value = "";
      sendEl.disabled = true;

      try {
        const resp = await fetch("/.netlify/functions/agent-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: texto,
            history: historial.slice(0, -1),
            context: armarContexto(),
            portal: detectarPortal(),
          }),
        });
        const data = await resp.json().catch(() => ({}));
        if (data && data.ok) {
          agregarMensaje(data.reply, "bot");
          historial.push({ role: "assistant", content: data.reply });
        } else {
          agregarMensaje((data && data.error) || "No se pudo obtener respuesta.", "error");
        }
      } catch (err) {
        agregarMensaje("No se pudo conectar con el agente (" + (err.message || err) + ").", "error");
      } finally {
        sendEl.disabled = false;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", crearWidget);
  } else {
    crearWidget();
  }
})();
