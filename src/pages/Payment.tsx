
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Smartphone, Building2, Check, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

interface PaymentData {
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  upiId: string;
}

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PaymentData>({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: ''
  });

  const planId = searchParams.get('plan') || 'basic';
  
  const planDetails = {
    basic: { name: 'Basic', price: '₹99', features: ['Up to 50 resume screenings', 'Basic interview questions', 'Email support'] },
    professional: { name: 'Professional', price: '₹599', features: ['Up to 200 resume screenings', 'Advanced features', 'Priority support'] },
    enterprise: { name: 'Enterprise', price: '₹999', features: ['Unlimited screenings', 'Custom AI models', 'Dedicated support'] }
  };

  const currentPlan = planDetails[planId as keyof typeof planDetails] || planDetails.basic;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store subscription info
      localStorage.setItem('subscription', JSON.stringify({
        plan: currentPlan.name,
        price: currentPlan.price,
        startDate: new Date().toISOString(),
        paymentMethod: paymentMethod
      }));

      toast({
        title: "Payment Successful!",
        description: `Welcome to ${currentPlan.name} plan. Your subscription is now active.`
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to plans
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="text-gray-600 mt-2">Secure payment powered by industry-standard encryption</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900">{currentPlan.name} Plan</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">{currentPlan.price}<span className="text-sm font-normal text-gray-600">/month</span></p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Included features:</h4>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total (Monthly)</span>
                  <span className="text-xl font-bold">{currentPlan.price}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Billed monthly • Cancel anytime</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Payment Method Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button
                  type="button"
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className="h-12 flex items-center justify-center"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Card
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('upi')}
                  className="h-12 flex items-center justify-center"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  UPI
                </Button>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {paymentMethod === 'card' ? (
                  <>
                    {/* Card Details */}
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        name="cardholderName"
                        placeholder="John Doe"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* UPI Details */}
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        name="upiId"
                        placeholder="yourname@paytm"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="text-sm text-gray-500">Enter your UPI ID (e.g., 9876543210@paytm)</p>
                    </div>
                  </>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay ${currentPlan.price}`
                  )}
                </Button>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mt-4">
                  <Building2 className="h-4 w-4" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
