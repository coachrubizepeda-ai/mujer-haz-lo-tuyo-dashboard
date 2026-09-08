/* ============================================================
   Mujer, Haz lo Tuyo — carga inicial de accesos (correo + password)
   -------------------------------------------------------------
   Datos tomados de "Relación Envío Test.xlsx" que compartió Rubí.
   Se usa UNA SOLA VEZ desde el botón "Cargar accesos desde esta
   lista" en Administrador → Acceso a la plataforma: sube estos
   datos a Netlify Blobs para cada participante (sobreescribe lo
   que ya esté guardado para esas personas). Después de usarlo,
   cada quien se edita normalmente desde el panel — este archivo
   puede quedarse tal cual, no se vuelve a leer solo.

   PENDIENTE (no se pudo autocompletar — edítalo aquí o directo en
   el panel una vez que tengas el dato):
   - M02 Liz Cárcamo: todavía no hay correo — Rubí dijo que lo va a
     conseguir. En cuanto lo tengas, agrégalo aquí (o directo en el
     panel, es lo mismo) y ya queda incluida en la próxima carga.
   - M09 Mildred Sosa: no venía correo en la lista.

   "Rocío González" (rociogonzalezgalvan@gmail.com) ya se agregó como
   M11 tanto aquí como en el roster (assets/js/roster.js) — es
   facilitadora y también asistente al diplomado.

   M12 es la propia Rubí — cuenta de Participante para que ella pueda
   ver el portal exactamente como lo ve una asistente.

   Las contraseñas son "Nombre2026" (fácil de decir por teléfono) —
   cámbialas por lo que prefieras, desde el panel, en cualquier
   momento.
   ============================================================ */
const ACCESOS_SEED = [
  { id: "M01", email: "elipemar@yahoo.com",           password: "LizP2026" },
  { id: "M03", email: "liliavelezi@gmail.com",         password: "Lilia2026" },
  { id: "M04", email: "itzel.palaciosor@gmail.com",    password: "Iztel2026" },
  { id: "M05", email: "lilibum@icloud.com",            password: "Liliana2026" },
  { id: "M06", email: "marysol.ponton@gmail.com",      password: "Marysol2026" },
  { id: "M07", email: "ana180103@yahoo.com.mx",        password: "Ana2026" },
  { id: "M08", email: "empaques_sanjose@outlook.com",  password: "Sara2026" },
  { id: "M10", email: "lupitapro@gmail.com",           password: "Lupita2026" },
  { id: "M11", email: "rociogonzalezgalvan@gmail.com", password: "Rocio2026" },
  { id: "M12", email: "hazlotuyo@theokpeople.com",     password: "Rubi2026" },
];
