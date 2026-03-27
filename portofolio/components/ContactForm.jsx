'use client'
import { useState } from 'react'
import s from './ContactForm.module.css'

const FIELDS = [
  { id: 'name',    label: 'Your Name',    type: 'text',  placeholder: 'Jane Smith',                required: true },
  { id: 'email',   label: 'Email',        type: 'email', placeholder: 'jane@company.com',           required: true },
  { id: 'subject', label: 'Subject',      type: 'text',  placeholder: 'Frontend Developer Role — Acme Corp', required: false },
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 6000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const disabled = status === 'sending' || status === 'success'

  return (
    <form onSubmit={submit} className={s.form}>
      {FIELDS.map(f => (
        <div key={f.id} className={s.group}>
          <label className={s.label} htmlFor={f.id}>
            {f.label}
            {f.required && <span className={s.req}>*</span>}
          </label>
          <input
            id={f.id}
            type={f.type}
            placeholder={f.placeholder}
            value={form[f.id]}
            onChange={e => set(f.id, e.target.value)}
            required={f.required}
            disabled={disabled}
            className={s.input}
          />
        </div>
      ))}

      <div className={s.group}>
        <label className={s.label} htmlFor="message">
          Message <span className={s.req}>*</span>
        </label>
        <textarea
          id="message"
          placeholder="Hi Matt, I came across your portfolio and would love to discuss..."
          value={form.message}
          onChange={e => set('message', e.target.value)}
          required
          disabled={disabled}
          className={s.textarea}
        />
      </div>

      <button type="submit" disabled={disabled} className={`${s.btn} ${s[status]}`}>
        {status === 'idle'    && <><SendIcon /> Send Message</>}
        {status === 'sending' && <><Spinner />  Sending...</>}
        {status === 'success' && <><CheckIcon /> Message Sent!</>}
        {status === 'error'   && <><ErrorIcon /> Failed — Try Again</>}
      </button>

      {status === 'success' && (
        <p className={s.successNote}>
          ✓ Your message has been delivered to Matthew's inbox.
        </p>
      )}
      {status === 'error' && (
        <p className={s.errorNote}>
          Something went wrong. You can also reach Matthew at{' '}
          <a href="mailto:mattchris16@gmail.com">mattchris16@gmail.com</a>
        </p>
      )}
    </form>
  )
}

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const ErrorIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
)
const Spinner = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
    <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
)
