import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building, Calendar, ExternalLink, Award } from 'lucide-react';
import { Button } from './ui/button';

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      role: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2021 - Present",
      description: "Led development of scalable web applications serving 100K+ users. Architected microservices infrastructure and mentored junior developers.",
      skills: ["React", "Node.js", "AWS", "Docker", "PostgreSQL", "TypeScript"],
      achievements: [
        "Improved app performance by 40%",
        "Led team of 5 developers",
        "Reduced deployment time by 60%"
      ],
      type: "Full-time"
    },
    {
      role: "AI/ML Engineer",
      company: "DataMinds Inc",
      period: "2020 - 2021",
      description: "Developed machine learning models for predictive analytics and recommendation systems. Implemented MLOps pipelines for model deployment.",
      skills: ["Python", "TensorFlow", "PyTorch", "MLflow", "Kubernetes", "GCP"],
      achievements: [
        "Deployed 15+ ML models to production",
        "Achieved 95% model accuracy",
        "Published research paper"
      ],
      type: "Full-time"
    },
    {
      role: "Frontend Developer",
      company: "StartupX",
      period: "2019 - 2020",
      description: "Built responsive web applications and mobile-first interfaces. Collaborated with design team to create intuitive user experiences.",
      skills: ["Vue.js", "JavaScript", "SASS", "Figma", "Firebase", "PWA"],
      achievements: [
        "Increased user engagement by 35%",
        "Launched 3 successful products",
        "Mentored 2 interns"
      ],
      type: "Full-time"
    },
    {
      role: "Software Development Intern",
      company: "BigTech Corp",
      period: "Summer 2018",
      description: "Contributed to enterprise software development and learned industry best practices. Participated in code reviews and agile development.",
      skills: ["Java", "Spring Boot", "MySQL", "Git", "JIRA", "REST APIs"],
      achievements: [
        "Implemented 5 new features",
        "Fixed 50+ bugs",
        "Received excellent evaluation"
      ],
      type: "Internship"
    }
  ];

  return (
    <section id="experience" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-bl from-secondary/5 via-transparent to-primary/5"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey through various roles and companies
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card group hover:shadow-glow transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Building className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {exp.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-gradient transition-all duration-300 mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-lg text-primary font-semibold">{exp.company}</p>
                </div>
                
                <div className="flex items-center text-muted-foreground mt-4 lg:mt-0">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium">{exp.period}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {exp.description}
              </p>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      whileHover={{ scale: 1.1 }}
                      className="text-xs px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground rounded-full font-medium border border-primary/20 hover:border-primary/40 transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-accent" />
                  Key Achievements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-gradient-accent rounded-full mr-2 flex-shrink-0"></div>
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="group-hover:border-primary group-hover:text-primary transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Certificate
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Career Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-card">
            <h3 className="text-2xl font-bold text-gradient mb-4">Career Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "5+", label: "Years Experience" },
                { number: "4", label: "Companies" },
                { number: "15+", label: "Major Projects" },
                { number: "100+", label: "Team Collaborations" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-gradient mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;