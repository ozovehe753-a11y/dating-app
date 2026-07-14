import {
  Heart,
  ShieldCheck,
  MessageCircle,
  MapPin,
  Camera,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Smart Matching",
    description: "Discover people based on your interests and preferences.",
  },
  {
    icon: MessageCircle,
    title: "Instant Chat",
    description: "Talk instantly after matching with someone.",
  },
  {
    icon: Camera,
    title: "Photo Sharing",
    description: "Upload beautiful profile photos securely.",
  },
  {
    icon: MapPin,
    title: "Nearby People",
    description: "Find singles around your location.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Profiles",
    description: "Stay safe with profile verification.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description: "Get better matches with intelligent suggestions.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900">
            Why Choose DESIRE?
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Everything you need to meet genuine people.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100">
                  <Icon className="h-7 w-7 text-pink-600" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}