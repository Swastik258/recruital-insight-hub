
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Zap, Check, Github, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupForm>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupForm> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SignupForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors below."
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate signup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
      
      toast({
        title: "Welcome to week-hr!",
        description: "Your account has been created successfully."
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Something went wrong. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    toast({
      title: "Coming Soon",
      description: `${provider} signup will be available soon.`
    });
  };

  const benefits = [
    "14-day free trial included",
    "No credit card required",
    "Full access to all features",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left side - Benefits */}
          <div className="text-center lg:text-left px-4 lg:px-6">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">week-hr</h1>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              Start your free trial today
            </h2>
            <p className="text-gray-600 mb-4 text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Join thousands of HR professionals using AI to transform recruitment.
            </p>
            <ul className="space-y-3 max-w-md mx-auto lg:mx-0">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center justify-center lg:justify-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Signup form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="space-y-1 px-5 pt-5 pb-3">
                <CardTitle className="text-lg text-center font-semibold text-gray-900">
                  Create your account
                </CardTitle>
                <CardDescription className="text-center text-sm text-gray-600">
                  Get started with your AI-powered HR dashboard
                </CardDescription>
              </CardHeader>

              {/* Social Signup Buttons */}
              <CardContent className="space-y-3 px-5">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleSocialSignup('Google')}
                    className="h-9 text-sm font-medium border-gray-200 hover:bg-gray-50 transition-colors"
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleSocialSignup('GitHub')}
                    className="h-9 text-sm font-medium border-gray-200 hover:bg-gray-50 transition-colors"
                    disabled={isLoading}
                  >
                    <Github className="w-4 h-4 mr-1.5" />
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
                <CardContent className="space-y-3 px-5 pt-0">
                  <div className="grid grid-cols-2 gap-2">
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
                        aria-describedby={errors.firstName ? "firstName-error" : undefined}
                        className={`h-9 transition-colors ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'}`}
                      />
                      {errors.firstName && (
                        <p id="firstName-error" className="text-xs text-red-600" role="alert">
                          {errors.firstName}
                        </p>
                      )}
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
                        aria-describedby={errors.lastName ? "lastName-error" : undefined}
                        className={`h-9 transition-colors ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'}`}
                      />
                      {errors.lastName && (
                        <p id="lastName-error" className="text-xs text-red-600" role="alert">
                          {errors.lastName}
                        </p>
                      )}
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
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`h-9 transition-colors ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'}`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        aria-describedby={errors.password ? "password-error" : undefined}
                        className={`h-9 pr-9 transition-colors ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-9 w-9 px-0"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.password && (
                      <p id="password-error" className="text-xs text-red-600" role="alert">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                        className={`h-9 pr-9 transition-colors ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-9 w-9 px-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirmPassword-error" className="text-xs text-red-600" role="alert">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <div className="flex items-start space-x-2 pt-1">
                    <input 
                      type="checkbox" 
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5" 
                      required 
                      aria-describedby={errors.agreeToTerms ? "terms-error" : undefined}
                    />
                    <div className="flex-1">
                      <Label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-relaxed">
                        I agree to the{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium transition-colors hover:underline">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium transition-colors hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                      {errors.agreeToTerms && (
                        <p id="terms-error" className="text-xs text-red-600 mt-1" role="alert">
                          {errors.agreeToTerms}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3 px-5 pb-5">
                  <Button 
                    type="submit" 
                    className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      'Start Free Trial'
                    )}
                  </Button>
                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors hover:underline">
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
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
