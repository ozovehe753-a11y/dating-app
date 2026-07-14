import { Card, CardContent } from "@/components/ui/card";

export default function HeroCards() {
  return (
    <div className="mt-16 grid gap-6 md:grid-cols-3">
      <Card className="rounded-3xl">
        <CardContent className="p-6">
          <div className="text-5xl">❤️</div>
          <h3 className="mt-4 text-xl font-bold">Real Matches</h3>
          <p className="mt-2 text-gray-500">
            Connect with genuine people looking for meaningful relationships.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-3xl">
        <CardContent className="p-6">
          <div className="text-5xl">💬</div>
          <h3 className="mt-4 text-xl font-bold">Instant Chat</h3>
          <p className="mt-2 text-gray-500">
            Start conversations immediately after matching.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-3xl">
        <CardContent className="p-6">
          <div className="text-5xl">🔒</div>
          <h3 className="mt-4 text-xl font-bold">Safe & Secure</h3>
          <p className="mt-2 text-gray-500">
            Your privacy and security come first.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}