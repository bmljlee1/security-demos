import Link from "next/link";

const demos = [
  {
    title: "SQL Injection",
    description: "Learn how attackers can manipulate database queries",
    path: "/demo/sql-injection",
    color: "border-red-500 hover:bg-red-50",
    icon: "💉",
  },
  {
    title: "Cross-Site Scripting (XSS)",
    description: "See how malicious scripts can be injected into web pages",
    path: "/demo/xss",
    color: "border-blue-500 hover:bg-blue-50",
    icon: "🔄",
  },
  {
    title: "CSRF",
    description: "Understand cross-site request forgery attacks",
    path: "/demo/csrf",
    color: "border-green-500 hover:bg-green-50",
    icon: "🎭",
  },
  {
    title: "Hardcoded API Keys",
    description: "Learn why embedding secrets in code is dangerous",
    path: "/demo/hardcoded-keys",
    color: "border-purple-500 hover:bg-purple-50",
    icon: "🔑",
  },
  {
    title: "Insecure Authentication",
    description: "Explore weak authentication vulnerabilities",
    path: "/demo/insecure-auth",
    color: "border-yellow-500 hover:bg-yellow-50",
    icon: "🔓",
  },
  {
    title: "Open Redirects",
    description: "See how attackers can abuse redirects",
    path: "/demo/open-redirect",
    color: "border-orange-500 hover:bg-orange-50",
    icon: "🔀",
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Interactive Security Demonstrations
        </h1>
        <p className="mx-auto max-w-2xl text-white">
          Learn about common web security vulnerabilities through hands-on
          demonstrations. Select a topic below to explore how attacks work and
          how to prevent them.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <Link key={demo.path} href={demo.path}>
            <div className={`demo-button ${demo.color}`}>
              <span className="mb-4 text-4xl">{demo.icon}</span>
              <h2 className="demo-title">{demo.title}</h2>
              <p className="demo-description">{demo.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
