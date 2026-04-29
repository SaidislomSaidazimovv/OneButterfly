import { useState } from 'react';
import { Navbar, Footer, FadeIn, ChevronDown, Check } from '../components/shared';

const NDA_TEXT = `ONE HUMANITY FOUNDATION
Mutual Confidentiality Agreement

Between: One Humanity Foundation, a 501(c)(3) corporation
And: [Recipient name and organization]
Date: [Auto-filled on submit]

1. CONFIDENTIAL INFORMATION
Recipient may receive non-public information including partnership tiers,
financial projections, founding partner identities, launch plans, and
research materials. Recipient agrees to keep this information confidential
and not share it with third parties without written permission from the
Foundation.

2. PERMITTED USE
Recipient may share confidential information with their own legal counsel,
financial advisors, and authorized officers strictly for the purpose of
evaluating partnership.

3. EXCLUSIONS
This agreement does not cover information already publicly available or
information independently developed by the Recipient.

4. TERM
This agreement remains in effect for two (2) years from the date of signing.

5. GOVERNING LAW
This agreement is governed by the laws of the State of Delaware, USA.

By checking the box above, Recipient agrees to be bound by this agreement
in the same manner as a signed paper document.

Signed electronically by: [Recipient name]
Organization: [Recipient organization]
IP address: [Auto-filled]
Timestamp: [Auto-filled UTC]`;

type Role = 'brand' | 'foundation' | 'school' | 'workplace' | 'press' | 'other';

interface FormState {
  full_name: string;
  organization: string;
  role: Role | '';
  email: string;
  phone: string;
  nda_accepted: boolean;
}

const emptyForm: FormState = {
  full_name: '',
  organization: '',
  role: '',
  email: '',
  phone: '',
  nda_accepted: false,
};

type Status = 'idle' | 'submitting' | 'sent' | 'error';

