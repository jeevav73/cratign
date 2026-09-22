import { useState } from 'react';
import { submitContact } from '../utils/api.js';
import MagneticButton from '../components/MagneticButton.jsx';
import { SOCIAL_LINKS } from '../data/site.js';

const INITIAL = { name: '', email: '', company: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [fields, setFields] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setError('');
    setFields({});
    try {
      await submitContact(form);
      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong.');
      setFields(err.fields || {});
    }
  };

  return (
    <div className="grid min-h-screen gap-12 px-5 pt-32 pb-20 md:grid-cols-2 md:px-10 md:pt-40">
      <div>
        <p className="font-display text-[11px] tracking-[0.28em] text-accent">START A PROJECT</p>
        <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.06em]">
          TELL US WHAT
          <br />
          YOU WANT TO
          <br />
          MAKE.
        </h1>
        <p className="mt-8 max-w-md text-paper-dim">
          Share a few lines about the brand, the problem and the timeline. We typically reply within
          two working days.
        </p>
        <a
          href="mailto:hello@creativestudio.com"
          className="mt-8 inline-block font-display text-sm tracking-[0.12em] text-accent"
        >
          hello@creativestudio.com
        </a>
        <ul className="mt-10 flex flex-wrap gap-5 font-display text-xs tracking-[0.2em] text-muted">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer" className="hover:text-paper">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={onChange}
          error={fields.name}
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          error={fields.email}
          required
        />
        <Field
          label="Company"
          name="company"
          value={form.company}
          onChange={onChange}
          error={fields.company}
        />
        <Field
          label="Message"
          name="message"
          as="textarea"
          value={form.message}
          onChange={onChange}
          error={fields.message}
          required
        />
        {error ? <p className="text-sm text-accent-hot">{error}</p> : null}
        {status === 'success' ? (
          <p className="text-sm text-accent">Thanks — we will be in touch shortly.</p>
        ) : null}
        <MagneticButton
          type="submit"
          className="rounded-full bg-accent px-8 py-4 font-display text-xs tracking-[0.22em] text-ink disabled:opacity-50"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'SENDING…' : 'SEND MESSAGE →'}
        </MagneticButton>
      </form>
    </div>
  );
}

function Field({ label, name, value, onChange, error, type = 'text', as = 'input', required }) {
  const shared = {
    id: name,
    name,
    value,
    onChange,
    required,
    className:
      'w-full border-b border-line bg-transparent py-3 text-paper outline-none transition-colors focus:border-accent',
  };

  return (
    <label className="block">
      <span className="font-display text-[11px] tracking-[0.22em] text-muted">{label}</span>
      {as === 'textarea' ? (
        <textarea rows={5} {...shared} />
      ) : (
        <input type={type} autoComplete={name} {...shared} />
      )}
      {error ? <span className="mt-2 block text-xs text-accent-hot">{error}</span> : null}
    </label>
  );
}
