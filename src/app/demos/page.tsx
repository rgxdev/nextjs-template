import { Metadata } from "next";
import { FeatureDemo } from "@/components/examples/FeatureDemo";

export const metadata: Metadata = {
  title: "Feature Demos",
  description: "Demonstrationen der erweiterten Features unseres Next.js Templates",
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold">Feature Demos</h1>
            <p className="text-muted-foreground mt-2">
              Entdecken Sie die erweiterten Features unseres Templates
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FeatureDemo />
      </main>
    </div>
  );
}
