import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  MessageCircle, 
  Sparkles, 
  Brain,
  Zap,
  Lock,
  ChevronRight,
  Code,
  FileText,
  Image
} from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds with just your email. No credit card required to get started.",
    details: [
      "Secure authentication",
      "Personalized dashboard",
      "Free trial access"
    ]
  },
  {
    icon: MessageCircle,
    title: "Start a Conversation",
    description: "Type your question or request in natural language. Our AI understands context and nuance.",
    details: [
      "Natural language processing",
      "Context awareness",
      "Multi-language support"
    ]
  },
  {
    icon: Sparkles,
    title: "Get Instant Solutions",
    description: "Receive intelligent responses, code solutions, and creative content in real-time.",
    details: [
      "Real-time responses",
      "Accurate results",
      "Multiple formats supported"
    ]
  },
  {
    icon: Brain,
    title: "Learn and Improve",
    description: "Our AI learns from interactions to provide increasingly personalized assistance.",
    details: [
      "Adaptive learning",
      "Personalized experience",
      "Continuous improvements"
    ]
  }
];

const capabilities = [
  {
    icon: Code,
    title: "Code Generation",
    description: "Generate clean, efficient code in multiple programming languages with detailed explanations."
  },
  {
    icon: FileText,
    title: "Content Creation",
    description: "Create high-quality written content, from technical documentation to creative writing."
  },
  {
    icon: Brain,
    title: "Problem Solving",
    description: "Get help with complex problems through step-by-step analytical thinking."
  },
  {
    icon: Image,
    title: "Visual Creation",
    description: "Generate diagrams, flowcharts, and simple illustrations to visualize concepts."
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              How It Works
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform simplifies complex tasks and provides intelligent assistance. 
              Learn how to get started and make the most of our features.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-sm font-medium text-slate-900">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-slate-600">
                      {step.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-600">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What You Can Do
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Explore the wide range of capabilities our AI assistant offers
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <capability.icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {capability.title}
                </h3>
                <p className="text-slate-600">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Lock className="h-6 w-6 text-blue-500" />
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Security & Privacy
                </h2>
              </div>
              <p className="text-lg text-slate-600 mb-8">
                Your security and privacy are our top priorities. We implement industry-leading 
                security measures to ensure your data and conversations remain protected.
              </p>
              <ul className="space-y-4">
                {[
                  "End-to-end encryption for all conversations",
                  "SOC 2 Type II certified infrastructure",
                  "Regular security audits and updates",
                  "GDPR and CCPA compliant"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pl-12">
              <div className="aspect-square rounded-2xl bg-slate-900/5 flex items-center justify-center">
                <img 
                  src="/api/placeholder/500/500" 
                  alt="Security illustration" 
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to experience it yourself?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Start using our AI assistant today with a free account.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/signup"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-50"
              >
                Get Started Free
              </Link>
              <Link
                to="/contact"
                className="rounded-md border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-blue-400"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;