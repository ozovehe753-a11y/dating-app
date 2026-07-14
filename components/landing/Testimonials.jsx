const testimonials = [
  {
    name: "Sarah & David",
    text: "DESIRE helped us meet. We got engaged after one year together!",
    stars: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Amanda",
    text: "The easiest dating app I've ever used. I met amazing people.",
    stars: "⭐⭐⭐⭐⭐",
  },
  {
    name: "Michael",
    text: "Beautiful design, real matches and genuine conversations.",
    stars: "⭐⭐⭐⭐⭐",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-pink-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900">
            Success Stories
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Thousands of people have already found love.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl bg-white p-8 shadow-lg"
            >
              <div className="mb-4 text-2xl">
                {item.stars}
              </div>

              <p className="text-gray-600 italic">
                "{item.text}"
              </p>

              <h3 className="mt-6 text-xl font-bold text-pink-600">
                {item.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}