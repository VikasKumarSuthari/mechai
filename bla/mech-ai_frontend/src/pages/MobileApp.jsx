import React from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Phone,
  Tablet,
  Zap,
  Lock,
  Globe,
  Bell,
  MessageCircle,
  Download,
  Star,
  CheckCircle2,
  AppleIcon,
  Chrome
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const AppStats = ({ icon: Icon, value, label }) => (
  <div className="text-center">
    <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-3">
      <Icon className="w-8 h-8 text-blue-600" />
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const MobileApp = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Seamless Chat Experience",
      description: "Enjoy fluid conversations with our AI across all your devices with real-time synchronization."
    },
    {
      icon: Zap,
      title: "Lightning Fast Responses",
      description: "Get instant answers and assistance with our optimized mobile architecture."
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "End-to-end encryption ensures your conversations remain private and secure."
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Stay updated with intelligent notifications that you can customize to your needs."
    },
    {
      icon: Globe,
      title: "Offline Support",
      description: "Access previous conversations and basic features even without an internet connection."
    },
    {
      icon: Tablet,
      title: "Cross-Device Sync",
      description: "Seamlessly switch between devices while maintaining your conversation context."
    }
  ];

  const stats = [
    {
      icon: Download,
      value: "1M+",
      label: "Downloads"
    },
    {
      icon: Star,
      value: "4.8",
      label: "App Rating"
    },
    {
      icon: CheckCircle2,
      value: "99.9%",
      label: "Uptime"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 sm:text-5xl">
              Mech-AI in Your Pocket
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience the power of advanced AI assistance anywhere, anytime. 
              Download our mobile app and stay connected with Mech-AI on the go.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="flex items-center gap-2 text-lg px-6 py-3"
                onClick={() => window.open('https://apps.apple.com')}
              >
                <AppleIcon className="w-6 h-6" />
                App Store
              </Button>
              <Button 
                className="flex items-center gap-2 text-lg px-6 py-3"
                variant="outline"
                onClick={() => window.open('https://play.google.com')}
              >
                <Chrome className="w-6 h-6" />
                Play Store
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10">
              <img
                src="/api/placeholder/300/600"
                alt="Mobile App Screenshot"
                className="rounded-3xl shadow-2xl mx-auto"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-3xl -z-10" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <Card className="bg-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <AppStats key={index} {...stat} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Powerful Features at Your Fingertips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* App Requirements */}
      <div className="max-w-3xl mx-auto mb-16">
        <Card>
          <CardHeader>
            <CardTitle>System Requirements</CardTitle>
            <CardDescription>
              Make sure your device meets these requirements for the best experience
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">iOS</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• iOS 14.0 or later</li>
                  <li>• Compatible with iPhone, iPad, and iPod touch</li>
                  <li>• 100MB free space</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Android</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Android 8.0 or later</li>
                  <li>• ARMv8 processor</li>
                  <li>• 120MB free space</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Download CTA */}
      <div className="max-w-3xl mx-auto">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Download Mech-AI now and experience AI assistance like never before.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary"
                className="flex items-center gap-2"
                onClick={() => window.open('https://apps.apple.com')}
              >
                <AppleIcon className="w-5 h-5" />
                Download for iOS
              </Button>
              <Button 
                variant="secondary"
                className="flex items-center gap-2"
                onClick={() => window.open('https://play.google.com')}
              >
                <Chrome className="w-5 h-5" />
                Download for Android
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileApp;