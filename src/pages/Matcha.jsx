import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronRight, FiChevronLeft, FiChevronUp } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaTwitter, FaLeaf, FaStar, FaQuoteRight, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineLocalShipping, MdOutlineSecurity, MdOutlineSupportAgent, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { BsCupHot, BsFlower1, BsLightningCharge, BsArrowRight } from 'react-icons/bs';
import matchaImage from "../assets/matcha-image.webp"
import matchaVideo from "../assets/videos/matcha-bg.mp4"

const Matcha = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [emailError, setEmailError] = useState('');
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const imageY = useTransform(scrollYProgress, [0.2, 0.4], [0, -50]);

  // Auto-play video on load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  // Show back to top button
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      setShowBackToTop(value > 0.2);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Smooth scroll function
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  }, []);

  // Navbar visibility based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Email validation
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(value && !emailRegex.test(value) ? 'Please enter a valid email' : '');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && formData.name && formData.email && formData.message) {
      setIsFormSubmitted(true);
      setTimeout(() => setIsFormSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  // Enhanced testimonials data
  const testimonials = [
    {
      name: 'Emily Johnson',
      role: 'Yoga Instructor',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      review: 'This matcha has transformed my morning routine. The energy is clean, focused, and lasts for hours without any crash.',
      rating: 5,
      featured: true
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      review: 'Finally found a matcha that tastes as good as it makes me feel. Perfect for long coding sessions and deep work.',
      rating: 5,
      featured: false
    },
    {
      name: 'Sophia Martinez',
      role: 'Wellness Coach',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      review: 'The quality is unmatched. You can really taste the difference in every sip. My clients absolutely love it!',
      rating: 5,
      featured: true
    }
  ];

  // Benefits data
  const benefits = [
    { 
      icon: BsLightningCharge, 
      title: 'Sustained Energy', 
      description: '4-6 hours of clean, focused energy without crash',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      icon: BsFlower1, 
      title: 'Rich in Antioxidants', 
      description: '137x more antioxidants than regular green tea',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: BsCupHot, 
      title: 'Premium Grade', 
      description: 'Ceremonial grade matcha from Uji, Japan',
      color: 'from-teal-500 to-cyan-500'
    },
    { 
      icon: MdOutlineLocalShipping, 
      title: 'Free Shipping', 
      description: 'On orders over $50, delivered worldwide',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      icon: MdOutlineSecurity, 
      title: 'Quality Guaranteed', 
      description: '100% satisfaction or your money back',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: MdOutlineSupportAgent, 
      title: '24/7 Support', 
      description: 'Always here to help with any questions',
      color: 'from-red-500 to-rose-500'
    }
  ];

  // Stats data
  const stats = [
    { value: '5000+', label: 'Happy Customers', icon: FaStar },
    { value: '100%', label: 'Organic', icon: FaLeaf },
    { value: '24/7', label: 'Support', icon: MdOutlineSupportAgent }
  ];

  // Navbar links
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="relative overflow-x-hidden bg-black">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
      </div>

      {/* Navbar */}
      <motion.nav 
        style={{ opacity }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-green-500/20 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with animation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-green-400"
            >
              <FaLeaf className="text-2xl" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Matcha
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => scrollToSection(link.id)}
                className={`relative text-sm font-medium transition-all hover:text-green-400 group ${
                  activeSection === link.id ? 'text-green-400' : 'text-gray-300'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-400 to-green-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-green-400/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-green-400 hover:text-green-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 py-4 border-t border-green-500/20"
            >
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left py-3 px-4 transition-colors hover:bg-green-900/30 rounded-lg ${
                    activeSection === link.id ? 'text-green-400 font-medium bg-green-900/20' : 'text-gray-300'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background - Made more visible */}
        <div className="absolute inset-0 w-full h-full">
          {/* Reduced opacity overlay to make video more visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10" />
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
            className="w-full h-full"
          >
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              autoPlay
              onLoadedData={() => setIsVideoLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-90' : 'opacity-0'}`}
            >
              <source src={matchaVideo} type="video/mp4" />
            </video>
          </motion.div>
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ y: heroY }}
          className="relative z-20 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full text-green-400 text-sm font-medium border border-green-500/30">
              ✦ Premium Japanese Matcha ✦
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-400 bg-clip-text text-transparent">
              Pure Matcha
            </span>
            <br />
            <span className="text-white">Energy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200 leading-relaxed"
          >
            Experience calm focus and natural energy from premium ceremonial grade matcha, 
            carefully sourced from the finest tea gardens in Japan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-black rounded-full font-semibold text-lg shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
            >
              Order Now
              <BsArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('about')}
              className="px-10 py-4 bg-transparent border-2 border-green-500/50 text-green-400 rounded-full font-semibold text-lg hover:bg-green-500/10 hover:border-green-400 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center gap-8 md:gap-16 mt-16"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                whileHover={{ y: -5 }}
              >
                <stat.icon className="text-2xl text-green-400 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <div className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center hover:border-green-400 transition-colors">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-green-400 rounded-full mt-2" 
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 bg-black overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                Why Choose Our Matcha?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover the difference that premium quality makes in your daily ritual
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                The Art of Japanese Tea Ceremony
              </h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Our premium matcha is carefully sourced from the finest tea gardens in Uji, Japan. 
                Stone-ground to perfection between granite wheels, it delivers a smooth, umami-rich flavor 
                that embodies centuries of tradition and craftsmanship.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  'Natural Energy',
                  'Rich in Antioxidants',
                  'Boosts Focus',
                  'Detoxifying',
                  'Immune Support',
                  'Calm Alertness'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-black rounded-full font-semibold inline-flex items-center gap-2"
              >
                Discover More
                <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Right Column - Floating Image with Parallax */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
              style={{ y: imageY }}
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <div className="relative">
                  <img 
                    src={matchaImage}
                    alt="Matcha Cup"
                    className="rounded-2xl shadow-2xl shadow-green-500/20 w-full max-w-md mx-auto border border-green-500/30"
                  />
                  
                  {/* Floating badge */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-black px-4 py-2 rounded-full font-bold shadow-lg"
                  >
                    ✦ Premium Grade ✦
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/5 to-transparent rounded-tl-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-32 px-6 bg-gradient-to-b from-black to-green-950/20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm font-medium mb-4 border border-green-500/30">
              ✦ Testimonials ✦
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                What Our Customers Say
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made matcha part of their daily ritual
            </p>
          </motion.div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border ${
                  testimonial.featured 
                    ? 'border-green-500 shadow-xl shadow-green-500/20' 
                    : 'border-green-500/20'
                } transition-all duration-300 overflow-hidden group`}
              >
                {testimonial.featured && (
                  <>
                    <div className="absolute top-0 right-0 w-24 h-24">
                      <div className="absolute transform rotate-45 bg-gradient-to-r from-green-500 to-green-600 text-black text-xs font-bold py-1 right-[-35px] top-[32px] w-[170px] text-center">
                        ★ Featured ★
                      </div>
                    </div>
                  </>
                )}
                
                <FaQuoteRight className="absolute bottom-4 right-4 text-5xl text-green-500/10 group-hover:text-green-500/20 transition-colors" />
                
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
                  />
                  <div>
                    <h3 className="font-semibold text-green-400">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.review}"</p>
                
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: `-${currentTestimonial * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex"
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-green-500/20">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
                        />
                        <div>
                          <h3 className="font-semibold text-green-400">{testimonial.name}</h3>
                          <p className="text-sm text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">"{testimonial.review}"</p>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={() => setCurrentTestimonial(prev => Math.max(0, prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={currentTestimonial === 0}
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => setCurrentTestimonial(prev => Math.min(testimonials.length - 1, prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={currentTestimonial === testimonials.length - 1}
            >
              <FiChevronRight />
            </button>

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentTestimonial === index 
                      ? 'w-6 bg-gradient-to-r from-green-400 to-green-500' 
                      : 'w-2 bg-green-500/30 hover:bg-green-500/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 bg-black overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm font-medium mb-4 border border-green-500/30">
              ✦ Get in Touch ✦
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                Start Your Matcha Journey
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-green-500/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: MdEmail, text: 'hello@matcha.com', label: 'Email' },
                    { icon: MdPhone, text: '+1 (555) 123-4567', label: 'Phone' },
                    { icon: MdLocationOn, text: '123 Tea House Lane, Kyoto, Japan', label: 'Address' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4 group"
                    >
                      <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                        <item.icon className="text-xl text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{item.label}</p>
                        <p className="text-white font-medium">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-green-500/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {[FaInstagram, FaFacebook, FaTwitter].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-all"
                    >
                      <Icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-green-500/20 shadow-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder-gray-500 ${
                      emailError ? 'border-red-500' : 'border-green-500/30'
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-white placeholder-gray-500"
                    placeholder="Tell us about your interest in matcha..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-black rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all relative overflow-hidden group"
                  disabled={!!emailError}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Message
                    <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Success Message */}
                <AnimatePresence>
                  {isFormSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-green-400 text-center bg-green-500/10 py-3 rounded-lg border border-green-500/30"
                    >
                      ✦ Thank you! We'll get back to you soon. ✦
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Fixed with complete structure */}
      <footer className="relative bg-gradient-to-b from-black to-green-950/30 text-green-400 py-16 px-6 border-t border-green-500/20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-green-400"
                >
                  <FaLeaf className="text-3xl" />
                </motion.div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                  Matcha
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium Japanese matcha for the modern lifestyle. Experience the perfect blend of tradition and wellness.
              </p>
              <div className="flex space-x-4 pt-2">
                {[FaInstagram, FaFacebook, FaTwitter].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <Icon className="text-xl" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Testimonials', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <FiChevronRight className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <MdEmail className="text-green-400 flex-shrink-0" />
                  <span>hello@matcha.com</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <MdPhone className="text-green-400 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <MdLocationOn className="text-green-400 flex-shrink-0" />
                  <span>Kyoto, Japan</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">
                Subscribe for exclusive offers
              </p>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg bg-black/50 border border-green-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-black rounded-lg font-medium hover:from-green-400 hover:to-green-500 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-green-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Matcha. All rights reserved. Crafted with 🍵 in Japan
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Terms</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">Shipping</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => scrollToSection('home')}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-black shadow-lg hover:shadow-green-500/50 transition-all group"
          >
            <FiChevronUp className="text-2xl group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Matcha;