'use client';
import { useState } from 'react';

export default function DiscoverClient({ me, profiles }) {
  const [index,setIndex]=useState(0); const [message,setMessage]=useState(''); const profile=profiles[index];
  function pass(){setMessage('');setIndex(i=>i+1)}
  async function like(){const res=await fetch('/api/likes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({receiverId:profile.id})});const data=await res.json();setMessage(data.matched?'💖 It’s a match!':'♥ Like sent');setTimeout(()=>{setMessage('');setIndex(i=>i+1)},1000)}
  return <main className="discoverPage"><nav className="nav"><a className="logo" href="/">♥ Heartly</a><strong>Hi, {me}</strong></nav><section className="discoverWrap"><p className="eyebrow">DISCOVER</p><h1>Find your person</h1>{message&&<div className="matchNotice">{message}</div>}{profile?<article className="swipeCard"><div className="discoverPhoto">{profile.imageUrl?<img src={profile.imageUrl} alt={profile.name}/>:<span>♥</span>}</div><div className="swipeBody"><h2>{profile.name}, {profile.age}</h2><p>📍 {profile.location}</p><p>{profile.bio||'Here to meet genuine people and build meaningful connections.'}</p><div className="cardActions"><button className="pass" onClick={pass}>✕</button><button className="like" onClick={like}>♥</button></div></div></article>:<div className="emptyState"><h2>You’re all caught up ♥</h2><p>More profiles will appear as new people join Heartly.</p></div>}</section></main>;
}
