"use client";
import { useState, useRef } from "react";
import DemoLayout from "@/components/demo-layout";
import { Toast } from "@/components/toast";

export default function CsrfDemo() {
  const [csrfToken, setCsrfToken] = useState("");
  const [showAttack, setShowAttack] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [balance, setBalance] = useState(1000);
  const amountRef = useRef<HTMLInputElement>(null);

  const generateToken = () => {
    const token = Math.random().toString(36).substring(2);
    setCsrfToken(token);
  };

  const simulateAttack = () => {
    const amount = amountRef.current
      ? parseFloat(amountRef.current.value)
      : 500;
    setShowAttack(true);
    setBalance((prev) => prev - amount);
    setShowToast(true);
  };

  return (
    <DemoLayout
      title="Cross-Site Request Forgery (CSRF) Demo"
      description="CSRF attacks occur when malicious sites trick users into making unwanted requests to other sites where they're authenticated. This can lead to unauthorized actions being performed on behalf of the user."
    >
      <div className="space-y-8">
        <section className="demo-section">
          <h2 className="demo-title">Understanding CSRF</h2>
          <p className="mb-4">CSRF attacks can:</p>
          <ul className="list-inside list-disc space-y-2">
            <li>Transfer money from your bank account</li>
            <li>Change your email or password</li>
            <li>Make purchases on your behalf</li>
            <li>Perform any action you're authorized to do</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Your Bank Account</h2>
          <div className="mb-4 rounded border border-green-200 bg-green-50 p-4">
            <p className="text-lg font-semibold text-green-800">
              Current Balance: ${balance}
            </p>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium">
                Amount to Transfer
              </label>
              <input
                type="number"
                className="input-field"
                defaultValue="100"
                ref={amountRef}
              />
            </div>
            <button
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              type="submit"
            >
              Transfer Money (Unsafe)
            </button>
          </form>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Simulated Attack</h2>
          <p className="mb-4">
            Imagine you're browsing a malicious website while logged into your
            bank. The site might contain a hidden form that automatically
            submits a transfer request:
          </p>
          <pre className="code-block mb-4 overflow-x-auto">
            {`<form action="https://your-bank.com/transfer" method="POST" id="hidden-form">
  <input type="hidden" name="amount" value="500" />
  <input type="hidden" name="to" value="hacker" />
</form>
<script>document.getElementById("hidden-form").submit();</script>`}
          </pre>
          <button
            className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            onClick={simulateAttack}
          >
            Visit Malicious Site
          </button>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Protected Form (With CSRF Token)</h2>
          <p className="mb-4">This form is protected against CSRF attacks:</p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium">
                Amount to Transfer
              </label>
              <input
                type="number"
                className="input-field"
                defaultValue="100"
                ref={amountRef}
              />
            </div>
            <input type="hidden" name="csrf_token" value={csrfToken} />
            <div className="flex gap-4">
              <button
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                type="submit"
              >
                Transfer Money (Safe)
              </button>
              <button
                className="rounded border px-4 py-2 hover:bg-gray-50"
                type="button"
                onClick={generateToken}
              >
                Generate CSRF Token
              </button>
            </div>
            {csrfToken && (
              <p className="text-sm text-gray-600">
                Current CSRF Token: {csrfToken}
              </p>
            )}
          </form>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Secure Solution</h2>
          <p className="mb-4">
            Always include and validate CSRF tokens in your forms:
          </p>
          <pre className="code-block overflow-x-auto">
            {`// Generate a token on the server
const csrfToken = crypto.randomBytes(32).toString('hex')

// Store it in the user's session
session.csrfToken = csrfToken

// Include it in your form
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value={csrfToken} />
  ...
</form>

// Validate it on form submission
if (request.body.csrf_token !== session.csrfToken) {
  throw new Error('Invalid CSRF token')
}`}
          </pre>
        </section>
      </div>
      {showToast && (
        <Toast
          message={`⚠️ The malicious site just transferred $${
            amountRef.current ? amountRef.current.value : 500
          } from your account!`}
          type="error"
          onClose={() => setShowToast(false)}
        />
      )}
    </DemoLayout>
  );
}
