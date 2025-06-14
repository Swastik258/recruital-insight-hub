
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Check, Github } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate signup process
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handleGoogleSignup = () => {
    // Placeholder for Google signup
    console.log('Google signup clicked');
  };

  const handleGithubSignup = () => {
    // Placeholder for GitHub signup
    console.log('GitHub signup clicked');
  };

  const benefits = [
    "14-day free trial included",
    "No credit card required",
    "Full access to all features",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left side - Benefits */}
          <div className="text-center lg:text-left px-4 sm:px-6 lg:px-6">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">week-hr</h1>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight">
              Start your free trial today
            </h2>
            <p className="text-gray-600 mb-4 lg:mb-6 text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Join thousands of HR professionals who are already using AI to transform their recruitment process and streamline their workflows.
            </p>
            <ul className="space-y-3 max-w-md mx-auto lg:mx-0">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center justify-center lg:justify-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <Check className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Signup form */}
          <div className="w-full max-w-md mx-auto lg:max-w-lg">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 px-4 sm:px-5 pt-4 pb-3">
                <CardTitle className="text-lg sm:text-xl text-center font-semibold">
                  Create your account
                </CardTitle>
                <CardDescription className="text-center text-sm px-2">
                  Get started with your AI-powered HR dashboard
                </CardDescription>
              </CardHeader>

              {/* Social Signup Buttons */}
              <CardContent className="space-y-3 px-4 sm:px-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <Button 
                    variant="outline" 
                    onClick={handleGoogleSignup}
                    className="w-full h-9 text-sm font-medium border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleGithubSignup}
                    className="w-full h-9 text-sm font-medium border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500 font-medium">Or continue with email</span>
                  </div>
                </div>
              </CardContent>

              <form onSubmit={handleSignup}>
                <CardContent className="space-y-3 px-4 sm:px-5 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-start space-x-2 pt-1">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="h-3.5 w-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1" 
                      required 
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                      I agree to the{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3 px-4 sm:px-5 pb-4">
                  <Button 
                    type="submit" 
                    className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      'Start Free Trial'
                    )}
                  </Button>
                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                      Sign in here
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
