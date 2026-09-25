import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, CheckCircle, ArrowRight, Mail, Calendar, Linkedin, Instagram, ArrowLeft, Shield, FileText, Award, BookOpen, MessageCircle, Phone } from 'lucide-react';

/* --------------------------------------------------------------------------------------
   ¡IMPORTANTE PARA QUE SE VEAN LAS FOTOS!
   --------------------------------------------------------------------------------------
   Para que las imágenes se vean en tu ordenador, debes seguir estos pasos:
   
   1. Ve a la carpeta de tu proyecto.
   2. Busca la carpeta llamada 'public'.
   3. Pega DENTRO de 'public' tus fotos.
   4. Asegúrate de que se llamen EXACTAMENTE así:
      - perfil.png
      - titulo_psicologia.png
      - diploma_coach.jpg
   
   El código busca estas fotos automáticamente. Si los nombres no coinciden, no se verán.
   --------------------------------------------------------------------------------------
*/

// --- COMPONENTES DE PÁGINAS ---

const Home = ({ onScrollTo, emailLink, onEmailClick, whatsappLink, phoneLink }) => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [privacyUnlocked, setPrivacyUnlocked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [privacyError, setPrivacyError] = useState("");

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePhone = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    if (!digitsOnly) return { ok: false, empty: true };
    return { ok: digitsOnly.length >= 7 && digitsOnly.length <= 15, empty: false };
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    if (!value) {
      setEmailError("");
      return;
    }
    setEmailError(validateEmail(value) ? "" : "Introduce un email válido.");
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.trim();
    const result = validatePhone(value);
    if (result.empty) {
      setPhoneError("");
      return;
    }
    setPhoneError(result.ok ? "" : "Introduce un teléfono válido (7 a 15 dígitos).");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("privacy_read");
    if (stored === "true") {
      setPrivacyUnlocked(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!data.get("form-name")) {
      data.set("form-name", "contact");
    }

    setEmailError("");
    setPhoneError("");
    setPrivacyError("");

    if (!data.get("privacy")) {
      setPrivacyError("Debes aceptar la Política de Privacidad.");
      return;
    }

    const name = (data.get("name") || "").toString().trim();
    const lastName = (data.get("lastName") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();

    if (!name || !lastName || !email || !phone) {
      setEmailError(!email ? "Introduce un email válido." : "");
      setPhoneError(!phone ? "Introduce un teléfono válido." : "");
      return;
    }

    const emailOk = validateEmail(email);
    if (!emailOk) {
      setEmailError("Introduce un email válido.");
      return;
    }

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.ok) {
      setPhoneError("Introduce un teléfono válido (7 a 15 dígitos).");
      return;
    }

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });

      if (!res.ok) {
        throw new Error("send_failed");
      }

      form.reset();
      window.location.href = "/gracias";
    } catch (err) {
      setPrivacyError("No se pudo enviar. Inténtalo de nuevo en unos minutos.");
    }
  };

  return (
    <>
    {/* --- HERO SECTION --- */}
    <section id="inicio" className="relative min-h-screen lg:min-h-0 flex items-start pt-[160px] md:pt-20 lg:pt-[145px] pb-16 lg:pb-20 overflow-hidden bg-slate-50">
      <div className="absolute top-0 right-0 w-2/3 h-full bg-teal-50/60 rounded-l-[100px] -mr-20 z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-slate-200/40 rounded-tr-[100px] -ml-20 z-0"></div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-slideInLeft">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-[20px] font-bold tracking-wider uppercase rounded-full">
            Exprimir el elixir del existir
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-slate-900">
            Para. <span className="text-teal-600 italic">Reflexiona.</span> Decide cómo quieres avanzar.
          </h1>
          <p className="text-[20px] text-slate-600 max-w-lg leading-relaxed">
            Te acompaño en momentos de cambio o bloqueo para reflexionar sobre tu situación, ordenar ideas y tomar decisiones más alineadas con tu día a día.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href={emailLink} onClick={onEmailClick} className="bg-teal-700 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Escríbeme por email
              <ArrowRight size={18} />
            </a>
            <button onClick={() => onScrollTo?.('para-quien')} className="border border-slate-300 bg-white text-slate-700 px-8 py-3 rounded-full font-medium hover:bg-slate-50 transition-all">
              Saber más
            </button>
          </div>
          <p className="text-teal-600 italic font-serif text-4xl md:text-5xl lg:text-6xl">¿Empezamos?</p>
        </div>
        
        <div className="relative h-[500px] w-full hidden md:block animate-fadeIn">
          <img 
            src="/hero.jpg" 
            alt="Sesión de coaching ejecutivo online 1:1" 
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="1600"
            height="1067"
            className="object-cover w-full h-full rounded-2xl shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs border-l-4 border-teal-500">
            <p className="text-slate-800 font-serif italic text-[20px]">Un espacio para parar, observar tu presente y decidir cómo quieres actuar.</p>
          </div>
        </div>
      </div>
    </section>

    {/* --- PARA QUIÉN ES ESTE ESPACIO --- */}
    <section id="para-quien" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Para quién es este espacio</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-teal-800 mb-6 bg-teal-50 inline-block px-4 py-2 rounded-lg">Este coaching es para ti si:</h3>
              <BenefitItem text="Te sientes agotado/a o sobrepasado/a por lo que ocurre a tu alrededor." />
              <BenefitItem text="Reaccionas constantemente a lo que hacen otras personas y eso te desgasta." />
              <BenefitItem text="Estás en un momento de cambio personal o profesional o de toma de decisiones." />
              <BenefitItem text="Hay hábitos o patrones que sabes que te limitan, pero no consigues cambiar." />
              <BenefitItem text="Quieres dejar de darle vueltas a las cosas y empezar a actuar con más claridad." />
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-teal-100 rounded-full opacity-50 blur-xl"></div>
              <p className="text-[20px] text-slate-700 font-medium leading-relaxed relative z-10">
                <span className="block text-4xl text-teal-300 mb-4 font-serif">"</span>
                No es un espacio para eliminar problemas, sino para <span className="font-bold text-teal-700 bg-teal-50 px-1">relacionarte de otra forma con ellos</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* --- QUÉ ES EL COACHING --- */}
    <section id="que-es" className="py-20 bg-teal-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">¿Qué es el Coaching?</h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto rounded-full mb-6"></div>
          <p className="text-[20px] text-teal-100 leading-relaxed">
            El coaching es un proceso de acompañamiento individual basado en la conversación y la reflexión. Revisamos cómo interpretas lo que te ocurre, qué creencias y hábitos influyen en tus decisiones y qué quieres cambiar. No consiste en dar consejos, sino en facilitar que encuentres tus propias respuestas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="space-y-6">
             <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">No es...</h3>
                <p className="text-teal-200">No es psicoterapia ni asesoría. Si considero que necesitas terapia, te orientaré o derivaré al recurso adecuado.</p>
             </div>
             
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500 rounded-2xl transform rotate-3 opacity-20"></div>
            <div className="bg-white text-slate-800 p-8 rounded-2xl shadow-2xl relative">
              <p className="text-[20px] leading-relaxed font-serif italic text-slate-700">
                "Exprimir el elixir del existir significa transformar la experiencia presente —incluso cuando es incómoda— en el impulso necesario para actuar."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* --- QUÉ TRABAJAMOS --- */}
    <section id="que-trabajamos" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Qué trabajamos en las sesiones</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600">El foco está siempre en: <span className="font-bold text-teal-700">conciencia → recursos → acción</span>.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Conciencia" 
            description="Qué está pasando hoy y cómo te afecta. Qué juicios, creencias y emociones están influyendo en tus decisiones."
            icon={<div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-700 mb-4 shadow-sm"><FileText size={24} /></div>}
          />
          <FeatureCard 
            title="Recursos" 
            description="Qué hábitos están reforzando el bloqueo. Qué recursos ya tienes y cuáles puedes desarrollar."
            icon={<div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 mb-4 shadow-sm"><BookOpen size={24} /></div>}
          />
          <FeatureCard 
            title="Acción" 
            description="Qué acción concreta es posible ahora. Pasamos de la parálisis al movimiento consciente."
            icon={<div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-700 mb-4 shadow-sm"><ArrowRight size={24} /></div>}
          />
        </div>
      </div>
    </section>

    {/* --- CÓMO ES EL PROCESO --- */}
    <section id="proceso" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">Cómo es el proceso</h2>
            <div className="space-y-4">
              <BenefitItemDark text="Proceso individual 1:1" />
              <BenefitItemDark text="Formato online" />
              <BenefitItemDark text="Sesiones de 60 minutos" />
              <BenefitItemDark text="Espacio confidencial y profesional. Toda la información se trata con absoluta privacidad." />
              <BenefitItemDark text="Ritmo acordado entre ambas partes" />
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-700">
               <p className="text-slate-300 mb-4 text-[20px]">Antes de iniciar, valora si este espacio es para ti:</p>
               <a href={emailLink} onClick={onEmailClick} className="bg-teal-600 text-white px-6 py-3 rounded-full font-bold hover:bg-teal-500 transition-all w-full md:w-auto text-center shadow-lg inline-flex justify-center">
                  Escríbeme por email
               </a>
            </div>
          </div>
          <div className="md:w-1/2 bg-cover bg-center h-64 md:h-auto opacity-80" style={{ backgroundImage: "url('/primera-foto.png')" }}>
          </div>
        </div>
      </div>
    </section>

    {/* --- SOBRE DIANA LOSCOS --- */}
    <section id="sobre-mi" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0f172a" strokeWidth="1"/>
                  </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-12">
          
          <div className="md:w-1/3 flex flex-col items-center">
            
            {/* Foto de Perfil */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6">
              <div className="absolute inset-0 bg-teal-200 rounded-full transform translate-x-2 translate-y-2"></div>
              
              <img 
                src="perfil.png" 
                onError={(e) => {
                   e.target.src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                   e.target.style.border = "4px solid #fca5a5"; 
                }}
                alt="Diana Loscos, coach ejecutiva online" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10"
              />
              
              <div className="absolute bottom-6 right-6 z-20 bg-white p-2 rounded-full shadow-md text-teal-600">
                 <CheckCircle size={24} />
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-2">
                 <SocialIcon Icon={Linkedin} href="https://www.linkedin.com/in/diana-loscos-ortega-68b184214/" />
                 <SocialIcon Icon={Instagram} href="https://www.instagram.com/dianaloscoscoach?igsh=MXNtNTQ1OGhkbHpseg==" />
            </div>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">Sobre Mí</h2>
            <p className="text-teal-600 text-[20px] mb-6 uppercase tracking-wider font-semibold">Coach ejecutiva online</p>
            
            <p className="text-slate-600 leading-relaxed mb-6 text-[20px]">
              He desarrollado mi trayectoria en Recursos Humanos en empresas multinacionales (Moeve y Saint-Gobain), en áreas de beneficios y atracción de talento. En las sesiones ofrezco un espacio de reflexión para revisar creencias y hábitos y decidir qué cambiar.
            </p>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
              <p className="font-semibold text-slate-800 mb-4 flex items-center gap-2 text-[20px]">
                <Award className="text-teal-600" />
                Formación
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></span> Grado en Psicología- Universidad Antonio de Nebrija</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></span> Executive Coach- Escuela Europea de Coaching (EEC)</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></span> En proceso de acreditación ACC (Associate Certified Coach) por la ICF (International Coaching Federation).</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></span> Supervisión profesional continua (ECC)</li>
              </ul>
              <p className="text-[20px] text-slate-500 mt-4">Trabajo alineada con el código ético de la ICF.</p>
            </div>

            {/* FORMACIÓN (texto integrado en el recuadro superior) */}
          </div>

        </div>
      </div>
    </section>

    {/* --- INVERSIÓN --- */}
    <section id="inversion" className="py-20 bg-teal-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Inversión</h2>
          <div className="w-20 h-1 bg-teal-400 mx-auto rounded-full mb-6"></div>
          <p className="text-teal-100">El trabajo continuado facilita una reflexión más profunda.</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <PricingCard title="Sesión individual" price="60€" highlighted={true} />
          <PricingCard title="Proceso 6 sesiones" price="330€" />
          <PricingCard title="Proceso 10 sesiones" price="520€" />
        </div>
        <p className="text-teal-100 text-[20px] text-center mt-8">Pago por adelantado (mínimo 24h antes).</p>
      </div>
    </section>

    {/* --- CONTACTO --- */}
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Contacto</h2>
          <p className="text-slate-600">Si al leer esto algo resuena, puedes reservar una sesión online.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto justify-items-center md:justify-items-stretch w-full">
          
          <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 w-full min-w-0">
            <h3 className="text-xl font-bold mb-6 text-slate-800">Datos de Contacto</h3>
            
            <div className="space-y-6">
              <ContactItem 
                Icon={Mail} 
                title="Email" 
                value="contacto@dianaloscoscoach.com" 
                link={emailLink}
                onClick={onEmailClick}
              />
              <ContactItem 
                Icon={MessageCircle} 
                title="WhatsApp" 
                value="+34 604 97 84 07" 
                sub="Escribeme directamente por WhatsApp"
                link={whatsappLink}
              />
              <ContactItem 
                Icon={Phone} 
                title="Llamada" 
                value="+34 604 97 84 07" 
                sub="Llamada directa"
                link={phoneLink}
              />
              <ContactItem 
                Icon={Calendar} 
                title="Sesiones" 
                value="Solicitar disponibilidad por email" 
                link={emailLink}
                onClick={onEmailClick}
              />
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-200">
                 <p className="text-slate-500 text-[20px] italic">"De la conciencia nace la acción."</p>
            </div>
          </div>

          <form
            name="contact"
            method="POST"
            action="/gracias"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-4 w-full min-w-0"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[20px] font-medium text-slate-700 mb-1">Nombre</label>
                <input name="name" type="text" required className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-[20px] font-medium text-slate-700 mb-1">Apellidos</label>
                <input name="lastName" type="text" required className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all" placeholder="Tus apellidos" />
              </div>
            </div>
            
            <div>
              <label className="block text-[20px] font-medium text-slate-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                onChange={handleEmailChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="tu@email.com"
              />
              {emailError && <p className="text-[18px] text-red-600 mt-2">{emailError}</p>}
            </div>

            <div>
              <label className="block text-[20px] font-medium text-slate-700 mb-1">Teléfono</label>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                pattern="^[+\\d][\\d\\s().-]{6,}$"
                title="Introduce un teléfono válido (7 a 15 dígitos)."
                required
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="Tu número de teléfono"
              />
              {phoneError && <p className="text-[18px] text-red-600 mt-2">{phoneError}</p>}
            </div>

            <div>
              <label className="block text-[20px] font-medium text-slate-700 mb-1">¿En qué te puedo ayudar?</label>
              <textarea name="message" rows="4" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all" placeholder="Cuéntame brevemente tu objetivo..."></textarea>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsPrivacyOpen(true);
                setPrivacyUnlocked(true);
                if (typeof window !== "undefined") {
                  window.localStorage.setItem("privacy_read", "true");
                }
              }}
              className="text-[20px] text-teal-700 font-semibold underline underline-offset-4 hover:text-teal-800 text-left"
            >
              Leer Política de Privacidad
            </button>

            <div className="flex items-start gap-3">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                required
                disabled={!privacyUnlocked}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-200 disabled:opacity-50"
              />
              <label htmlFor="privacy" className="text-[20px] text-slate-600">He leído y acepto la Política de Privacidad.</label>
            </div>
            {privacyError && <p className="text-[18px] text-red-600">{privacyError}</p>}

            <button className="w-full bg-teal-700 text-white font-bold py-4 rounded-lg hover:bg-teal-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Enviar Mensaje
            </button>
            <p className="text-[20px] text-slate-500">Responsable: Diana Loscos. Puedes ejercer tus derechos en contacto@dianaloscoscoach.com.</p>
          </form>

        </div>
      </div>
    </section>

      {isPrivacyOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsPrivacyOpen(false)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl leading-none"
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Política de Privacidad</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p>En Diana Loscos Coaching nos tomamos muy en serio la privacidad de tus datos. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos tu información personal.</p>

              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. Responsable del Tratamiento</h3>
              <p>Los datos de carácter personal que nos proporciones serán tratados por <strong>Diana Loscos</strong> como Responsable del Tratamiento. Email: contacto@dianaloscoscoach.com.</p>

              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">2. Finalidad</h3>
              <p>La finalidad del tratamiento de los datos es gestionar las solicitudes de información recibidas a través del formulario de contacto y, en su caso, la prestación de servicios de coaching profesional.</p>

              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">3. Legitimación</h3>
              <p>La base legal para el tratamiento de sus datos es el consentimiento. Al rellenar el formulario y enviar sus datos, marca la casilla aceptando esta política de privacidad, otorgando así su consentimiento expreso.</p>

              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">4. Destinatarios</h3>
              <p>No se cederán datos a terceros, salvo obligación legal. Los datos se alojan en servidores seguros dentro de la Unión Europea.</p>

              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">5. Derechos</h3>
              <p>Tienes derecho a acceder, rectificar y suprimir los datos, así como otros derechos indicados en la información adicional, que puedes ejercer enviando un correo electrónico a contacto@dianaloscoscoach.com.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const LegalNotice = () => (
  <div className="container mx-auto px-6 py-32 max-w-4xl animate-fadeIn bg-white">
    <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
      <Shield className="text-teal-600" size={40} /> Aviso Legal
    </h1>
    <div className="prose prose-slate max-w-none text-slate-600">
      <p>En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, se informa de lo siguiente:</p>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. Datos Identificativos</h3>
      <p>La titular del presente sitio web es <strong>Diana Loscos</strong>, con domicilio a estos efectos en Madrid, España.</p>
      <p>Correo electrónico de contacto: contacto@dianaloscoscoach.com.</p>
      <p>El sitio web tiene como finalidad ofrecer información sobre servicios de coaching personal y profesional, así como contenidos relacionados con el desarrollo personal.</p>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">2. Usuarios</h3>
      <p>El acceso y/o uso de este portal atribuye la condición de usuario, que acepta, desde dicho acceso y/o uso, las presentes condiciones generales de uso.</p>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">3. Uso del Portal</h3>
      <p>Este sitio web proporciona acceso a contenidos, informaciones y servicios relacionados con la actividad profesional de coaching ofrecida por Diana Loscos.</p>
      <p>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que se ofrecen a través de la web y a no utilizarlos para realizar actividades ilícitas o contrarias a la buena fe y al orden público.</p>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">4. Propiedad Intelectual</h3>
      <p>Diana Loscos es titular de todos los derechos de propiedad intelectual e industrial del sitio web, así como de los elementos contenidos en el mismo (textos, imágenes, diseño, logotipos, vídeos, contenidos y estructura).</p>
      <p>Queda prohibida la reproducción, distribución o comunicación pública, total o parcial, de los contenidos de esta web sin la autorización expresa de la titular.</p>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">5. Exclusión de Garantías y Responsabilidad</h3>
      <p>Diana Loscos no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos.</p>

      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">6. Enlaces Externos</h3>
      <p>En el caso de que en la web se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, Diana Loscos no ejercerá ningún tipo de control sobre dichos sitios y contenidos, por lo que no asumirá responsabilidad alguna respecto a los mismos.</p>

      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">7. Naturaleza de los Servicios</h3>
      <p>Los servicios ofrecidos en esta web corresponden al ámbito del coaching y desarrollo personal. Estos servicios no sustituyen en ningún caso la atención psicológica, médica o psiquiátrica.</p>

      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">8. Legislación Aplicable</h3>
      <p>La relación entre la titular del sitio web y el usuario se regirá por la normativa española vigente.</p>
    </div>
  </div>
);

const PrivacyPolicy = () => (
  <div className="container mx-auto px-6 py-32 max-w-4xl animate-fadeIn bg-white">
    <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
      <FileText className="text-teal-600" size={40} /> Política de Privacidad
    </h1>
    <div className="prose prose-slate max-w-none text-slate-600">
      <p>En Diana Loscos Coaching nos tomamos muy en serio la privacidad de tus datos personales. Esta política describe cómo recopilamos, utilizamos y protegemos la información que nos proporcionas a través de esta web.</p>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. Responsable del Tratamiento</h3>
      <p>Los datos personales facilitados a través de esta web serán tratados por Diana Loscos, con domicilio en Madrid, España.</p>
      <p>Correo electrónico de contacto: contacto@dianaloscoscoach.com.</p>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">2. Finalidad del Tratamiento</h3>
      <p>Los datos personales que se recaben a través de los formularios de contacto serán utilizados para:</p>
      <ul>
        <li>Gestionar solicitudes de información.</li>
        <li>Responder a consultas realizadas por los usuarios.</li>
        <li>En su caso, gestionar la prestación de servicios de coaching personal y profesional.</li>
      </ul>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">3. Legitimación</h3>
      <p>La base legal para el tratamiento de los datos es el consentimiento del usuario.</p>
      <p>Al completar los formularios de contacto y aceptar la presente política de privacidad, el usuario consiente expresamente el tratamiento de sus datos.</p>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">4. Conservación de los Datos</h3>
      <p>Los datos personales se conservarán durante el tiempo necesario para atender la solicitud realizada o mientras exista una relación profesional. Posteriormente se conservarán únicamente durante los plazos necesarios para cumplir con las obligaciones legales correspondientes.</p>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">5. Destinatarios</h3>
      <p>No se cederán datos a terceros, salvo obligación legal.</p>
      <p>Los datos pueden ser almacenados en servicios tecnológicos necesarios para el funcionamiento del sitio web, siempre garantizando las medidas adecuadas de seguridad.</p>
      
      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">6. Derechos del Usuario</h3>
      <p>El usuario tiene derecho a:</p>
      <ul>
        <li>Acceder a sus datos personales.</li>
        <li>Solicitar la rectificación de los datos inexactos.</li>
        <li>Solicitar su supresión cuando los datos ya no sean necesarios.</li>
        <li>Solicitar la limitación del tratamiento.</li>
        <li>Oponerse al tratamiento de sus datos.</li>
        <li>Solicitar la portabilidad de los datos.</li>
      </ul>
      <p>Para ejercer estos derechos puede enviar una solicitud al correo electrónico: contacto@dianaloscoscoach.com.</p>
      <p>Asimismo, si considera que el tratamiento de sus datos no se ajusta a la normativa vigente, puede presentar una reclamación ante la Agencia Española de Protección de Datos.</p>
    </div>
  </div>
);

const CookiesPolicy = () => (
  <div className="container mx-auto px-6 py-32 max-w-4xl animate-fadeIn bg-white">
    <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">Política de cookies</h1>
    <div className="prose prose-slate max-w-none text-slate-600">
      <p>La presente política de cookies forma parte del Aviso Legal y de la Política de Privacidad del sitio web titularidad de Diana Loscos, con domicilio en Madrid, España.</p>
      <p>Esta web utiliza cookies con el objetivo de mejorar la experiencia de navegación y analizar el uso que hacen los usuarios del sitio.</p>

      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. ¿Qué son las cookies?</h3>
      <p>Las cookies son pequeños archivos que se descargan en tu dispositivo al acceder a determinadas páginas web. Permiten almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.</p>

      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">2. Tipos de cookies utilizadas</h3>
      <p>Este sitio web puede utilizar los siguientes tipos de cookies:</p>
      <p><strong>Cookies técnicas o necesarias</strong></p>
      <p>Permiten la navegación a través de la página web y la utilización de las diferentes opciones o servicios que existen en ella.</p>
      <p><strong>Cookies de análisis</strong></p>
      <p>Permiten cuantificar el número de usuarios y realizar análisis estadísticos del uso que hacen los usuarios del sitio web con el fin de mejorar los servicios ofrecidos.</p>
      <p><strong>Cookies de personalización</strong></p>
      <p>Permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios.</p>

      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">3. Cookies de terceros</h3>
      <p>Este sitio web puede utilizar servicios de terceros que recopilan información con fines estadísticos y de uso de la web. Estos servicios pueden instalar cookies en el dispositivo del usuario.</p>

      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">4. Gestión de cookies</h3>
      <p>El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo mediante la configuración de las opciones del navegador utilizado.</p>
      <p>En los siguientes enlaces puede encontrar información sobre cómo hacerlo en los navegadores más habituales:</p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647?hl=es-ES" target="_blank" rel="noopener noreferrer">Google Chrome</a>
        </li>
        <li>
          <a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a>
        </li>
        <li>
          <a href="https://support.apple.com/es-es/105082" target="_blank" rel="noopener noreferrer">Safari</a>
        </li>
        <li>
          <a href="https://support.microsoft.com/es-es/windows/administrar-cookies-en-microsoft-edge-ver-permitir-bloquear-eliminar-y-usar-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Microsoft Edge</a>
        </li>
      </ul>
      <p>Si se desactivan las cookies, es posible que algunos servicios o funcionalidades de la web no estén disponibles.</p>

      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">5. Consentimiento</h3>
      <p>Las cookies no necesarias para el funcionamiento de la web solo se instalarán si el usuario presta su consentimiento mediante el banner o sistema de configuración de cookies del sitio.</p>

      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2">6. Actualizaciones</h3>
      <p>La presente política de cookies puede actualizarse en función de cambios legislativos o técnicos.</p>
      <p>Última actualización: marzo de 2026.</p>
    </div>
  </div>
);

const EthicsCode = () => (
  <div className="container mx-auto px-6 py-32 max-w-4xl animate-fadeIn bg-white">
    <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">Código Ético ICF</h1>
    <p className="text-slate-600 mb-6">
      Puedes descargar el documento oficial en PDF aquí:
    </p>
    <a
      href="/icf-codigo-etico-june-2025.pdf"
      download
      className="inline-flex items-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-800 transition-all shadow-lg hover:shadow-xl"
    >
      Descargar Código Ético ICF (PDF)
    </a>
  </div>
);

const FAQPage = () => (
  <div className="container mx-auto px-6 py-32 max-w-4xl animate-fadeIn bg-white">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Preguntas Frecuentes</h1>
      <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full mb-6"></div>
    </div>

    <div className="space-y-4">
      {[
        {
          q: "¿Cómo son las sesiones?",
          a: (
            <div className="text-slate-600 mt-4 leading-relaxed space-y-2">
              <p>60 minutos</p>
              <p>Formato online</p>
              <p>Espacio individual y confidencial</p>
              <p>Toda la información se trata con absoluta privacidad.</p>
            </div>
          ),
        },
        {
          q: "¿Puedo trabajar en varias sesiones?",
          a: (
            <div className="text-slate-600 mt-4 leading-relaxed space-y-2">
              <p>Sí. El trabajo continuado facilita una reflexión más profunda.</p>
              <p>Puedes elegir entre:</p>
              <p>Sesión individual – 60€</p>
              <p>Proceso 6 sesiones – 330€</p>
              <p>Proceso 10 sesiones – 520€</p>
            </div>
          ),
        },
        {
          q: "¿Cuántas sesiones necesito?",
          a: (
            <div className="text-slate-600 mt-4 leading-relaxed space-y-2">
              <p>Depende de lo que quieras revisar.</p>
              <p>Algunas situaciones pueden abordarse de forma puntual. En otros casos, un proceso permite consolidar decisiones y cambios con mayor claridad.</p>
            </div>
          ),
        },
        {
          q: "¿Qué ocurre en la primera sesión?",
          a: (
            <div className="text-slate-600 mt-4 leading-relaxed space-y-2">
              <p>Es un espacio para comprender tu situación actual, aclarar qué quieres revisar y valorar cómo quieres continuar.</p>
            </div>
          ),
        },
        {
          q: "¿Es terapia?",
          a: (
            <div className="text-slate-600 mt-4 leading-relaxed space-y-2">
              <p>No. No es psicoterapia ni asesoría.</p>
              <p>Si considero que necesitas apoyo terapéutico, te orientaré hacia el recurso adecuado.</p>
              <p>Trabajo alineada con el código ético de la ICF.</p>
            </div>
          ),
        },
      ].map((item) => (
        <details key={item.q} className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <summary className="flex items-center justify-between cursor-pointer text-left list-none">
            <span className="text-[20px] font-semibold text-slate-800">{item.q}</span>
            <span className="text-teal-600 text-2xl leading-none transition-transform group-open:rotate-45">+</span>
          </summary>
          {item.a}
        </details>
      ))}
    </div>
  </div>
);

// --- APP PRINCIPAL ---

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState('home');
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const navRef = useRef(null);
  const emailLink = "mailto:contacto@dianaloscoscoach.com";
  const gmailLink = "https://mail.google.com/mail/?view=cm&fs=1&to=contacto@dianaloscoscoach.com";
  const whatsappLink = "https://wa.me/34604978407";
  const phoneLink = "tel:+34604978407";
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const existing = document.cookie
      .split("; ")
      .find((row) => row.startsWith("dlc_cookie_consent="));
    if (!existing) {
      setShowCookieBanner(true);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleEmailClick = (e) => {
    if (isMobile) return;
    e.preventDefault();
    window.open(gmailLink, "_blank", "noopener,noreferrer");
  };

  const handleCookieChoice = (value) => {
    if (typeof document === "undefined") return;
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `dlc_cookie_consent=${value}; max-age=${maxAge}; path=/; samesite=lax`;
    setShowCookieBanner(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const targetElement = element.querySelector('h1, h2, h3') || element;
    const navHeight = navRef.current?.offsetHeight || 0;
    const navAdjustment = scrolled ? 0 : 16;
    const effectiveNavHeight = Math.max(0, navHeight - navAdjustment);
    const extraOffset = 58;
    const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - effectiveNavHeight - extraOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  };

  const navigateTo = (targetView, sectionId = null) => {
    setIsMenuOpen(false);
    
    if (targetView !== view) {
      setView(targetView);
      window.scrollTo(0, 0);
    }

    if (targetView === 'privacy' && typeof window !== "undefined") {
      window.localStorage.setItem("privacy_read", "true");
    }

    if (targetView === 'home' && sectionId) {
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  const navLinks = [
    { label: 'Para quién', section: 'para-quien' },
    { label: 'Qué es', section: 'que-es' },
    { label: 'Qué trabajamos', section: 'que-trabajamos' },
    { label: 'Proceso', section: 'proceso' },
    { label: 'Sobre Mí', section: 'sobre-mi' },
    { label: 'Inversión', section: 'inversion' },
  ];

  return (
    <div className="font-sans text-slate-800 bg-white antialiased selection:bg-teal-100 selection:text-teal-900 min-h-screen flex flex-col justify-between text-[20px] md:text-[20px] leading-relaxed">
      
      {/* --- NAVBAR --- */}
      <nav ref={navRef} className={`fixed w-full z-50 transition-all duration-300 ${scrolled || view !== 'home' ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO EN TEXTO (Reemplazando imagen) */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home', 'inicio')}>
            <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center">
              <img
                src="/logo_diana_square.png"
                alt="Diana Loscos"
                className="h-9 w-9 object-contain"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className={`text-2xl font-serif font-bold tracking-tight transition-colors ${scrolled || view !== 'home' ? 'text-teal-900' : 'text-slate-800 group-hover:text-teal-800'}`}>
                Diana Loscos<span className="text-teal-500">.</span>
              </span>
              <span className={`text-[14px] md:text-[16px] uppercase tracking-[0.2em] font-medium transition-colors mt-0.5 ${scrolled || view !== 'home' ? 'text-slate-500' : 'text-slate-600 group-hover:text-teal-600'}`}>
                Coach de desarrollo personal y profesional
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {view === 'home' ? (
              <>
                {navLinks.map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => navigateTo('home', item.section)}
                    className={`text-[18px] font-medium hover:text-teal-600 transition-colors ${scrolled ? 'text-slate-600' : 'text-slate-700'}`}
                  >
                    {item.label}
                  </button>
                ))}
                <button 
                  onClick={() => navigateTo('home', 'contacto')}
                  className="bg-teal-700 text-white px-5 py-2 rounded-full text-[18px] font-medium hover:bg-teal-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Contactar Ahora
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 text-teal-700 font-medium hover:text-teal-900"
              >
                <ArrowLeft size={18} /> Volver al Inicio
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-slate-700 p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 flex flex-col items-center space-y-4 animate-fadeIn">
            {navLinks.map((item) => (
              <button 
                key={item.label}
                onClick={() => navigateTo('home', item.section)}
                className="text-slate-700 font-medium py-2 px-4 hover:bg-slate-50 w-full text-center"
              >
                {item.label}
              </button>
            ))}
            <button 
                onClick={() => navigateTo('home', 'contacto')}
                className="text-teal-700 font-bold py-2 px-4 w-full text-center"
              >
                Contacto
            </button>
          </div>
        )}
      </nav>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-grow">
        {view === 'home' && (
          <Home
            onScrollTo={scrollToSection}
            emailLink={emailLink}
            onEmailClick={handleEmailClick}
            whatsappLink={whatsappLink}
            phoneLink={phoneLink}
          />
        )}
        {view === 'legal' && <LegalNotice />}
        {view === 'privacy' && <PrivacyPolicy />}
        {view === 'cookies' && <CookiesPolicy />}
        {view === 'ethics' && <EthicsCode />}
        {view === 'faq' && <FAQPage />}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-white font-serif text-2xl font-bold mb-4">Diana Loscos<span className="text-teal-500">.</span></h3>
          <p className="text-[20px] mb-6 max-w-xl mx-auto text-slate-400">
            Esta web no está diseñada para convencer ni prometer cambios rápidos. Está pensada como un espacio claro y honesto para quienes sienten que algo en su forma de vivir o trabajar necesita ser revisado.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8 text-[20px]">
            <button onClick={() => navigateTo('legal')} className="hover:text-white transition-colors">Aviso Legal</button>
            <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">Política de Privacidad</button>
            <button onClick={() => navigateTo('cookies')} className="hover:text-white transition-colors">Política de cookies</button>
            <button onClick={() => navigateTo('ethics')} className="hover:text-white transition-colors">Código Ético ICF</button>
            <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">Preguntas frecuentes</button>
          </div>
          <p className="text-[20px] text-slate-600">
            © {new Date().getFullYear()} Diana Loscos Coaching. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {showCookieBanner && (
        <div className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[60]">
          <div className="bg-slate-900 text-slate-100 rounded-2xl shadow-2xl px-6 py-4 flex flex-col md:flex-row md:items-center gap-4">
            <p className="text-[18px] leading-relaxed">
              Usamos cookies técnicas para el funcionamiento básico y cookies de análisis si las aceptas. Puedes leer la política completa aquí.
              <button onClick={() => navigateTo('cookies')} className="ml-2 underline text-teal-300 hover:text-teal-200">
                Política de cookies
              </button>
            </p>
            <div className="flex items-center gap-3 md:ml-auto">
              <button onClick={() => handleCookieChoice("rejected")} className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                Rechazar
              </button>
              <button onClick={() => handleCookieChoice("accepted")} className="px-4 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-500 transition-colors">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] sm:bottom-6 sm:right-6 flex flex-col gap-3 z-50">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-xl hover:bg-teal-800 transition-colors"
          aria-label="Abrir WhatsApp"
        >
          <MessageCircle size={22} />
        </a>
        <a
          href={phoneLink}
          className="w-14 h-14 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-xl hover:bg-teal-800 transition-colors"
          aria-label="Llamar por telefono"
        >
          <Phone size={22} />
        </a>
        <a
          href={emailLink}
          onClick={handleEmailClick}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-xl hover:bg-teal-800 transition-colors"
          aria-label="Enviar email"
        >
          <Mail size={22} />
        </a>
      </div>

    </div>
  );
};

// Subcomponentes

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-shadow border border-slate-100">
    {icon}
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 text-[20px] leading-relaxed">{description}</p>
  </div>
);

const BenefitItem = ({ text }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 bg-teal-100 p-1 rounded-full shrink-0">
      <CheckCircle size={16} className="text-teal-600" />
    </div>
    <p className="text-slate-700 font-medium">{text}</p>
  </div>
);

const BenefitItemDark = ({ text }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 bg-teal-600 p-1 rounded-full shrink-0">
      <CheckCircle size={16} className="text-white" />
    </div>
    <p className="text-slate-200 font-medium">{text}</p>
  </div>
);

const PricingCard = ({ title, price, description, highlighted = false }) => (
  <div className={`p-8 rounded-2xl transition-all border ${highlighted ? 'bg-white text-slate-800 shadow-xl transform hover:-translate-y-1 relative overflow-hidden' : 'bg-transparent text-white border-teal-700 hover:bg-teal-800/50'}`}>
    {highlighted && <div className="absolute top-0 inset-x-0 h-1 bg-teal-500"></div>}
    <h3 className={`text-xl font-bold mb-4 ${highlighted ? 'text-teal-900' : 'text-teal-100'}`}>{title}</h3>
    <p className={`text-4xl font-serif font-bold mb-2 ${highlighted ? 'text-teal-600' : 'text-white'}`}>{price}</p>
    {description && <p className={`text-[20px] ${highlighted ? 'text-slate-500' : 'text-teal-200'}`}>{description}</p>}
  </div>
);

const SocialIcon = ({ Icon, href = "#" }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-teal-600 hover:text-white transition-colors">
    <Icon size={20} />
  </a>
);

const ContactItem = ({ Icon, title, value, sub, link, onClick }) => {
  const openInNewTab = link?.startsWith("https://");

  return (
    <div className="flex items-start gap-4 w-full pr-2">
      <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 shrink-0">
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-[20px] text-slate-400 font-medium uppercase tracking-wide">{title}</p>
        {link ? (
          <a
            href={link}
            onClick={onClick}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
            className="text-[20px] font-semibold text-slate-800 hover:text-teal-600 transition-colors break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-[20px] font-semibold text-slate-800 break-all">{value}</p>
        )}
        {sub && <p className="text-[20px] text-slate-500">{sub}</p>}
      </div>
    </div>
  );
};

export default App;










