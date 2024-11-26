import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Brain, Shield, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutSection = ({ title, description, icon: Icon }) => (
  <Card className="flex flex-col items-center p-6 hover:shadow-lg transition-shadow">
    <div className="rounded-full bg-blue-100 p-3 mb-4">
      <Icon className="h-6 w-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </Card>
);


const About = () => {
  const navigate = useNavigate();
  const handlechat=async()=>
    {
      const storeduser=sessionStorage.getItem('user');
      if(storeduser)
      {
        navigate("/chat");
      }
      else{
        navigate("/login");
      }
    }

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Technology",
      description: "Powered by state-of-the-art language models, providing intelligent and context-aware responses for natural conversations."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations are protected with enterprise-grade security. We prioritize your privacy and data protection."
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Built with modern technology stack and well-documented APIs for seamless integration and customization."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Available 24/7 with multi-language support, making AI assistance accessible to users worldwide."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:text-5xl">
          About Mech-AI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Transforming the way humans interact with AI through intuitive, 
          intelligent, and meaningful conversations.
        </p>
        <Button 
          onClick={handlechat}
          className="flex items-center gap-2"
        >
          Start Chatting <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto mb-16">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-gray-600 text-center text-lg leading-relaxed">
              We're on a mission to make artificial intelligence accessible, 
              useful, and beneficial for everyone. Through our chat platform, 
              we're bridging the gap between human intelligence and AI capabilities, 
              creating meaningful interactions that help solve real-world problems.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          What Sets Us Apart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {features.map((feature, index) => (
            <AboutSection key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Built by Developers, for Everyone
        </h2>
        <Card>
          <CardContent className="p-8">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our team consists of passionate developers, AI researchers, and UX designers 
              working together to create the most intuitive and powerful AI chat experience. 
              We believe in continuous improvement and are constantly updating our platform 
              based on user feedback and technological advancements.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/contact')}
              className="flex items-center gap-2 mx-auto"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl mx-auto text-center">
        <Card className="bg-blue-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Future of AI Chat?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of users who are already benefiting from our 
              advanced AI chat platform.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/signup')}>
                Get Started
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/works')}
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;