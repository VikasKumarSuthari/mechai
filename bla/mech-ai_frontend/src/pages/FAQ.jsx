import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is Mech-AI?",
          a: "Mech-AI is an advanced AI chat platform that enables natural conversations with a state-of-the-art language model. Our platform is designed to help users with various tasks, from general queries to complex problem-solving."
        },
        {
          q: "How do I create an account?",
          a: "Creating an account is simple! Click the 'Sign Up' button in the top right corner, enter your email address and choose a password. You can start chatting with Mech-AI immediately after verifying your email."
        },
        {
          q: "Is Mech-AI free to use?",
          a: "We offer both free and premium tiers. The free tier includes basic chat functionality with daily message limits. Premium subscribers get additional features like higher message limits, priority support, and advanced customization options."
        }
      ]
    },
    {
      category: "Features & Capabilities",
      questions: [
        {
          q: "What can I ask Mech-AI?",
          a: "Mech-AI can assist with a wide range of tasks including answering questions, writing and editing content, programming help, math problems, analysis, and general discussion. However, it won't generate harmful content or provide medical/legal advice."
        },
        {
          q: "Does Mech-AI understand code?",
          a: "Yes! Mech-AI can understand and help with multiple programming languages. It can explain code, debug issues, suggest improvements, and even help you learn programming concepts."
        },
        {
          q: "Can Mech-AI remember previous conversations?",
          a: "Yes, Mech-AI maintains context within each chat session. Premium users can access their chat history and continue previous conversations."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          q: "How is my data protected?",
          a: "We use industry-standard encryption for all data transmission and storage. Your conversations are private and we never share personal data with third parties. You can review our privacy policy for more details."
        },
        {
          q: "Can I delete my chat history?",
          a: "Yes, you can delete individual messages or entire conversations from your chat history. You also have the option to automatically delete chat history after a specified time period."
        },
        {
          q: "Who can see my conversations?",
          a: "Your conversations are private and can only be accessed by you. Our system administrators may access chats for troubleshooting purposes only, with strict privacy protocols in place."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "What browsers are supported?",
          a: "Mech-AI works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated to the latest version."
        },
        {
          q: "How do I report issues?",
          a: "You can report issues through our help center or by clicking the 'Report Issue' button in the chat interface. Premium users get access to priority support."
        },
        {
          q: "Is there a mobile app available?",
          a: "Yes, we offer mobile apps for both iOS and Android. You can download them from the respective app stores. The web version is also mobile-responsive."
        }
      ]
    }
  ];

  // Filter questions based on search query
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      qa => 
        qa.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Find answers to common questions about Mech-AI
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="max-w-3xl mx-auto space-y-8">
        {filteredFAQs.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((qa, qIndex) => (
                  <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                    <AccordionTrigger className="text-left">
                      {qa.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {qa.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Still Need Help Section */}
      <div className="max-w-2xl mx-auto mt-16">
        <Card className="bg-blue-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/chat')}
              >
                Try Mech-AI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;