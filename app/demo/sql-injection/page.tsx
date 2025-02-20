"use client";

import { useState } from "react";
import DemoLayout from "@/components/demo-layout";

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

const mockDatabase: User[] = [
  { id: 1, username: "admin", email: "admin@example.com", isAdmin: true },
  { id: 2, username: "user1", email: "user1@example.com", isAdmin: false },
  { id: 3, username: "user2", email: "user2@example.com", isAdmin: false },
];

export default function SqlInjectionDemo() {
  const [userInput, setUserInput] = useState("");
  const [queryResult, setQueryResult] = useState("");
  const [results, setResults] = useState<User[]>([]);

  const simulateQuery = (input: string) => {
    const unsafeQuery = `SELECT * FROM users WHERE username = '${input}' AND password = 'password'`;
    setQueryResult(unsafeQuery);

    // Simulate SQL injection vulnerability
    if (input.toLowerCase().includes("' or '1'='1")) {
      setResults(mockDatabase); // Shows all users due to injection
    } else {
      setResults(mockDatabase.filter((user) => user.username === input));
    }
  };

  return (
    <DemoLayout
      title="SQL Injection Demo"
      description="SQL injection occurs when untrusted user input is directly concatenated into SQL queries. This can allow attackers to bypass authentication, read sensitive data, or even modify the database."
    >
      <div className="space-y-8">
        <section className="demo-section">
          <h2 className="demo-title">Understanding SQL Injection</h2>
          <p className="mb-4">
            When applications build SQL queries by concatenating user input,
            attackers can inject malicious SQL code. Common attacks include:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              Bypassing login screens with{" "}
              <code className="rounded px-2 py-1">admin' OR '1'='1</code>
            </li>
            <li>Retrieving hidden data with UNION attacks</li>
            <li>Modifying or deleting data using INSERT/UPDATE/DELETE</li>
          </ul>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Try an Attack</h2>
          <p className="mb-4">
            This form simulates a login query. Try these attacks:
            <br />
            1. Enter a normal username like "admin" to see the regular query
            <br />
            2. Enter <code className="rounded px-2 py-1">
              admin' OR '1'='1
            </code>{" "}
            to bypass authentication
          </p>
          <input
            type="text"
            className="input-field"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              simulateQuery(e.target.value);
            }}
            placeholder="Enter username..."
          />
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Resulting Query</h2>
          <pre className="code-block overflow-x-auto">{queryResult}</pre>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Query Results</h2>
          <p className="mb-4">This shows what data the query returns:</p>
          <div className="overflow-x-auto rounded border">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-4 text-left font-medium">ID</th>
                  <th className="p-4 text-left font-medium">Username</th>
                  <th className="p-4 text-left font-medium">Email</th>
                  <th className="p-4 text-left font-medium">Is Admin</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      No results found
                    </td>
                  </tr>
                ) : (
                  results.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="p-4">{user.id}</td>
                      <td className="p-4">{user.username}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.isAdmin ? "Yes" : "No"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="demo-section">
          <h2 className="demo-title">Secure Solution</h2>
          <p className="mb-4">
            Always use parameterized queries to prevent SQL injection:
          </p>
          <pre className="code-block overflow-x-auto">
            {`// Instead of string concatenation:
const query = \`SELECT * FROM users WHERE username = '\${input}'\`

// Use parameterized queries:
const query = 'SELECT * FROM users WHERE username = ?'
db.query(query, [input])`}
          </pre>
        </section>
      </div>
    </DemoLayout>
  );
}
