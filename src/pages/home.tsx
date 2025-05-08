import {
  ArrowRight,
  CheckCircle,
  BarChart,
  Users,
  CreditCard,
  Clock,
  Shield,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function Home() {
  const dashboardUrl = "/dashboard";

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-amber-50 to-orange-100/95 backdrop-blur supports-[backdrop-filter]:bg-amber-50/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-semibold">
            <a href='' className="text-xl text-orange-800">Mengamar</a>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-orange-700 transition-colors hover:text-orange-600"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-orange-700 transition-colors hover:text-orange-600"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-orange-700 transition-colors hover:text-orange-600"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-orange-700 transition-colors hover:text-orange-600"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-orange-700 transition-colors hover:text-orange-600"
            >
              FAQ
            </a>
          </nav>
          <Button asChild size="sm" className="hidden md:inline-flex bg-orange-500 hover:bg-orange-400 text-white shadow-md">
            <Link to={dashboardUrl}>Try it for free</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-amber-50 to-orange-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-orange-800">
                  Subscription Management{" "}
                  <span className="text-orange-600">Made Simple</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                  Streamline your subscription business with our powerful
                  management system. Automate billing, reduce churn, and scale
                  your business effortlessly.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button asChild className="w-full text-lg bg-orange-500 hover:bg-orange-400 text-white shadow-md">
                  <Link to={dashboardUrl}>
                    Try it for free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="text-xs text-gray-600">
                  No credit card required. 14-day free trial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Everything you need to manage subscriptions
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to manage your
                  subscription business efficiently.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BarChart className="h-10 w-10 text-orange-500" />
                  <CardTitle className="mt-4 text-orange-800">Analytics Dashboard</CardTitle>
                  <CardDescription className="text-gray-600">
                    Gain insights into your subscription metrics with real-time
                    analytics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Revenue tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Churn analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Customer lifetime value</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-10 w-10 text-orange-500" />
                  <CardTitle className="mt-4 text-orange-800">Customer Management</CardTitle>
                  <CardDescription className="text-gray-600">
                    Manage your subscribers with powerful customer tools.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Customer profiles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Subscription history</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Communication tools</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CreditCard className="h-10 w-10 text-orange-500" />
                  <CardTitle className="mt-4 text-orange-800">Billing Automation</CardTitle>
                  <CardDescription className="text-gray-600">
                    Automate your billing and invoicing processes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Recurring billing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Invoice generation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Payment processing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-orange-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Simple steps to subscription success
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started with Mengamar in just a few simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                  1
                </div>
                <h3 className="mt-4 text-lg font-semibold text-orange-800">Sign Up</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Create your account and connect your payment gateway.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                  2
                </div>
                <h3 className="mt-4 text-lg font-semibold text-orange-800">Configure Plans</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Set up your subscription plans and pricing tiers.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                  3
                </div>
                <h3 className="mt-4 text-lg font-semibold text-orange-800">Integrate</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Add our checkout to your website with simple code.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                  4
                </div>
                <h3 className="mt-4 text-lg font-semibold text-orange-800">Grow</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Monitor analytics and scale your subscription business.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-400 text-white shadow-md">
                <Link to={dashboardUrl}>
                  Get started now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Simple, transparent pricing
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your business.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-orange-800">Starter</CardTitle>
                  <div className="text-3xl font-bold text-orange-600">
                    $29
                    <span className="text-sm font-normal text-gray-600">
                      /month
                    </span>
                  </div>
                  <CardDescription className="text-gray-600">
                    Perfect for small businesses just getting started.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Up to 100 subscribers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Basic analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Email support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-400 text-white shadow-md">
                    <Link to={dashboardUrl}>Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-orange-500 bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center">
                    <div className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-600">
                      Most Popular
                    </div>
                  </div>
                  <CardTitle className="text-orange-800">Professional</CardTitle>
                  <div className="text-3xl font-bold text-orange-600">
                    $79
                    <span className="text-sm font-normal text-gray-600">
                      /month
                    </span>
                  </div>
                  <CardDescription className="text-gray-600">
                    Ideal for growing businesses with more subscribers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Up to 1,000 subscribers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Advanced.bind analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Custom branding</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-400 text-white shadow-md">
                    <Link to={dashboardUrl}>Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-orange-800">Enterprise</CardTitle>
                  <div className="text-3xl font-bold text-orange-600">
                    $199
                    <span className="text-sm font-normal text-gray-600">
                      /month
                    </span>
                  </div>
                  <CardDescription className="text-gray-600">
                    For large businesses with complex needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Unlimited subscribers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Full analytics suite</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">24/7 dedicated support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">API access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Custom integrations</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-400 text-white shadow-md">
                    <Link to={dashboardUrl}>Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-orange-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Trusted by businesses worldwide
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our customers have to say about Mengamar.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-orange-100"></div>
                    <div>
                      <CardTitle className="text-base text-orange-800">Sarah Johnson</CardTitle>
                      <CardDescription className="text-gray-600">CEO, TechStart</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    "Mengamar has transformed how we manage our subscription
                    business. The analytics alone have helped us increase our
                    revenue by 30% in just three months."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-orange-100"></div>
                    <div>
                      <CardTitle className="text-base text-orange-800">Michael Chen</CardTitle>
                      <CardDescription className="text-gray-600">Founder, SubscribeBox</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    "The billing automation has saved us countless hours of
                    manual work. Our team can now focus on growing our business
                    instead of managing payments."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-orange-100"></div>
                    <div>
                      <CardTitle className="text-base text-orange-800">
                        Emily Rodriguez
                      </CardTitle>
                      <CardDescription className="text-gray-600">CMO, GrowthMedia</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">
                    "Customer management has never been easier. We can see
                    everything about our subscribers in one place and provide
                    better service as a result."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Frequently asked questions
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about Mengamar.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-orange-800 hover:text-orange-600">
                    How does the 14-day free trial work?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    You can sign up for Mengamar and use all features for 14
                    days without entering any payment information. At the end of
                    the trial, you can choose a plan that fits your needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-orange-800 hover:text-orange-600">Can I change plans later?</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Yes, you can upgrade or downgrade your plan at any time.
                    Changes to your subscription will be prorated for the
                    remainder of your billing cycle.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-orange-800 hover:text-orange-600">
                    What payment gateways do you support?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Mengamar integrates with all major payment gateways
                    including Stripe, PayPal, Braintree, and more. If you have a
                    specific gateway you'd like to use, contact our support
                    team.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-orange-800 hover:text-orange-600">
                    Is there a limit to how many subscribers I can have?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    The Starter plan supports up to 100 subscribers, the
                    Professional plan supports up to 1,000 subscribers, and the
                    Enterprise plan has unlimited subscribers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-orange-800 hover:text-orange-600">How secure is my data?</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    We take security seriously. All data is encrypted both in
                    transit and at rest. We are SOC 2 compliant and regularly
                    undergo security audits to ensure your data is protected.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to simplify your subscription management?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed">
                  Join thousands of businesses that trust Mengamar for their
                  subscription needs.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button
                  asChild
                  variant="secondary"
                  className="w-full text-lg bg-white text-orange-600 hover:bg-gray-100 shadow-md"
                  size="lg"
                >
                  <Link to={dashboardUrl}>
                    Try it for free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="text-xs">
                  No credit card required. 14-day free trial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                  Contact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-orange-800">
                  Get in touch
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions? Our team is here to help.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-orange-800">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-orange-500" />
                    <p className="text-sm text-gray-700">support@mengamar.com</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <p className="text-sm text-gray-700">Monday - Friday, 9am - 5pm EST</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Shield className="h-5 w-5 text-orange-500" />
                    <p className="text-sm text-gray-700">SOC 2 Compliant</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-orange-800">Schedule a Demo</CardTitle>
                  <CardDescription className="text-gray-600">
                    Want to see Mengamar in action? Schedule a personalized demo
                    with our team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-orange-500 hover:bg-orange-400 text-white shadow-md">
                    <Link to={dashboardUrl}>Book a Demo</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 bg-amber-50">
        <div className="container mx-auto flex flex-col gap-6 md:h-24 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} Mengamar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm text-gray-700 hover:text-orange-600">
              Terms
            </Link>
            <Link to="#" className="text-sm text-gray-700 hover:text-orange-600">
              Privacy
            </Link>
            <Link to="#" className="text-sm text-gray-700 hover:text-orange-600">
              Cookies
            </Link>
            <Link to="#" className="text-sm text-gray-700 hover:text-orange-600">
              Security
            </Link>
          </div>
          <div className="flex gap-4">
            <Link to="#" className="text-gray-700 hover:text-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-gray-700 hover:text-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link to="#" className="text-gray-700 hover:text-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 2H2v10h10V2zM22 2h-10v10h10V2zM12 12H2v10h10V12zM22 12h-10v10h10V12z"></path>
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}