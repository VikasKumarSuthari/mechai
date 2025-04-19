import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Code,
  FileText,
  Image,
  Languages,
  Zap,
  Lock,
  Clock,
  MessageSquare,
  Database,
  Cloud,
  Share2,
  Layout,
  Sparkles,
  ChevronRight,
  Shield,
  RefreshCw
} from 'lucide-react';

const mainFeatures = [
  {
    icon: Brain,
    title: "Advanced AI Processing",
    description: "State-of-the-art language models for understanding and generating human-like responses",
    benefits: [
      "Natural language understanding",
      "Context awareness",
      "Semantic processing",
      "Multi-turn conversations"
    ]
  },
  {
    icon: Code,
    title: "Code Generation",
    description: "Generate and debug code across multiple programming languages with detailed explanations",
    benefits: [
      "Multiple language support",
      "Syntax highlighting",
      "Code explanations",
      "Best practices adherence"
    ]
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "Communicate and generate content in multiple languages with native-like fluency",
    benefits: [
      "100+ languages supported",
      "Natural translations",
      "Cultural context awareness",
      "Language detection"
    ]
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade security measures to protect your data and conversations",
    benefits: [
      "End-to-end encryption",
      "SOC 2 compliance",
      "Data privacy controls",
      "Regular security audits"
    ]
  }
];

const technicalFeatures = [
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Engage in fluid, context-aware discussions that feel natural and productive."
  },
  {
    icon: Database,
    title: "Knowledge Base",
    description: "Access vast amounts of accurate, up-to-date information across various domains."
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Seamlessly integrate with popular cloud services and platforms."
  },
  {
    icon: Share2,
    title: "API Access",
    description: "Robust API endpoints for custom integrations and automation."
  },
  {
    icon: Layout,
    title: "Custom Interface",
    description: "Personalize the interface to match your workflow and preferences."
  },
  {
    icon: RefreshCw,
    title: "Version Control",
    description: "Track changes and maintain history of all conversations and outputs."
  }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Powerful Features for Advanced AI Assistance
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 max-w-3xl mx-auto">
              Discover the comprehensive suite of features that make our AI platform
              the perfect solution for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="relative p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-slate-600">
                      {feature.description}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-600">
                          <ChevronRight className="h-4 w-4 text-blue-500" />
                          {benefit}
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

      {/* Technical Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Technical Capabilities
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Explore the technical features that power our platform
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technicalFeatures.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Capabilities */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 mb-6">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Real-time Processing</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                Lightning-Fast Performance
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Experience the power of real-time AI processing with response times
                measured in milliseconds, not seconds.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: "Instant Responses",
                    description: "Get answers and solutions in milliseconds"
                  },
                  {
                    icon: Shield,
                    title: "Always Available",
                    description: "99.99% uptime guarantee for enterprise users"
                  },
                  {
                    icon: Sparkles,
                    title: "Smart Caching",
                    description: "Optimized performance for repeated queries"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="aspect-square rounded-2xl bg-slate-900/5 flex items-center justify-center">
                <img 
                  src="/api/placeholder/500/500" 
                  alt="Real-time processing illustration" 
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to explore these features?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Start using our AI platform today with a free trial.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/signup"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-50"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact"
                className="rounded-md border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-blue-400"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;