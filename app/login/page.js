'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";

export default function Login() {
  const router = useRouter(); const [error, setError] = useState('');
  async function submit(e) { e.preventDefault(); setError(''); const body = Object.fromEntries(new FormData(e.currentTarget)); const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) }); const data = await res.json(); if(!res.ok) return setError(data.error); router.push('/discover'); }
  return <main className="authPage"><form className="authCard" onSubmit={submit}><a className="logo" href="/">♥ DESIRE</a><h1>Welcome back</h1><p>Log in to continue discovering connections.</p>{error && <div className="error">{error}</div>}<label>Email<input name="email" type="email" required /></label><label>Password<input name="password" type="password" required /></label><button className="large" type="submit">Log in</button><p className="authSwitch">New to DESIRE? <a href="/signup">Create an account</a></p></form></main>;
}
