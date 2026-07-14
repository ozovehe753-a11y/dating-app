'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState('');
  async function submit(e) {
    e.preventDefault(); setError('');
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    router.push('/discover');
  }
  return <main className="authPage"><form className="authCard" onSubmit={submit}><a className="logo" href="/">♥ DESIRE</a><h1>Create your profile</h1><p>Join an 18+ community built for meaningful connections.</p>{error && <div className="error">{error}</div>}<label>Name<input name="name" required /></label><label>Email<input name="email" type="email" required /></label><label>Password<input name="password" type="password" minLength="8" required /></label><div className="formRow"><label>Age<input name="age" type="number" min="18" required /></label><label>Location<input name="location" required /></label></div><div className="formRow"><label>I am<select name="gender" required><option value="">Choose</option><option>Woman</option><option>Man</option><option>Non-binary</option></select></label><label>Interested in<select name="interestedIn" required><option value="">Choose</option><option>Women</option><option>Men</option><option>Everyone</option></select></label></div><button className="large" type="submit">Create account ♥</button><p className="authSwitch">Already have an account? <a href="/login">Log in</a></p></form></main>;
}
