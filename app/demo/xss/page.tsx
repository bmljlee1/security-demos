"use client";

import { useState } from "react";
import DemoLayout from "@/components/demo-layout";
import { Toast } from "@/components/toast";

export default function XssDemo() {
  const [userInput, setUserInput] = useState("");
  const [renderedOutput, setRenderedOutput] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const simulateXss = (input: string) => {
    setRenderedOutput(input);

    // Check if input contains script tags
    if (input.toLowerCase().includes("<script>")) {
      setToastMessage(
        "⚠️ Script tag detected! In a real application, this could execute malicious code."
      );
      setShowToast(true);
    }
  };

  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  return (
    <DemoLayout
      title="Cross-Site Scripting (XSS) Demo"
      description="XSS occurs when attackers inject malicious scripts into web pages. These scripts can steal cookies, session tokens, or redirect users to malicious sites."
    >
      <div className="space-y-8">
        <section className="demo-section">
          <h2 className="demo-title">Understanding XSS</h2>
          <p className="mb-4">XSS attacks can:</p>
          <ul className="list-inside list-disc space-y-2">
            <li>Steal user cookies and session tokens</li>
            <li>Modify webpage content</li>
            <li>Redirect users to malicious sites</li>
            <li>Log keystrokes and steal passwords</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Try an Attack</h2>
          <p className="mb-4">
            Try these payloads:
            <br />
            1. Simple text:{" "}
            <code className="rounded  px-2 py-1">Hello World</code>
            <br />
            2. HTML injection:{" "}
            <code className="rounded  px-2 py-1">{"<h1>Big Text</h1>"}</code>
            <br />
            3. Script injection:{" "}
            <code className="rounded  px-2 py-1">
              {"<script>alert('Hacked!')</script>"}
            </code>
            <br />
            4. Malicious link:{" "}
            <code className="rounded px-2 py-1">
              {"<a href='javascript:alert(\"Clicked!\")'>Click me</a>"}
            </code>
          </p>
          <input
            type="text"
            className="input-field"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              simulateXss(e.target.value);
            }}
            placeholder="Enter some HTML or JavaScript..."
          />
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Unsafe Output (Vulnerable)</h2>
          <p className="mb-4 text-red-600">
            ⚠️ This output is vulnerable to XSS attacks:
          </p>
          <div
            className="mt-4 rounded border p-4"
            dangerouslySetInnerHTML={{ __html: renderedOutput }}
          />
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Safe Output (Escaped)</h2>
          <p className="mb-4 text-green-600">
            ✅ This output is protected against XSS:
          </p>
          <div className="mt-4 rounded border p-4">{escapeHtml(userInput)}</div>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Secure Solution</h2>
          <p className="mb-4">
            Always escape HTML special characters before rendering user input:
          </p>
          <pre className="code-block overflow-x-auto">
            {`// Unsafe way:
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// Safe way:
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

<div>{escapeHtml(userInput)}</div>`}
          </pre>
        </section>
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type="warning"
          onClose={() => setShowToast(false)}
        />
      )}
    </DemoLayout>
  );
}
