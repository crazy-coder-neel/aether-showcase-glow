import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Inverted Rectangular Frame with Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Inverted rectangular frame */}
              <div className="w-80 h-96 relative">
                {/* Outer border */}
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl p-1">
                  <div className="w-full h-full bg-background rounded-2xl"></div>
                </div>
                
                {/* Inner image container */}
                <div className="absolute inset-4 rounded-xl overflow-hidden">
                  <img 
                    src="/src/assets/profile-about.jpg" 
                    alt="John Doe - About Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-accent rounded-full opacity-80"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-secondary rounded-full opacity-80"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Hi there! I'm a passionate developer with over 5 years of experience in creating 
                innovative solutions that bridge the gap between design and technology. My journey 
                began with a curiosity for how things work, which led me to explore the fascinating 
                world of programming.
              </p>
              
              <p>
                I specialize in full-stack development, AI/ML, and cloud technologies. When I'm not 
                coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community.
              </p>

              <p>
                My approach combines technical expertise with creative problem-solving, always 
                striving to deliver solutions that are not just functional, but also elegant and 
                user-friendly.
              </p>
            </div>

            {/* "Let's Connect Together" Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8"
            >
              <h3 className="text-3xl font-display font-semibold text-gradient-accent">
                Let's Connect Together
              </h3>
              <div className="w-16 h-1 bg-gradient-accent rounded-full mt-2"></div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-6 pt-6"
            >
              {[
                { number: "50+", label: "Projects" },
                { number: "5+", label: "Years Exp" },
                { number: "20+", label: "Technologies" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gradient">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;