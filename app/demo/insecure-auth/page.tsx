"use client";

import type React from "react";

import { useState } from "react";
import DemoLayout from "@/components/demo-layout";
import { Toast } from "@/components/toast";

const WEAK_PASSWORDS = ["password", "123456", "qwerty", "letmein", "admin", ""];

export default function InsecureAuthDemo() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const simulateInsecureLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Demonstrate multiple authentication vulnerabilities
    if (username === "admin") {
      if (WEAK_PASSWORDS.includes(password)) {
        setToastMessage(
          "⚠️ Logged in with a weak password! This account could be easily compromised."
        );
      } else {
        setToastMessage(
          "✅ Logged in as admin - Notice how we're not rate limiting login attempts!"
        );
      }
    } else if (username.toLowerCase() === "admin") {
      setToastMessage(
        "⚠️ Case-insensitive comparison allowed login with 'ADMIN' instead of 'admin'!"
      );
    } else {
      setToastMessage(
        "❌ Login failed - But an attacker could keep trying indefinitely!"
      );
    }

    setShowToast(true);
  };

  return (
    <DemoLayout
      title="Insecure Authentication Demo"
      description="Weak authentication methods can leave your application vulnerable to unauthorized access. This demo shows common authentication mistakes and best practices."
    >
      <div className="space-y-8">
        <section className="demo-section">
          <h2 className="demo-title">Common Authentication Vulnerabilities</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Weak password requirements</li>
            <li>No rate limiting on login attempts</li>
            <li>Case-insensitive username comparison</li>
            <li>Passwords stored in plain text</li>
            <li>Missing or weak password reset functionality</li>
            <li>No multi-factor authentication option</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Try to Login</h2>
          <p className="mb-4">
            Try these attacks:
            <br />
            1. Login with username "admin" and common passwords like "password"
            or "123456"
            <br />
            2. Try "ADMIN" (uppercase) to test case sensitivity
            <br />
            3. Notice how you can try multiple passwords without any rate
            limiting
          </p>
          <form onSubmit={simulateInsecureLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Try 'admin' or 'ADMIN'"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Try common passwords..."
              />
            </div>
            <button
              type="submit"
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Login (Unsafe)
            </button>
          </form>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Authentication Best Practices</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Enforce strong password requirements</li>
            <li>Implement rate limiting and account lockouts</li>
            <li>Use case-sensitive comparisons</li>
            <li>Hash passwords with strong algorithms (bcrypt, Argon2)</li>
            <li>Implement secure password reset flow</li>
            <li>Offer multi-factor authentication</li>
            <li>Use secure session management</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Secure Solution</h2>
          <p className="mb-4">
            Implement proper password hashing and authentication:
          </p>
          <pre className="code-block overflow-x-auto">
            {`// Hash passwords before storing
import { hash, compare } from 'bcrypt'

// When creating a user
const hashedPassword = await hash(password, 10)
await db.user.create({
  data: {
    username,
    password: hashedPassword
  }
})

// When authenticating
const user = await db.user.findUnique({
  where: { username }
})

if (!user) {
  throw new Error('User not found')
}

const isValid = await compare(password, user.password)

if (!isValid) {
  throw new Error('Invalid password')
}

// Implement rate limiting
const attempts = await getRateLimit(username)
if (attempts > MAX_ATTEMPTS) {
  throw new Error('Too many login attempts')
}

// Generate a secure session token
const session = await createSecureSession(user.id)`}
          </pre>
        </section>
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastMessage.includes("✅") ? "success" : "warning"}
          onClose={() => setShowToast(false)}
        />
      )}
    </DemoLayout>
  );
}