export default function AccessPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [ndaOpen, setNdaOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.full_name.trim()) next.full_name = 'Required';
    if (!form.organization.trim()) next.organization = 'Required';
    if (!form.role) next.role = 'Select your role';
    if (!form.email.trim()) next.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid work email';
    if (!form.nda_accepted) next.nda_accepted = 'You must accept the NDA to continue';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/access', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.full_name.trim(),
          organization: form.organization.trim(),
          role: form.role,
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim() || null,
        }),
      });
      if (!res.ok) {
        const ct = res.headers.get('content-type') || '';
        const msg = ct.includes('application/json')
          ? (await res.json().catch(() => ({}))).error || 'Something went wrong. Please try again.'
          : 'Something went wrong. Please try again.';
        throw new Error(msg);
      }
      setStatus('sent');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Network error');
      setStatus('error');
    }
  };

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  if (status === 'sent') {
    return (
      <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center pt-32 pb-20">
          <div className="container max-w-[640px]">
            <FadeIn>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-8"
                style={{ background: 'var(--accent-light)' }}
              >
                <Check size={26} style={{ color: 'var(--accent)' }} />
              </div>
              <span className="overline mb-4 block">CHECK YOUR EMAIL</span>
              <h1 className="mb-6 text-ink">A signed NDA is on its way to {form.email}.</h1>
              <p className="text-muted text-[18px] leading-relaxed mb-6">
                Open the email titled <span className="text-ink font-semibold">"Your NDA + access link"</span>{' '}
                and click the link inside to enter the partner portal. The link is single-use and tied to this browser.
              </p>
              <p className="caption">
                Didn't get it within 60 seconds? Check spam, or email{' '}
                <a href="mailto:hello@butterfly.one" className="text-accent font-bold hover:underline">
                  hello@butterfly.one
                </a>
                .
              </p>
            </FadeIn>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <section className="section bg-white pt-0">
          <div className="container max-w-[640px]">
            <FadeIn>
              <span className="overline mb-4 block">PARTNER ACCESS</span>
              <h1 className="mb-6 text-ink">Request access to the partner portal.</h1>
              <p className="text-muted text-[18px] leading-relaxed mb-10">
                A 501(c)(3) nonprofit. Sign a mutual NDA, receive a signed copy by email, and we'll send you a
                magic link to enter the portal. One link per browser, valid for 30 days.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <Field
                  id="full_name"
                  label="Full name"
                  required
                  error={errors.full_name}
                  value={form.full_name}
                  onChange={(v) => set('full_name', v)}
                  autoComplete="name"
                />
                <Field
                  id="organization"
                  label="Organization"
                  required
                  error={errors.organization}
                  value={form.organization}
                  onChange={(v) => set('organization', v)}
                  autoComplete="organization"
                />
                <SelectField
                  id="role"
                  label="Role"
                  required
                  error={errors.role}
                  value={form.role}
                  onChange={(v) => set('role', v as Role)}
                  options={[
                    { value: '', label: 'Select…' },
                    { value: 'brand', label: 'Brand' },
                    { value: 'foundation', label: 'Foundation' },
                    { value: 'school', label: 'School' },
                    { value: 'workplace', label: 'Workplace' },
                    { value: 'press', label: 'Press' },
                    { value: 'other', label: 'Other' },
                  ]}
                />
                <Field
                  id="email"
                  type="email"
                  label="Work email"
                  required
                  error={errors.email}
                  value={form.email}
                  onChange={(v) => set('email', v)}
                  autoComplete="email"
                  inputMode="email"
                />
                <Field
                  id="phone"
                  type="tel"
                  label="Phone (optional)"
                  error={errors.phone}
                  value={form.phone}
                  onChange={(v) => set('phone', v)}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+1 555 555 5555"
                />

                <div className="mt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.nda_accepted}
                      onChange={(e) => set('nda_accepted', e.target.checked)}
                      className="mt-1 w-5 h-5 shrink-0 cursor-pointer"
                      style={{ accentColor: 'var(--accent)' }}
                    />
                    <span className="text-ink text-[15px] leading-relaxed">
                      I have read and agree to the{' '}
                      <button
                        type="button"
                        className="text-accent font-semibold hover:underline"
                        onClick={() => setNdaOpen((x) => !x)}
                      >
                        Mutual Confidentiality Agreement
                      </button>
                      , and I am authorized to bind my organization.
                    </span>
                  </label>
                  {errors.nda_accepted && (
                    <p className="text-[13px] mt-2 ml-8" style={{ color: '#C0392B' }}>
                      {errors.nda_accepted}
                    </p>
                  )}
                </div>

                <div
                  className="rounded-2xl border overflow-hidden transition-all"
                  style={{ borderColor: 'var(--hair)' }}
                >
                  <button
                    type="button"
                    onClick={() => setNdaOpen((x) => !x)}
                    className="w-full flex items-center justify-between px-5 py-3 text-left"
                    aria-expanded={ndaOpen}
                  >
                    <span className="text-[14px] font-semibold text-ink">View full NDA text</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: ndaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform .2s',
                        color: 'var(--caption)',
                      }}
                    />
                  </button>
                  {ndaOpen && (
                    <pre
                      className="px-5 py-4 text-[12px] leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto"
                      style={{ background: 'var(--bg-muted)', color: 'var(--muted)' }}
                    >
                      {NDA_TEXT}
                    </pre>
                  )}
                </div>

                {serverError && (
                  <div
                    className="rounded-xl px-4 py-3 text-[14px]"
                    style={{ background: '#FAECE7', color: '#8A2A1F' }}
                  >
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary mt-2 px-8 py-4 text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending NDA…' : 'Sign NDA & email me the link'}
                </button>

                <p className="caption mt-2">
                  Your email is used only for partnership communication. We don't sell or share data.
                </p>
              </form>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'search' | 'url';
  placeholder?: string;
}

const inputBase =
  'w-full rounded-2xl px-4 py-3 text-[15px] text-ink outline-none transition-colors bg-white';

function Field({
  id, label, value, onChange, required, error, type = 'text',
  autoComplete, inputMode, placeholder,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold text-ink">
        {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={inputBase}
        style={{
          border: error ? '1px solid #C0392B' : '1px solid var(--hair)',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--accent)';
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--hair)';
        }}
      />
      {error && <p className="text-[13px]" style={{ color: '#C0392B' }}>{error}</p>}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}

function SelectField({ id, label, value, onChange, options, required, error }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold text-ink">
        {label} {required && <span style={{ color: 'var(--accent)' }}>*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={inputBase + ' appearance-none cursor-pointer'}
        style={{
          border: error ? '1px solid #C0392B' : '1px solid var(--hair)',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236E6E73' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
          paddingRight: 44,
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-[13px]" style={{ color: '#C0392B' }}>{error}</p>}
    </div>
  );
}
