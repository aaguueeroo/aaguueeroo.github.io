import { Box, Divider, Link, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { ReactNode } from "react";

// Privacy policy of the Chotos app. It is in Spanish, like the app, and wears the app's brand
// (Tierra, its design system) instead of the website's: no site navbar or footer. Linked from the
// App Store and Google Play, so its path (/chotos/privacidad) and the #eliminar-cuenta anchor must
// not change.

// The colors and letters of Tierra, from chotos_app/lib/config/colores.dart and app_themes.dart.
const Tierra = {
  fondo: "#F3EEE3",
  superficie: "#FFFDF8",
  borde: "#D6CBB6",
  tinta: "#1F1A14",
  tintaSuave: "#524839",
  verde: "#2F5D3A",
  verdeClaro: "#E4ECDD",
  tintaVerde: "#1E3D26",
  titulos: "Bitter, Georgia, serif",
  texto: "'Atkinson Hyperlegible', Arial, sans-serif",
} as const;

const tierraTheme = createTheme({
  palette: {
    primary: { main: Tierra.verde },
    text: { primary: Tierra.tinta, secondary: Tierra.tintaSuave },
    background: { default: Tierra.fondo, paper: Tierra.superficie },
    divider: Tierra.borde,
  },
  typography: {
    fontFamily: Tierra.texto,
    h1: { fontFamily: Tierra.titulos, fontWeight: 700 },
    h2: { fontFamily: Tierra.titulos, fontWeight: 700 },
  },
});

const CONTACT_EMAIL = "chotos@juliaaguero.com";
const LAST_UPDATED = "30 de octubre de 2026";

const Email = () => (
  <Link href={`mailto:${CONTACT_EMAIL}`} sx={{ color: Tierra.verde, fontWeight: 700, overflowWrap: "anywhere" }}>
    {CONTACT_EMAIL}
  </Link>
);

const Section = ({ id, title, children }: { id?: string; title: string; children: ReactNode }) => (
  <Box component="section" id={id} sx={{ scrollMarginTop: "24px" }}>
    <Typography
      variant="h2"
      sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, lineHeight: 1.25, mb: "16px" }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const P = ({ children }: { children: ReactNode }) => (
  <Typography sx={{ fontSize: "1.125rem", lineHeight: 1.6, color: Tierra.tinta, mb: "16px" }}>
    {children}
  </Typography>
);

const List = ({ items }: { items: ReactNode[] }) => (
  <Box
    component="ul"
    sx={{
      m: 0,
      mb: "16px",
      pl: "1.4rem",
      "& li": { fontSize: "1.125rem", lineHeight: 1.6, color: Tierra.tinta, mb: "0.4rem" },
    }}
  >
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </Box>
);

const TITLE = "Política de privacidad de Chotos";
const DESCRIPTION =
  "Qué datos guarda la app Chotos, para qué, dónde, durante cuánto tiempo y cómo verlos o eliminarlos.";
const URL = "https://juliaaguero.com/chotos/privacidad";

const ChotosPrivacyPage = () => (
  <ThemeProvider theme={tierraTheme}>
    <Helmet htmlAttributes={{ lang: "es" }}>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={URL} />
      <link rel="icon" type="image/svg+xml" href="/chotos/icono.svg" />
      <link rel="apple-touch-icon" href="/chotos/icono.png" />
      <meta name="theme-color" content={Tierra.verde} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:site_name" content="Chotos" />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content="https://juliaaguero.com/chotos/icono.png" />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_ES" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content="https://juliaaguero.com/chotos/icono.png" />
      <link
        href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bitter:wght@700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: Tierra.fondo,
        color: Tierra.tinta,
        fontFamily: Tierra.texto,
      }}
    >
      <Box
        component="header"
        sx={{ backgroundColor: Tierra.verde, px: { xs: "16px", sm: "32px" }, py: "16px" }}
      >
        <Box sx={{ maxWidth: "760px", mx: "auto", display: "flex", alignItems: "center", gap: "12px" }}>
          <Box component="img" src="/chotos/icono.svg" alt="" sx={{ width: 44, height: 44 }} />
          <Typography
            component="span"
            sx={{ fontFamily: Tierra.titulos, fontWeight: 700, fontSize: "1.6rem", color: Tierra.superficie }}
          >
            Chotos
          </Typography>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          flex: 1,
          px: { xs: "16px", sm: "32px" },
          pb: "64px",
        }}
      >
        <Box
          component="article"
          sx={{
            maxWidth: "760px",
            mx: "auto",
            mt: { xs: "32px", md: "48px" },
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <Box>
            <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, lineHeight: 1.2, mb: "12px" }}>
              Política de privacidad
            </Typography>
            <Typography sx={{ fontSize: "1.0625rem", color: Tierra.tintaSuave }}>
              Última actualización: {LAST_UPDATED}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: Tierra.verdeClaro,
              color: Tierra.tintaVerde,
              border: `1.5px solid ${Tierra.borde}`,
              borderRadius: "16px",
              p: { xs: "20px", md: "32px" },
              "& li": { color: Tierra.tintaVerde },
            }}
          >
            <Typography
              sx={{ fontFamily: Tierra.titulos, fontWeight: 700, fontSize: "1.375rem", mb: "8px", color: Tierra.tintaVerde }}
            >
              En pocas palabras
            </Typography>
            <List
              items={[
                "Chotos guarda tu correo y los datos de tus explotaciones y tus vacas, solo para que puedas usar la app.",
                "Los datos están en servidores de la Unión Europea (Fráncfort, Alemania).",
                "No hay publicidad ni analítica, y no se sigue lo que haces. Tus datos no se venden ni se ceden a nadie para su propio uso.",
                "Puedes eliminar tu cuenta y todo lo que contiene desde la propia app, en «Mi cuenta».",
              ]}
            />
          </Box>

          <Section title="1. Quién es la responsable">
            <P>
              La responsable de los datos que se tratan en la app Chotos es Julia Agüero, desarrolladora de la app, con
              domicilio en España. Para cualquier pregunta sobre esta política o sobre tus datos, escribe a <Email />.
            </P>
          </Section>

          <Section title="2. Qué datos se guardan">
            <P>
              <strong>Tu cuenta.</strong> Tu dirección de correo electrónico y tu contraseña. La contraseña se guarda
              cifrada: nadie puede leerla, tampoco la responsable.
            </P>
            <P>
              <strong>Tus explotaciones.</strong> El nombre de cada explotación, quién tiene acceso a ella y con qué papel
              (propietario, administrador o trabajador), desde cuándo, y las invitaciones creadas para unirse (un código,
              el papel que da, quién la creó, cuándo caduca y quién la usó).
            </P>
            <P>
              <strong>Tus vacas.</strong> Lo que escribas de cada una: nombre, número de crotal, sexo, peso, fechas de
              nacimiento, compra, venta o muerte, causa de la muerte, precios de compra y de venta, madre, padre y crías,
              cubriciones, partos y abortos, notas, y su foto si añades una.
            </P>
            <P>
              <strong>Las fotos.</strong> Se suben ya reducidas de tamaño. La app no pide ni guarda dónde ni cuándo se hizo
              la foto. La cámara y la galería solo se usan cuando tú lo pides, para la foto de una vaca, y el teléfono
              te pide permiso antes.
            </P>
            <P>
              <strong>Datos técnicos.</strong> Como cualquier servicio en internet, los servidores registran datos técnicos
              de las conexiones (por ejemplo, la dirección IP, la fecha y hora y el tipo de petición) para que el servicio
              funcione y sea seguro.
            </P>
            <P>
              <strong>Si nos escribes.</strong> Tu dirección de correo, tu nombre si aparece, y lo que nos cuentes en el
              mensaje.
            </P>
            <P>
              Chotos no usa tu ubicación, tus contactos ni ningún identificador publicitario, y no contiene herramientas de
              analítica, publicidad ni seguimiento.
            </P>
          </Section>

          <Section title="3. Para qué se usan y con qué base legal">
            <List
              items={[
                <>
                  <strong>Darte el servicio:</strong> crear y mantener tu cuenta, guardar y mostrarte tus explotaciones y
                  tus vacas, y compartirlas con las personas que tú invites. Base legal: la ejecución del contrato que
                  aceptas al usar la app (artículo 6.1.b del RGPD).
                </>,
                <>
                  <strong>Enviarte los correos de la cuenta:</strong> confirmar tu dirección, recuperar la contraseña o
                  cambiar el correo. Base legal: la ejecución del contrato (artículo 6.1.b del RGPD).
                </>,
                <>
                  <strong>Mantener el servicio seguro</strong> y evitar abusos, con los datos técnicos. Base legal: el
                  interés legítimo en proteger el servicio y a sus usuarios (artículo 6.1.f del RGPD).
                </>,
                <>
                  <strong>Contestarte si escribes:</strong> base legal, el interés legítimo en atender tu consulta
                  (artículo 6.1.f del RGPD).
                </>,
              ]}
            />
            <P>
              Tus datos no se usan para publicidad, no se analizan para hacer perfiles y no se toman decisiones
              automatizadas sobre ti.
            </P>
          </Section>

          <Section title="4. Quién más puede ver tus datos">
            <P>
              <strong>Las personas de tu explotación.</strong> Quien tenga acceso a una explotación ve sus vacas y todo lo
              que se haya escrito de ellas, y ve el correo y el papel de las demás personas con acceso. Cuando alguien
              recibe una invitación, ve el nombre de la explotación y el correo de quien le invita. Tú decides a quién
              invitas y cómo le mandas la invitación (WhatsApp, correo, etc.).
            </P>
            <P>
              <strong>Los proveedores que hacen funcionar la app,</strong> que tratan los datos solo por encargo de la
              responsable y siguiendo sus instrucciones:
            </P>
            <List
              items={[
                <>
                  <strong>Supabase</strong> (Supabase, Inc.): base de datos, cuentas, almacenamiento de las fotos y
                  servidor. Los datos se guardan en su centro de datos de Fráncfort (Alemania).
                </>,
                <>
                  <strong>Resend</strong> (Resend, Inc.): envía los correos de la cuenta y recibe los mensajes que se
                  mandan a {CONTACT_EMAIL}.
                </>,
                <>
                  <strong>Google</strong> (Gmail): la bandeja de correo donde la responsable lee y contesta los mensajes
                  que se mandan a {CONTACT_EMAIL}.
                </>,
              ]}
            />
            <P>
              Estas empresas tienen su sede en Estados Unidos, por lo que algunos datos pueden tratarse fuera del Espacio
              Económico Europeo. Cuando ocurre, se hace con las garantías que exige el RGPD, como el Marco de Privacidad
              de Datos UE-EE. UU. o las cláusulas contractuales tipo aprobadas por la Comisión Europea.
            </P>
            <P>
              Fuera de esto, tus datos solo se comunicarían a una autoridad cuando la ley obligue a ello.
            </P>
          </Section>

          <Section title="5. Las fotos de las vacas">
            <P>
              Para que se carguen rápido en el campo, las fotos se guardan con una dirección web larga y difícil de
              adivinar. Esa dirección no se publica en ningún sitio, pero quien la tenga puede abrir la foto sin entrar en
              la app. Por eso, te recomendamos que las fotos sean de las vacas y no salgan en ellas personas ni documentos.
            </P>
          </Section>

          <Section title="6. Lo que se guarda en tu teléfono">
            <P>Para funcionar, la app guarda en tu teléfono:</P>
            <List
              items={[
                "Tu sesión, para que no tengas que entrar cada vez. Se borra al cerrar la sesión desde «Mi cuenta».",
                "Una copia de las fotos de las vacas, para no descargarlas cada vez.",
                "Qué explicaciones de la app ya has visto, para no repetirlas.",
                "El código de una invitación que aún no has aceptado, mientras entras o creas tu cuenta.",
              ]}
            />
            <P>Todo esto se borra al desinstalar la app.</P>
          </Section>

          <Section title="7. Cuánto tiempo se guardan">
            <List
              items={[
                "Tu cuenta y tus explotaciones, mientras no elimines la cuenta. Las vacas vendidas o muertas se conservan en su ficha hasta que las elimines o elimines la explotación.",
                "Las invitaciones dejan de servir a los 7 días, o en cuanto se usan.",
                "Los datos técnicos, el tiempo limitado que los conservan los proveedores para la seguridad del servicio.",
                "Los mensajes que nos mandes, el tiempo necesario para contestarte y resolver lo que pidas.",
              ]}
            />
          </Section>

          <Section id="eliminar-cuenta" title="8. Cómo eliminar tu cuenta y tus datos">
            <P>
              Desde la app: entra en <strong>«Mi cuenta»</strong>, pulsa <strong>«Eliminar cuenta»</strong> y escribe tu
              contraseña para confirmarlo. Al instante se eliminan tu cuenta, las explotaciones de las que eres
              propietario con todas sus vacas, cubriciones, ventas, fotos, personas e invitaciones, y tu acceso a las
              explotaciones de otras personas.
            </P>
            <P>
              Las vacas y fotos que hayas añadido a explotaciones de otras personas se quedan en ellas, porque forman parte
              de esas explotaciones. Su propietario puede eliminarlas.
            </P>
            <P>
              Si ya no tienes la app, escribe a <Email /> desde el correo de tu cuenta pidiendo que se elimine, y se hará
              en un plazo máximo de 30 días. Tras eliminarse, los datos pueden quedar un tiempo limitado en las copias de
              seguridad automáticas del proveedor, hasta que se sustituyen por otras.
            </P>
          </Section>

          <Section title="9. Tus derechos">
            <P>
              Puedes pedir en cualquier momento ver tus datos, corregirlos, eliminarlos, limitar su uso, oponerte a que se
              traten o recibirlos en un formato que puedas llevarte a otro servicio. Muchos de ellos los puedes ejercer
              tú mismo desde la app: editar o eliminar vacas, cambiar el correo o la contraseña y eliminar la cuenta. Para
              el resto, escribe a <Email />. Te contestaremos en un plazo máximo de un mes.
            </P>
            <P>
              Si crees que tus datos no se han tratado bien, puedes reclamar ante la Agencia Española de Protección de
              Datos en{" "}
              <Link href="https://www.aepd.es" target="_blank" rel="noopener" sx={{ color: Tierra.verde }}>
                www.aepd.es
              </Link>
              .
            </P>
          </Section>

          <Section title="10. Seguridad">
            <P>
              Todas las conexiones entre la app y los servidores van cifradas. Cada persona solo puede ver y cambiar los
              datos de las explotaciones a las que tiene acceso, según su papel, y eliminar la cuenta pide la contraseña.
              Ningún sistema es seguro al cien por cien, pero se toman medidas razonables para proteger tus datos.
            </P>
          </Section>

          <Section title="11. Menores">
            <P>
              Chotos está pensada para personas que gestionan una explotación ganadera y no está dirigida a menores de 14
              años. Si crees que un menor de esa edad ha creado una cuenta, escribe a <Email /> y se eliminará.
            </P>
          </Section>

          <Section title="12. Cambios en esta política">
            <P>
              Si esta política cambia, se publicará aquí con su nueva fecha. Si el cambio es importante, también se avisará
              en la app o por correo.
            </P>
          </Section>

          <Divider />
          <P>
            ¿Dudas? Escribe a <Email />.
          </P>
        </Box>
      </Box>
      <Box
        component="footer"
        sx={{ borderTop: `1.5px solid ${Tierra.borde}`, px: { xs: "16px", sm: "32px" }, py: "24px" }}
      >
        <Typography sx={{ maxWidth: "760px", mx: "auto", color: Tierra.tintaSuave, fontSize: "1.0625rem" }}>
          Chotos · Las vacas de tu explotación, siempre a mano.
        </Typography>
      </Box>
    </Box>
  </ThemeProvider>
);

export default ChotosPrivacyPage;
