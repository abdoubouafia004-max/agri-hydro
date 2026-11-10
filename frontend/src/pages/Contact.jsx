import { useState } from 'react';
import { settings } from '../data/mock.js';
import { whatsappLink } from '../utils/whatsapp.js';
import PageHead from '../components/common/PageHead.jsx';
import AnimatedContent from '../components/common/AnimatedContent.jsx';

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`;

const SUBJECTS = ['Demande de conseil', 'Demande de devis', 'Entretien / remplacement de filtres', 'Installation', 'Autre'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', subject: SUBJECTS[0], message: '' });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Pas de backend à cette étape : le formulaire prépare un message WhatsApp.
  const submit = (e) => {
    e.preventDefault();
    const text = [`Bonjour, je suis ${form.name.trim()}.`, `Objet : ${form.subject}`, '', form.message.trim()].join('\n');
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
  };

  const cards = [
    { ic: 'fa-brands fa-whatsapp', t: 'WhatsApp', v: settings.phone, href: whatsappLink('Bonjour,'), ext: true, cls: 'wa' },
    { ic: 'fa-solid fa-phone', t: 'Téléphone', v: settings.phone, href: `tel:${settings.phoneHref}` },
    { ic: 'fa-solid fa-location-dot', t: 'Adresse', v: settings.address, href: mapsUrl, ext: true },
    settings.email && { ic: 'fa-solid fa-envelope', t: 'E-mail', v: settings.email, href: `mailto:${settings.email}` },
    { ic: 'fa-brands fa-instagram', t: 'Instagram', v: '@steagrihydrosolution', href: settings.instagram, ext: true },
  ].filter(Boolean);

  return (
    <>
      <PageHead title="Contact" sub={`${settings.contactName} vous répond ${settings.hours.toLowerCase()}. Décrivez votre besoin, nous vous conseillons.`} crumbs={[{ label: 'Contact' }]} />
      <section className="section">
        <AnimatedContent className="wrap contact" trigger="mount" distance={40} duration={0.7} stagger={0.12}>
          <div className="contact-cards">
            {cards.map((c) => (
              <a key={c.t} className={`contact-card ${c.cls || ''}`} href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="contact-ico"><i className={c.ic} /></span>
                <span><strong>{c.t}</strong><span>{c.v}</span></span>
                <i className="fa-solid fa-arrow-right go" aria-hidden="true" />
              </a>
            ))}
            <p className="hours"><i className="fa-regular fa-clock" /> {settings.hours}</p>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <h2>Écrivez-nous</h2>
            <p className="form-sub">Votre message s'ouvrira dans WhatsApp, prêt à être envoyé.</p>
            <label>
              <span>Votre nom</span>
              <input required value={form.name} onChange={update('name')} autoComplete="name" maxLength={80} />
            </label>
            <label>
              <span>Objet</span>
              <select value={form.subject} onChange={update('subject')}>
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label>
              <span>Votre message</span>
              <textarea required rows={5} value={form.message} onChange={update('message')} maxLength={1500}
                placeholder="Ex. : je cherche un osmoseur pour une famille de 5 personnes…" />
            </label>
            <button className="btn btn-wa" type="submit"><i className="fa-brands fa-whatsapp" /> Préparer le message</button>
          </form>
        </AnimatedContent>
      </section>
    </>
  );
}
