import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Star,
  StarHalf,
  Quote,
  Briefcase,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Developer",
    company: "TechCorp Inc.",
    image: "/api/placeholder/150/150",
    rating: 5,
    category: "Development",
    content: "Mech-AI has revolutionized our development process. The code suggestions and debugging assistance have saved our team countless hours. It's like having an expert programmer available 24/7.",
    date: "2024-02-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Content Creator",
    company: "Digital Media Solutions",
    image: "/api/placeholder/150/150",
    rating: 4.5,
    category: "Content Creation",
    content: "As a content creator, I've found Mech-AI invaluable for brainstorming ideas and refining my writing. The AI understands context remarkably well and provides creative suggestions that enhance my work.",
    date: "2024-02-10"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Data Analyst",
    company: "Analytics Pro",
    image: "/api/placeholder/150/150",
    rating: 5,
    category: "Data Analysis",
    content: "The data analysis capabilities are outstanding. Mech-AI helps me identify patterns and generate insights quickly. It's become an essential tool in my daily workflow.",
    date: "2024-02-05"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Student",
    company: "University of Technology",
    image: "/api/placeholder/150/150",
    rating: 4.5,
    category: "Education",
    content: "Mech-AI has been a game-changer for my studies. It explains complex concepts clearly and helps me work through difficult problems step by step. It's like having a personal tutor available anytime.",
    date: "2024-01-30"
  },
  // Add more testimonials as needed
];

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => (
  <Card className="h-full hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
          <div className="text-gray-600 text-sm flex items-center gap-2">
            <span>{testimonial.role}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {testimonial.company}
            </span>
          </div>
          <RatingStars rating={testimonial.rating} />
        </div>
      </div>
      <Quote className="w-8 h-8 text-blue-500 mb-2" />
      <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
      <div className="mt-4 text-sm text-gray-500">
        {new Date(testimonial.date).toLocaleDateString()}
      </div>
    </CardContent>
  </Card>
);

const Testimonials = () => {

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const testimonialsPerPage = 6;

  // Get unique categories
  const categories = ["all", ...new Set(testimonials.map(t => t.category))];

  // Filter testimonials
  const filteredTestimonials = testimonials.filter(
    t => filter === "all" || t.category === filter
  );

  // Calculate pagination
  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = filteredTestimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial
  );
  const totalPages = Math.ceil(filteredTestimonials.length / testimonialsPerPage);

  // Calculate average rating
  const averageRating = testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          What Our Users Say
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Don't just take our word for it - hear from our amazing users
        </p>
        
        {/* Overall Rating */}
        <Card className="max-w-xs mx-auto mb-8">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <RatingStars rating={averageRating} />
              <div className="text-sm text-gray-600 mt-2">
                Based on {testimonials.length} reviews
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-end">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <Select
            value={filter}
            onValueChange={setFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="max-w-3xl mx-auto mt-16">
        <Card className="bg-blue-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Mech-AI?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied users and see how Mech-AI can help you.
            </p>
            <div className="flex gap-4 justify-center">
              <Button  onClick={() => navigate('/signup')} >Get Started</Button>
              <Button  onClick={() => navigate('/works')} variant="outline">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Testimonials;