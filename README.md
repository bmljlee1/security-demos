🔒 Hack the Code - Interactive Security Demonstrations
A Next.js application that provides interactive demonstrations of common web security vulnerabilities. This educational tool helps developers understand how various cyber attacks work and how to prevent them.

⚠️ Educational Purpose Only
This application is designed for educational purposes to demonstrate common security vulnerabilities. All demonstrations are simulated and run in a controlled environment.

🚀 Features
The application includes interactive demonstrations of six common security vulnerabilities:

SQL Injection

Demonstrates database query manipulation
Shows how attackers can bypass authentication
Includes mock database results
Cross-Site Scripting (XSS)

Shows how malicious scripts can be injected
Demonstrates the importance of input sanitization
Includes safe vs unsafe rendering examples
Cross-Site Request Forgery (CSRF)

Simulates unauthorized transactions
Shows how CSRF tokens prevent attacks
Includes interactive bank account demo
Hardcoded API Keys

Demonstrates the risks of exposing secrets in code
Shows proper environment variable usage
Includes real-world examples
Insecure Authentication

Shows common authentication vulnerabilities
Demonstrates proper password handling
Includes rate limiting examples
Open Redirects

Shows how attackers can abuse redirects
Demonstrates URL validation
Includes phishing attack examples
🛠️ Technical Stack
Next.js 14 (App Router)
TypeScript
Tailwind CSS
React (useState for state management)
📦 Installation
Clone the repository:
git clone https://github.com/yourusername/security-demos.git
cd security-demos
Install dependencies:
npm install
Start the development server:
npm run dev
Open http://localhost:3000 in your browser
🚀 Deployment
The project is ready to deploy on Vercel:

Push your code to GitHub
Import the project in Vercel
Deploy
No environment variables are required for deployment.

🎨 Customization
Theme
The project uses a dark, cyberpunk-inspired theme. You can customize the colors by modifying the CSS variables in app/globals.css:

:root {
  --background: 222 47% 11%;
  --foreground: 213 31% 91%;
  --primary: 153 96% 56%;
  /* ... other variables */
}
Adding New Demos
Each demo is contained in its own directory under app/demo/. To add a new demo:

Create a new directory under app/demo/
Create a page.tsx file in the new directory
Use the DemoLayout component for consistent styling
Add the demo to the list in app/page.tsx

📝 Project Structure
security-demos/
├── app/
│   ├── demo/
│   │   ├── sql-injection/
│   │   ├── xss/
│   │   ├── csrf/
│   │   ├── hardcoded-keys/
│   │   ├── insecure-auth/
│   │   └── open-redirect/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── demo-layout.tsx
│   └── toast.tsx
└── public/

🔒 Security Considerations

While this application demonstrates security vulnerabilities, it does so in a controlled manner:

All demonstrations are client-side simulations
No actual vulnerabilities are created
No real data is at risk
All examples include secure solutions
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

⚠️ Disclaimer
This application is for educational purposes only. The security vulnerabilities demonstrated should never be implemented in production applications. Always follow security best practices in real-world applications.
