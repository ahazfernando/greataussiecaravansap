"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  HelpCircle,
  ArrowRight,
  MessageSquare,
  Phone,
  Mail,
  Caravan,
  Shield,
  CreditCard,
  Wrench,
  FileText,
  Truck,
} from "lucide-react";

const faqCategories = [
  {
    id: "general",
    title: "General Questions",
    icon: HelpCircle,
    questions: [
      {
        question: "What makes Great Aussie Caravans different from other brands?",
        answer: "Great Aussie Caravans are 100% Australian owned and built, designed specifically for Australian conditions. We use premium materials, advanced construction techniques, and offer exceptional after-sales support. Our caravans are built to last and handle the toughest Australian terrain.",
      },
      {
        question: "Where are Great Aussie Caravans manufactured?",
        answer: "All our caravans are proudly manufactured in Australia using locally sourced materials where possible. Our state-of-the-art facility ensures quality control and supports Australian jobs.",
      },
      {
        question: "Do you offer factory tours?",
        answer: "Yes! We welcome visitors to our factory. Factory tours are available by appointment and give you the opportunity to see our manufacturing process firsthand. Contact us to schedule your visit.",
      },
      {
        question: "What warranty do you provide?",
        answer: "We offer comprehensive warranties on all our caravans. Standard warranty includes structural warranty, appliance warranties, and our commitment to quality. Extended warranty options are also available during special promotions.",
      },
    ],
  },
  {
    id: "purchasing",
    title: "Purchasing & Finance",
    icon: CreditCard,
    questions: [
      {
        question: "What financing options are available?",
        answer: "We work with leading finance providers to offer competitive rates and flexible payment plans. Options include secured loans, personal loans, and dealer finance. Our team can help you find the best solution for your needs.",
      },
      {
        question: "Do you accept trade-ins?",
        answer: "Yes, we accept trade-ins on caravans, motorhomes, and other recreational vehicles. Our team will provide a fair valuation and can apply the trade-in value towards your new Great Aussie Caravan purchase.",
      },
      {
        question: "What is the typical delivery time?",
        answer: "Delivery times vary depending on the model and current production schedule. Standard delivery is typically 8-12 weeks from order confirmation. During sale events, some models may be available for immediate delivery. Contact your dealer for current availability.",
      },
      {
        question: "Can I customize my caravan?",
        answer: "Absolutely! We offer a wide range of customization options including interior finishes, appliances, solar systems, and storage solutions. Our team will work with you to create your perfect caravan. Some customizations may affect delivery time.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept bank transfers, credit cards, and finance options. A deposit is typically required to secure your order, with the balance due upon delivery. Payment terms can be discussed with your dealer.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical & Specifications",
    icon: Wrench,
    questions: [
      {
        question: "What construction methods do you use?",
        answer: "We use multiple construction methods including AllyTech (aluminium frame), TimberTech (timber frame), and FiberTech (composite) depending on the model. Each method is chosen for its specific advantages in durability, weight, and performance.",
      },
      {
        question: "What is the towing capacity required?",
        answer: "Towing capacity requirements vary by model. Our caravans range from approximately 1,500kg to 3,500kg. It's important to check your vehicle's towing capacity and ensure it meets or exceeds the caravan's ATM (Aggregate Trailer Mass). Our team can help you match the right caravan to your vehicle.",
      },
      {
        question: "What electrical systems are included?",
        answer: "All our caravans come with comprehensive electrical systems including 12V and 240V power, battery systems, and solar panel options. Higher-end models include inverters, advanced battery management, and larger solar arrays. Standard and premium electrical packages are available.",
      },
      {
        question: "What water and plumbing systems are standard?",
        answer: "Standard features include fresh water tanks, grey water tanks, pressure pumps, and hot water systems. Tank sizes vary by model. Options include larger tanks, water filtration systems, and external shower connections for extended off-grid stays.",
      },
      {
        question: "Are your caravans suitable for off-road use?",
        answer: "Many of our models are specifically designed for off-road adventures with heavy-duty chassis, independent suspension, and reinforced construction. We offer dedicated off-road models as well as touring models suitable for sealed roads and light gravel tracks.",
      },
    ],
  },
  {
    id: "service",
    title: "Service & Support",
    icon: Wrench,
    questions: [
      {
        question: "Where can I get my caravan serviced?",
        answer: "We have a network of authorized service agents across Australia. You can find your nearest service agent through our website or contact us directly. Regular servicing is important to maintain your warranty and ensure your caravan stays in top condition.",
      },
      {
        question: "What maintenance is required?",
        answer: "Regular maintenance includes annual servicing, checking seals and joints, inspecting electrical systems, and maintaining appliances. We provide detailed maintenance schedules with your caravan and our service team can guide you through all requirements.",
      },
      {
        question: "Do you provide technical support?",
        answer: "Yes, we offer comprehensive technical support. Our team can assist with questions about your caravan's systems, troubleshooting, and general advice. Support is available via phone, email, or through our authorized dealers.",
      },
      {
        question: "What if I need parts or accessories?",
        answer: "Genuine parts and accessories are available through our dealer network and can be ordered directly. We maintain comprehensive parts inventory and can source components for older models. Many accessories are also available for immediate purchase.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery & Setup",
    icon: Truck,
    questions: [
      {
        question: "Do you deliver caravans?",
        answer: "Yes, we offer delivery services through our dealer network. Delivery can be arranged to most locations across Australia. Delivery fees vary by location and can be discussed with your dealer. Some remote locations may have additional charges.",
      },
      {
        question: "Will someone show me how to use everything?",
        answer: "Absolutely! We provide comprehensive handover sessions where our team will walk you through all systems, appliances, and features of your new caravan. This includes demonstrations of electrical systems, water systems, appliances, and towing setup.",
      },
      {
        question: "What happens if there's an issue after delivery?",
        answer: "We have a comprehensive after-sales support system. If you encounter any issues, contact your dealer or our support team immediately. We'll arrange for inspection and resolution. All issues are handled under warranty where applicable.",
      },
      {
        question: "Can I pick up my caravan from the factory?",
        answer: "Yes, factory pickup is available and can be a great way to see our facility. Factory pickup includes a factory tour and handover session. This option may save on delivery costs depending on your location.",
      },
    ],
  },
];

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter FAQs based on search query
  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <Layout>
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/widget/WidgetImages(D1V1C1).jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/85 to-black/95" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent/20 rounded-full"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[90vh]">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-20">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="mb-6 bg-accent/20 text-accent border-2 border-accent/40 px-4 py-2 text-sm font-semibold">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Frequently Asked Questions
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                Got Questions?
                <br />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-accent">We've Got Answers</span>
                  <motion.span
                    className="absolute bottom-2 left-0 right-0 h-3 bg-accent/30 transform -skew-x-12 -z-0"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl"
              >
                Find answers to common questions about our caravans, purchasing process, 
                technical specifications, and more.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button variant="accent" size="lg" asChild>
                  <Link href="#faqs">
                    Browse FAQs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link href="/contact">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Contact Support
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Side - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Floating FAQ Cards - Better Aligned */}
              <div className="relative h-[600px] flex flex-col justify-center items-center">
                {/* Central Icon */}
                <Link href="/contact">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
                    className="relative z-10 mb-8 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-accent/20 border-4 border-accent flex items-center justify-center">
                        <HelpCircle className="h-16 w-16 text-accent" />
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-accent/20 border-4 border-accent"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                </Link>

                {/* Cards Grid - Better Alignment */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {[
                    { icon: Caravan, text: "Caravan Models", delay: 0.1, href: "/sale" },
                    { icon: CreditCard, text: "Find a Dealer", delay: 0.2, href: "/dealers" },
                    { icon: Shield, text: "Warranty Info", delay: 0.3, href: "/warranty" },
                    { icon: Wrench, text: "Service & Support", delay: 0.4, href: "/contact" },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link key={index} href={item.href}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 50 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: item.delay + 0.5 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 shadow-xl hover:border-accent/50 transition-all cursor-pointer"
                        >
                          <div className="flex flex-col items-center text-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-accent" />
                            </div>
                            <h3 className="text-white font-semibold text-sm">{item.text}</h3>
                            <div className="w-full h-1 bg-accent/20 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-accent rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: item.delay + 1 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section id="faqs" className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search terms or browse our categories below.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                  className="border-gray-700 text-white hover:bg-gray-900"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredCategories.map((category, categoryIndex) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                          {category.title}
                        </h2>
                      </div>

                      <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        value={activeCategory === category.id ? category.id : undefined}
                        onValueChange={(value) => setActiveCategory(value || null)}
                      >
                        {category.questions.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`${category.id}-${index}`}
                            className="bg-gray-900/50 border border-gray-800 rounded-lg px-6 hover:border-accent/50 transition-colors mb-4 border-b-0"
                          >
                            <AccordionTrigger className="text-left text-white hover:text-accent py-6 text-lg font-semibold">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300 leading-relaxed pb-6">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12 text-center"
            >
              <MessageSquare className="h-12 w-12 text-accent mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Our expert team is here to help. Get in touch and we'll provide you with 
                personalized answers to all your questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" asChild>
                  <Link href="/contact">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Contact Us
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-gray-700 text-white hover:bg-gray-800" asChild>
                  <Link href="/dealers">
                    <Phone className="mr-2 h-5 w-5" />
                    Find a Dealer
                  </Link>
                </Button>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-accent" />
                  <span>1300 CARAVAN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-accent" />
                  <span>info@greataussie.com.au</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

