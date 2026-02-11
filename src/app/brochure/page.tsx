"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Download,
  FileText,
  ArrowRight,
  CheckCircle2,
  X,
  Phone,
  Mail,
  User,
  MessageSquare,
  Sparkles,
  Tag,
  BookOpen,
  FileCheck,
  Info,
  MapPin,
} from "lucide-react";

// Function to get model logo
const getModelLogo = (modelName: string): string => {
  const logoMap: Record<string, string> = {
    "Striker": "/caravanmodels/strikerlogo.png",
    "20URER LITE": "/caravanmodels/euorerlitelogo.png",
    "20URER": "/caravanmodels/eourerlogo.png",
    "Gravity": "/caravanmodels/gravitylogo.png",
    "Xplora": "/caravanmodels/xploralogo.png",
    "Tonka": "/caravanmodels/tonkologo.png",
    "Paragon": "/caravanlogos/litelogo.png",
  };
  return logoMap[modelName] || "/caravanlogos/litelogo.png";
};

// Available models
const models = [
  {
    id: "striker",
    name: "Striker",
    tagline: "Hybrid Adventure Ready",
    heroImage: "/caravan/CaravanImage(D1V1C1).webp",
    category: "hybrid",
  },
  {
    id: "20urer",
    name: "20URER",
    tagline: "Premium Caravan Experience",
    heroImage: "/caravan/CaravanImage(D1V1C3).webp",
    category: "touring",
  },
  {
    id: "gravity",
    name: "Gravity",
    tagline: "Off-Road Dominance",
    heroImage: "/caravan/CaravanImage(D1V1C5).webp",
    category: "off-road",
  },
  {
    id: "xplora",
    name: "Xplora",
    tagline: "Explore Without Limits",
    heroImage: "/caravan/cfi_featured_image.png",
    category: "off-road",
  },
  {
    id: "20urer-lite",
    name: "20URER LITE",
    tagline: "Lightweight Caravan Excellence",
    heroImage: "/caravan/CaravanImage(D1V1C2).png",
    category: "touring",
  },
  {
    id: "tonka",
    name: "Tonka",
    tagline: "Built Tough, Built Right",
    heroImage: "/caravan/CaravanImage(D1V1C1).webp",
    category: "off-road",
  },
  {
    id: "paragon",
    name: "Paragon",
    tagline: "Premium Motorhome Experience",
    heroImage: "/caravan/CaravanImage(D1V1C2).png",
    category: "motorhome",
  },
];

