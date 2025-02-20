"use client";

import { useState } from "react";
import DemoLayout from "@/components/demo-layout";

export default function HardcodedKeysDemo() {
  const [showKey, setShowKey] = useState(false);

  return (
    <DemoLayout
      title="Hardcoded API Keys Demo"
      description="Storing API keys and secrets directly in your code is dangerous. Learn why this is a security risk and how to properly handle sensitive credentials."
    >
      <div className="space-y-8">
        <section className="demo-section">
          <h2 className="demo-title">Vulnerable Code</h2>
          <p className="mb-4">
            This code contains a hardcoded API key that anyone can see:
          </p>
          <pre className="code-block overflow-x-auto">
            {`// BAD: API key exposed in frontend code
const apiKey = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

fetch('https://api.service.com/data', {
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  }
})`}
          </pre>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Simulated Git Repository</h2>
          <p className="mb-4">Attackers can find API keys by:</p>
          <ul className="list-inside list-disc space-y-2">
            <li>Viewing source code in the browser</li>
            <li>Searching public Git repositories</li>
            <li>Monitoring network requests</li>
          </ul>
          <button
            className="mt-4 rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? "Hide" : "Show"} Exposed API Key
          </button>
          {showKey && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 p-4">
              <p className="font-mono text-red-700">
                Found API key: sk_test_4eC39HqLyjWDarjtT1zdp7dc
              </p>
            </div>
          )}
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Secure Solution</h2>
          <p className="mb-4">
            Use environment variables and keep sensitive data on the server:
          </p>
          <pre className="code-block overflow-x-auto">
            {`// .env file (never commit this!)
API_KEY=sk_test_4eC39HqLyjWDarjtT1zdp7dc

// Server-side code (Next.js API route)
export async function GET() {
  const apiKey = process.env.API_KEY
  const response = await fetch('https://api.service.com/data', {
    headers: {
      'Authorization': \`Bearer \${apiKey}\`
    }
  })
  return Response.json(await response.json())
}

// Client-side code (React component)
// The API key is never exposed to the browser
fetch('/api/getData')`}
          </pre>
        </section>
      </div>
    </DemoLayout>
  );
}
