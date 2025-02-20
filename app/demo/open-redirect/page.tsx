"use client";

import type React from "react";

import { useState } from "react";
import DemoLayout from "@/components/demo-layout";
import { Toast } from "@/components/toast";

export default function OpenRedirectDemo() {
  const [redirectUrl, setRedirectUrl] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const simulateRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWarning(true);
    setShowToast(true);

    // Simulate redirect after warning
    setTimeout(() => {
      window.location.href = "#simulated-redirect";
    }, 1000);
  };

  return (
    <DemoLayout
      title="Open Redirect Demo"
      description="Open redirects occur when a website accepts user input to determine where to redirect users. Attackers can abuse this to send users to malicious sites."
    >
      <div className="space-y-8">
        <section className="demo-section">
          <h2 className="demo-title">Understanding Open Redirects</h2>
          <p className="mb-4">Open redirect vulnerabilities can be used for:</p>
          <ul className="list-inside list-disc space-y-2">
            <li>Phishing attacks</li>
            <li>Malware distribution</li>
            <li>Credential theft</li>
            <li>Social engineering</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Vulnerable Login Page</h2>
          <p className="mb-4">
            This login form has a "return_to" parameter that's vulnerable to
            open redirects:
          </p>
          <div className="rounded border p-4">
            <h3 className="mb-4 text-lg font-semibold">Login to ExampleBank</h3>
            <form onSubmit={simulateRedirect} className="space-y-4">
              <input
                type="hidden"
                name="return_to"
                value={redirectUrl || "https://evil-site.com/fake-bank"}
              />
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="password"
                />
              </div>
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Attack Scenario</h2>
          <p className="mb-4">An attacker might send users a link like:</p>
          <pre className="code-block mb-4 overflow-x-auto">
            https://example-bank.com/login?return_to=https://evil-site.com/fake-bank
          </pre>
          <p className="mb-4">Try it yourself:</p>
          <form onSubmit={simulateRedirect} className="space-y-4">
            <input
              type="text"
              className="input-field"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              placeholder="Enter a malicious redirect URL..."
            />
            <button
              type="submit"
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Test Redirect
            </button>
          </form>
          {showWarning && (
            <div className="mt-4 rounded border border-red-200 bg-red-50 p-4">
              <p className="text-red-700">
                ⚠️ This would redirect to:{" "}
                {redirectUrl || "https://evil-site.com/fake-bank"}
                <br />
                An attacker could create a fake banking site at this URL to
                steal credentials!
              </p>
            </div>
          )}
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Real-World Example</h2>
          <p className="mb-4">A malicious email might look like:</p>
          <div className="rounded border p-4">
            <p className="mb-2">
              <strong>Subject:</strong> Security Alert - Action Required
            </p>
            <p className="mb-2">
              <strong>From:</strong> security@example-bank.com
            </p>
            <p className="mb-4">
              Dear customer,
              <br />
              <br />
              We detected unusual activity in your account. Please login
              immediately to verify your identity:
              <br />
              <br />
              <a href="#" className="text-blue-600 hover:underline">
                https://example-bank.com/login?return_to=https://evil-site.com/fake-bank
              </a>
              <br />
              <br />
              Best regards,
              <br />
              Security Team
            </p>
          </div>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Secure Solution</h2>
          <p className="mb-4">
            Always validate redirect URLs against a whitelist:
          </p>
          <pre className="code-block overflow-x-auto">
            {`const ALLOWED_DOMAINS = [
  'example-bank.com',
  'secure.example-bank.com'
]

function isValidRedirect(url: string) {
  try {
    const parsedUrl = new URL(url)
    return ALLOWED_DOMAINS.includes(parsedUrl.hostname)
  } catch {
    return false
  }
}

// In your redirect handler
if (!isValidRedirect(redirectUrl)) {
  throw new Error('Invalid redirect URL')
}

// Safe to redirect
window.location.href = redirectUrl`}
          </pre>
        </section>
      </div>
      {showToast && (
        <Toast
          message="⚠️ You're being redirected to a potentially malicious site!"
          type="error"
          onClose={() => setShowToast(false)}
        />
      )}
    </DemoLayout>
  );
}
