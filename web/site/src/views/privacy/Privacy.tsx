"use client";
import { LayoutApp } from "common-lib";
import "./privacy.scss";

export default function Privacy() {
    return <section className="privacy-policy">
            <h1>Política de Privacidad</h1>
            <p><strong>Última actualización:</strong> Julio 2025</p>

            <h2>1. ¿Quiénes somos?</h2>
            <p>
                <strong>Delivery Aldama</strong> es una aplicación que permite a los usuarios solicitar servicios de entrega
                (mandaditos) de manera rápida y eficiente, facilitando la comunicación entre clientes y negocios locales.
                Actualmente, no realizamos cobros ni gestionamos pagos dentro de la plataforma.
            </p>

            <h2>2. ¿Qué información recopilamos?</h2>
            <h3>Información del usuario final (clientes):</h3>
            <ul>
                <li>Nombre, número de teléfono y dirección de entrega (cuando es proporcionada).</li>
                <li>Ubicación aproximada (opcional, solo si el usuario la autoriza).</li>
                <li>Información del dispositivo (tipo de dispositivo, sistema operativo).</li>
            </ul>

            <h3>Información de negocios registrados:</h3>
            <ul>
                <li>Nombre comercial, RFC (cuando aplique), teléfono, correo electrónico.</li>
                <li>Dirección del negocio y horarios de atención.</li>
                <li>Detalles de promociones u ofertas que desean publicar.</li>
            </ul>

            <h2>3. ¿Cómo usamos esta información?</h2>
            <ul>
                <li>Para conectar a los usuarios con negocios locales de su interés.</li>
                <li>Para mostrar promociones y contenido relevante en la app.</li>
                <li>Para brindar soporte técnico y mejorar nuestros servicios.</li>
                <li>Para contactar a los negocios con fines administrativos y de facturación.</li>
            </ul>

            <h2>4. ¿Cómo <u>NO</u> usamos la información?</h2>
            <ul>
                <li><strong>No realizamos cobros</strong> a los usuarios finales (clientes).</li>
                <li><strong>No gestionamos pagos</strong> ni intervenimos en el flujo de dinero entre cliente y negocio.</li>
                <li><strong>No vendemos ni compartimos datos personales</strong> con terceros con fines comerciales.</li>
            </ul>

            <h2>5. ¿Quién tiene acceso a tu información?</h2>
            <p>
                Solo el equipo autorizado de <strong>Delivery Aldama</strong> puede acceder a la información recopilada,
                y únicamente con fines operativos. La información de los negocios se usará para su promoción dentro de la app.
            </p>

            <h2>6. Seguridad</h2>
            <p>
                Tomamos medidas razonables de seguridad para proteger los datos contra accesos no autorizados, pérdida o alteración.
            </p>

            <h2>7. Cambios en esta política</h2>
            <p>
                Nos reservamos el derecho de actualizar esta Política de Privacidad. En caso de cambios importantes, se notificará
                a los usuarios mediante la app.
            </p>

            <h2>8. Contacto</h2>
            <p>
                Si tienes dudas sobre esta política, puedes escribirnos a:<br />
                <strong>📧 soporte@deliveryaldama.com</strong>
            </p>
        </section>
}
