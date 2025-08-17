import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

const HeroSection = () => {
  const [isGlowing, setIsGlowing] = useState(false);

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-gradient">John Doe</span>
            </motion.h1>

            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 h-20">
              <TypeAnimation
                sequence={[
                  'AI/ML Developer',
                  2000,
                  'Full Stack Engineer',
                  2000,
                  'Data Scientist',
                  2000,
                  'Cloud Architect',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-gradient-secondary"
                repeat={Infinity}
              />
            </div>

            {/* Social Links */}
            <motion.div 
              className="flex justify-center lg:justify-start space-x-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-3 glass rounded-full hover:shadow-glow transition-all duration-300 group"
                >
                  <social.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>

            {/* Download Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                variant="hero"
                size="xl"
                className="group"
                onClick={() => {
                  // Add your resume download logic here
                  console.log('Download resume');
                }}
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              className={`relative cursor-pointer transition-all duration-500 ${isGlowing ? 'animate-glow' : ''}`}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setIsGlowing(true)}
              onHoverEnd={() => setIsGlowing(false)}
              onClick={() => setIsGlowing(!isGlowing)}
            >
              {/* Oval Frame */}
              <div className="relative w-80 h-96 rounded-full overflow-hidden border-4 border-gradient-primary p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-purple-blue p-4">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img 
                      src="/src/assets/profile-hero.jpg" 
                      alt="John Doe - Professional Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-accent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-secondary rounded-full"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;