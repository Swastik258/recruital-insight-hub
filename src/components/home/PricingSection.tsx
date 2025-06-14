
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

const pricingPlans = [
  {
    name: "Basic",
    price: "₹99",
    period: "/month",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 50 resume screenings",
      "Basic interview questions",
      "Job description optimizer",
      "Email support",
      "Basic analytics"
    ],
    buttonText: "Start Free Trial",
    popular: false,
    planId: "basic"
  },
  {
    name: "Professional",
    price: "₹599",
    period: "/month",
    description: "Ideal for growing HR departments",
    features: [
      "Up to 200 resume screenings",
      "Advanced interview questions",
      "Performance evaluations",
      "Candidate matching",
      "Priority support",
      "Advanced analytics",
      "API access"
    ],
    buttonText: "Start Free Trial",
    popular: true,
    planId: "professional"
  },
  {
    name: "Enterprise",
    price: "₹999",
    period: "/month",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited resume screenings",
      "Custom AI models",
      "Advanced integrations",
      "Dedicated support",
      "Custom reporting",
      "SSO integration",
      "On-premise deployment"
    ],
    buttonText: "Contact Sales",
    popular: false,
    planId: "enterprise"
  }
];

export const PricingSection = () => {
  const handleSubscribe = (planId: string) => {
    window.location.href = `/payment?plan=${planId}`;
  };

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start with a free trial. No credit card required. Upgrade anytime as your team grows.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg scale-105' : ''} hover:shadow-lg transition-all`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSubscribe(plan.planId)}
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
