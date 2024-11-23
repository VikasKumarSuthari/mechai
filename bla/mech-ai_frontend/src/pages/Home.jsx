import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Zap, 
  Shield, 
  Brain, 
  ArrowRight,
  CheckCircle 
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Advanced AI Integration",
    description: "Powered by cutting-edge artificial intelligence to provide intelligent responses and solutions."
  },
  {
    icon: Shield,
    title: "Secure Communication",
    description: "End-to-end encryption ensures your conversations remain private and secure."
  },
  {
    icon: Zap,
    title: "Real-time Responses",
    description: "Get instant responses with our high-performance infrastructure."
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Experience human-like interactions with our advanced language processing."
  }
];

const benefits = [
  "24/7 AI assistance",
  "Customizable solutions",
  "Multi-language support",
  "Data privacy focus",
  "Regular updates",
  "Technical expertise"
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Next-Generation AI Assistant
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Experience the power of artificial intelligence with our advanced chat platform. 
              Get instant answers, solutions, and assistance for all your needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-md bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                Get Started
              </Link>
              <Link
                to="/works"
                className="text-sm font-semibold leading-6 text-white flex items-center gap-1"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Features that set us apart
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Everything you need for seamless AI-powered assistance
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
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

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Why choose our platform?
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                We combine cutting-edge AI technology with user-friendly design to deliver
                an unmatched experience for our users.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="aspect-video rounded-xl bg-slate-900/5 flex items-center justify-center">
                <img 
                  src="/api/placeholder/600/400"
                  alt="Platform preview" 
                  className="rounded-xl"
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
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join thousands of users already benefiting from our AI assistant.
            </p>
            <div className="mt-8">
              <Link
                to="/signup"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-500 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white inline-block"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;