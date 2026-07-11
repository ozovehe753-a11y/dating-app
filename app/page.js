const profiles = [
  { name: 'Amara', age: 24, location: 'Lagos', emoji: '👩🏾‍🦱', bio: 'Designer, foodie and sunset lover.' },
  { name: 'David', age: 27, location: 'Abuja', emoji: '👨🏾', bio: 'Tech, music and meaningful conversations.' },
  { name: 'Zainab', age: 23, location: 'Ilorin', emoji: '👩🏾', bio: 'Books, travel and good energy.' }
];

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <div className="logo">♥ Heartly</div>
        <div className="navActions"><button className="ghost">Log in</button><button>Join Heartly</button></div>
      </nav>

      <section className="hero">
        <div className="heroCopy">
          <span className="pill">✨ Dating with intention</span>
          <h1>Find someone who <span>feels like home.</span></h1>
          <p>Meet genuine people, build meaningful connections, and start a story worth telling.</p>
          <div className="heroButtons"><button className="large">Create free account</button><button className="large secondary">Explore profiles</button></div>
          <small>🔒 18+ community · Safety-first · Free to join</small>
        </div>
        <div className="loveCard">
          <div className="avatar">👩🏾‍🦱</div>
          <h2>Amara, 24 <span className="online">●</span></h2>
          <p>📍 Lagos · 3 km away</p>
          <div className="tags"><span>Art</span><span>Travel</span><span>Food</span></div>
          <div className="cardActions"><button className="pass">✕</button><button className="like">♥</button></div>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">DISCOVER</p><h2>People you might vibe with</h2>
        <div className="grid">{profiles.map((profile) => (
          <article className="profile" key={profile.name}>
            <div className="profilePhoto">{profile.emoji}</div>
            <div className="profileBody"><h3>{profile.name}, {profile.age}</h3><p>📍 {profile.location}</p><p>{profile.bio}</p><button>View profile</button></div>
          </article>
        ))}</div>
      </section>

      <section className="cta"><h2>Your next chapter could start today.</h2><p>Create your profile and meet people looking for something real.</p><button className="large light">Get started free ♥</button></section>
      <footer>♥ Heartly <span>Made for meaningful connections.</span></footer>
    </main>
  );
}
