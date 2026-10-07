"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  if (!config.projectId) {
    return (
      <main className="min-h-screen bg-cream text-charcoal p-10 font-body">
        <h1 className="font-display text-5xl mb-6">STUDIO NOT CONFIGURED</h1>
        <p className="max-w-xl text-base">
          To activate the content editor, create a free Sanity project at
          sanity.io, then set these environment variables and restart the dev
          server:
        </p>
        <pre className="bg-charcoal text-cream p-4 mt-6 text-sm overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production`}
        </pre>
        <p className="mt-6 text-base">
          Or run{" "}
          <code className="bg-charcoal text-cream px-2 py-1">
            npx sanity init
          </code>{" "}
          in the project root to create one interactively.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
