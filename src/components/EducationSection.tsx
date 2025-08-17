import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Award, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const educationData = [
    {
      degree: "Master of Computer Science",
      school: "Stanford University",
      period: "2019 - 2021",
      description: "Specialized in Artificial Intelligence and Machine Learning with focus on deep learning and neural networks.",
      skills: ["Machine Learning", "Deep Learning", "Python", "TensorFlow", "Research"],
      achievements: ["Dean's List", "AI Research Paper Published", "ML Competition Winner"]
    },
    {
      degree: "Bachelor of Software Engineering",
      school: "MIT",
      period: "2015 - 2019",
      description: "Comprehensive study of software development, algorithms, and computer systems with hands-on project experience.",
      skills: ["Software Engineering", "Algorithms", "Data Structures", "Java", "C++"],
      achievements: ["Summa Cum Laude", "Hackathon Winner", "Open Source Contributor"]
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      school: "Tech Academy",
      period: "2014 - 2015",
      description: "Intensive program covering modern web development technologies and industry best practices.",
      skills: ["React", "Node.js", "MongoDB", "JavaScript", "HTML/CSS"],
      achievements: ["Perfect Attendance", "Top Project Award", "Industry Mentorship"]
    }
  ];

  return (
    <section id="education" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic journey and continuous learning path
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary rounded-full hidden lg:block"></div>

          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:gap-8`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-primary rounded-full z-10 items-center justify-center">
                  <div className="w-3 h-3 bg-background rounded-full"></div>
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card w-full lg:w-5/12 group hover:shadow-glow transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                        {edu.degree}
                      </h3>
                      <p className="text-primary font-semibold">{edu.school}</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4 mr-1" />
                      {edu.period}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {edu.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-semibold text-foreground flex items-center">
                      <Award className="w-4 h-4 mr-2 text-accent" />
                      Key Achievements
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {edu.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:border-primary group-hover:text-primary transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Achievements
                  </Button>
                </motion.div>

                {/* Spacer for opposite side */}
                <div className="hidden lg:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;