export default function BrochurePage() {
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [selectedModel, setSelectedModel] = useState<typeof models[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    phoneCode: "+61",
    state: "",
    postalCode: "",
    message: "",
  });

  // Country codes for phone numbers
  const countryCodes = [
    { value: "+61", label: "Australia (+61)", flag: "🇦🇺" },
    { value: "+64", label: "New Zealand (+64)", flag: "🇳🇿" },
    { value: "+1", label: "USA/Canada (+1)", flag: "🇺🇸" },
    { value: "+44", label: "United Kingdom (+44)", flag: "🇬🇧" },
    { value: "+27", label: "South Africa (+27)", flag: "🇿🇦" },
    { value: "+65", label: "Singapore (+65)", flag: "🇸🇬" },
    { value: "+60", label: "Malaysia (+60)", flag: "🇲🇾" },
    { value: "+62", label: "Indonesia (+62)", flag: "🇮🇩" },
    { value: "+66", label: "Thailand (+66)", flag: "🇹🇭" },
    { value: "+84", label: "Vietnam (+84)", flag: "🇻🇳" },
    { value: "+63", label: "Philippines (+63)", flag: "🇵🇭" },
    { value: "+86", label: "China (+86)", flag: "🇨🇳" },
    { value: "+81", label: "Japan (+81)", flag: "🇯🇵" },
    { value: "+82", label: "South Korea (+82)", flag: "🇰🇷" },
    { value: "+91", label: "India (+91)", flag: "🇮🇳" },
    { value: "+971", label: "UAE (+971)", flag: "🇦🇪" },
    { value: "+49", label: "Germany (+49)", flag: "🇩🇪" },
    { value: "+33", label: "France (+33)", flag: "🇫🇷" },
    { value: "+39", label: "Italy (+39)", flag: "🇮🇹" },
    { value: "+34", label: "Spain (+34)", flag: "🇪🇸" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleModelSelect = (model: typeof models[0]) => {
    setSelectedModel(model);
    setIsModalOpen(true);
    // Reset form when opening modal
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      phoneCode: "+61",
      state: "",
      postalCode: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "brochureRequests"), {
        modelId: selectedModel?.id,
        modelName: selectedModel?.name,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phoneCode && formData.phone ? `${formData.phoneCode} ${formData.phone}` : formData.phone || "",
        phoneCode: formData.phoneCode,
        state: formData.state,
        postalCode: formData.postalCode,
        message: formData.message,
        status: "new",
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Brochure Request Submitted!",
        description: "We'll send you the brochure via email shortly.",
      });
    } catch (error: any) {
      console.error("Error submitting brochure request:", error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedModel(null);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        phoneCode: "+61",
        state: "",
        postalCode: "",
        message: "",
      });
    }, 300);
  };

  return (
    <Layout>
      {/* Premium Header Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background with Parallax */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('/home/HomeHeader(D1V1C2).jpg')] bg-cover bg-center"
            style={{
              transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
              transition: "transform 0.1s ease-out",
            }}
          />
          {/* Multi-layer Gradient Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/90" />
        </div>

        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"
            animate={{
              y: [0, -40, 0],
              x: [0, -30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/3 rounded-full blur-2xl"
            animate={{
              y: [0, 25, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        {/* Content Container */}
        <div className="container-wide relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Brochure Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <Badge
                className="bg-accent/20 text-accent border-2 border-accent/40 px-6 py-3 text-sm md:text-base font-bold tracking-wider uppercase backdrop-blur-sm hover:bg-accent/30 transition-all duration-300"
              >
                <BookOpen className="h-4 w-4 mr-2 animate-pulse" />
                Request Your Brochure
                <FileCheck className="h-4 w-4 ml-2" />
              </Badge>
            </motion.div>

            {/* Main Headline with Staggered Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]"
            >
              <span className="block">Get Your Detailed</span>
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-accent">Model Brochure</span>
                <motion.span
                  className="absolute bottom-3 left-0 right-0 h-4 bg-accent/30 transform -skew-x-12 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                />
              </span>
              <span className="block mt-2">Delivered to Your Inbox</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Explore our premium Australian caravans with detailed specifications,
              <br className="hidden sm:block" />
              features, and pricing information.
              <span className="text-accent font-semibold"> Free brochure</span> delivered instantly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button
                variant="hero"
                size="xl"
                className="group shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300"
                onClick={() => {
                  document.getElementById("models-section")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Browse Models
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                className="backdrop-blur-sm border-2 border-white/80 hover:bg-white/20 transition-all duration-300"
                asChild
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Model Selection Section */}
      <section id="models-section" className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Choose Your <span className="text-accent">Model</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Click on any model to request its detailed brochure
            </p>
          </motion.div>

          {/* Models Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {models.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => handleModelSelect(model)}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
                  {/* Model Image */}
                  <div className="relative h-48 md:h-56 bg-gray-950 overflow-hidden">
                    <Image
                      src={model.heroImage}
                      alt={model.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Model Logo Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="relative h-12 w-full max-w-[200px]">
                        <Image
                          src={getModelLogo(model.name)}
                          alt={`${model.name} Logo`}
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Model Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-gray-300 mb-4">{model.tagline}</p>
                    <div className="flex items-center gap-2 text-accent font-medium">
                      <span>Request Brochure</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure Request Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {!isSubmitted && (
            <DialogHeader className="pb-4 border-b border-gray-800">
              {/* Navbar Logo - Centered */}
              <div className="flex justify-center mb-6">
                <div className="relative h-16 w-64">
                  <Image
                    src="/logo/greataussielogo.png"
                    alt="Great Aussie Caravans"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-center mb-4">
                {selectedModel && (
                  <div className="relative h-12 w-32">
                    <Image
                      src={getModelLogo(selectedModel.name)}
                      alt={`${selectedModel.name} Logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
              <DialogTitle className="text-2xl font-bold text-white text-center">
                Request {selectedModel?.name} Brochure
              </DialogTitle>
              <DialogDescription className="text-gray-300 text-center mt-2">
                Fill out the form below and we'll send you the detailed brochure for the {selectedModel?.name} model.
              </DialogDescription>
            </DialogHeader>
          )}

          {isSubmitted ? (
            <div className="py-12 text-center flex flex-col items-center justify-between min-h-[400px]">
              {/* Model Logo at Top */}
              {selectedModel && (
                <div className="relative h-16 w-48 mb-8">
                  <Image
                    src={getModelLogo(selectedModel.name)}
                    alt={`${selectedModel.name} Logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              
              {/* Thank You Message in Center */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 border-2 border-accent/30 mb-6">
                  <CheckCircle2 className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed max-w-md">
                  Your brochure request has been submitted successfully. We'll send the {selectedModel?.name} brochure 
                  to your email address shortly.
                </p>
                <Button
                  variant="accent"
                  size="lg"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </div>

              {/* Great Aussie Logo at Bottom */}
              <div className="relative h-12 w-64 mt-8">
                <Image
                  src="/logo/greataussielogo.png"
                  alt="Great Aussie Caravans"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 pt-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name <span className="text-accent">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address <span className="text-accent">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-accent focus:border-accent"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.phoneCode}
                    onValueChange={(value) => handleSelectChange("phoneCode", value)}
                  >
                    <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white focus:ring-accent focus:border-accent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800 text-white max-h-[300px]">
                      {countryCodes.map((code) => (
                        <SelectItem key={code.value} value={code.value} className="focus:bg-gray-800 focus:text-white">
                          <span className="flex items-center gap-2">
                            <span>{code.flag}</span>
                            <span>{code.value}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0400 000 000"
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              {/* State and Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-white">
                    State <span className="text-accent">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="NSW, VIC, QLD, etc."
                      required
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-white">
                    Postal Code <span className="text-accent">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="2000"
                      required
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  Your Message <span className="text-accent">*</span>
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about what you're looking for or any questions you have..."
                    rows={5}
                    required
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-accent focus:border-accent resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleCloseModal}
                  className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Request Brochure
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

