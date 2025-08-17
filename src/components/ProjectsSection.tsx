import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, ExternalLink, Users, Star, GitFork } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      id: 1,
      title: "AI-Powered Task Manager",
      description: "Smart task management app with AI-driven priority suggestions and automated scheduling.",
      image: "/placeholder-project.jpg",
      skills: ["React", "Node.js", "OpenAI API", "MongoDB", "TensorFlow"],
      teamAvatars: [
        { name: "John Doe", avatar: "/avatar1.jpg", github: "https://github.com/johndoe", linkedin: "https://linkedin.com/in/johndoe" },
        { name: "Jane Smith", avatar: "/avatar2.jpg", github: "https://github.com/janesmith", linkedin: "https://linkedin.com/in/janesmith" }
      ],
      githubUrl: "https://github.com/example/ai-task-manager",
      fullDescription: "A comprehensive task management application that leverages artificial intelligence to help users prioritize their tasks and optimize their schedules. The app analyzes user behavior, deadlines, and task complexity to provide intelligent suggestions.",
      features: [
        "AI-powered task prioritization",
        "Automated schedule optimization",
        "Smart deadline reminders",
        "Team collaboration tools",
        "Advanced analytics dashboard",
        "Mobile-responsive design"
      ],
      stats: { stars: 234, forks: 67, contributors: 8 }
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory management and payment processing.",
      image: "/placeholder-project.jpg",
      skills: ["Vue.js", "Express", "PostgreSQL", "Stripe", "Redis", "Docker"],
      teamAvatars: [
        { name: "Mike Johnson", avatar: "/avatar3.jpg", github: "https://github.com/mikejohnson", linkedin: "https://linkedin.com/in/mikejohnson" },
        { name: "Sarah Davis", avatar: "/avatar4.jpg", github: "https://github.com/sarahdavis", linkedin: "https://linkedin.com/in/sarahdavis" },
        { name: "Alex Chen", avatar: "/avatar5.jpg", github: "https://github.com/alexchen", linkedin: "https://linkedin.com/in/alexchen" }
      ],
      githubUrl: "https://github.com/example/ecommerce-platform",
      fullDescription: "A modern e-commerce platform built for scalability and performance. Features include real-time inventory tracking, secure payment processing, and advanced order management capabilities.",
      features: [
        "Real-time inventory management",
        "Secure payment processing",
        "Order tracking system",
        "Admin dashboard",
        "Customer support chat",
        "Multi-vendor support"
      ],
      stats: { stars: 189, forks: 45, contributors: 12 }
    },
    {
      id: 3,
      title: "Social Media Analytics",
      description: "Data visualization platform for social media insights with machine learning predictions.",
      image: "/placeholder-project.jpg",
      skills: ["Python", "Django", "React", "D3.js", "Pandas", "AWS"],
      teamAvatars: [
        { name: "Lisa Wong", avatar: "/avatar6.jpg", github: "https://github.com/lisawong", linkedin: "https://linkedin.com/in/lisawong" }
      ],
      githubUrl: "https://github.com/example/social-analytics",
      fullDescription: "Advanced social media analytics platform that provides deep insights into engagement patterns, audience behavior, and content performance across multiple social platforms.",
      features: [
        "Multi-platform data integration",
        "Advanced data visualization",
        "Predictive analytics",
        "Custom report generation",
        "Real-time monitoring",
        "API integrations"
      ],
      stats: { stars: 156, forks: 32, contributors: 5 }
    },
    {
      id: 4,
      title: "Blockchain Voting System",
      description: "Secure and transparent voting system built on blockchain technology.",
      image: "/placeholder-project.jpg",
      skills: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS", "MetaMask"],
      teamAvatars: [
        { name: "David Kim", avatar: "/avatar7.jpg", github: "https://github.com/davidkim", linkedin: "https://linkedin.com/in/davidkim" },
        { name: "Emily Brown", avatar: "/avatar8.jpg", github: "https://github.com/emilybrown", linkedin: "https://linkedin.com/in/emilybrown" }
      ],
      githubUrl: "https://github.com/example/blockchain-voting",
      fullDescription: "A revolutionary voting system that ensures transparency, security, and immutability through blockchain technology. Built for governments and organizations requiring secure voting mechanisms.",
      features: [
        "Blockchain-based security",
        "Anonymous voting",
        "Real-time vote counting",
        "Audit trail",
        "Mobile accessibility",
        "Smart contract automation"
      ],
      stats: { stars: 298, forks: 89, contributors: 6 }
    },
    {
      id: 5,
      title: "IoT Monitoring Dashboard",
      description: "Real-time IoT device monitoring with predictive maintenance capabilities.",
      image: "/placeholder-project.jpg",
      skills: ["React", "InfluxDB", "Go", "MQTT", "Grafana", "Docker"],
      teamAvatars: [
        { name: "Tom Wilson", avatar: "/avatar9.jpg", github: "https://github.com/tomwilson", linkedin: "https://linkedin.com/in/tomwilson" }
      ],
      githubUrl: "https://github.com/example/iot-dashboard",
      fullDescription: "Comprehensive IoT monitoring solution that provides real-time insights into device performance, predictive maintenance alerts, and automated issue resolution.",
      features: [
        "Real-time device monitoring",
        "Predictive maintenance",
        "Custom alerting system",
        "Historical data analysis",
        "Device management",
        "API integrations"
      ],
      stats: { stars: 167, forks: 41, contributors: 4 }
    },
    {
      id: 6,
      title: "AR Shopping Experience",
      description: "Augmented reality shopping app with virtual try-on capabilities.",
      image: "/placeholder-project.jpg",
      skills: ["React Native", "ARKit", "ARCore", "Three.js", "Firebase", "Stripe"],
      teamAvatars: [
        { name: "Nina Patel", avatar: "/avatar10.jpg", github: "https://github.com/ninapatel", linkedin: "https://linkedin.com/in/ninapatel" },
        { name: "Ryan Lee", avatar: "/avatar11.jpg", github: "https://github.com/ryanlee", linkedin: "https://linkedin.com/in/ryanlee" }
      ],
      githubUrl: "https://github.com/example/ar-shopping",
      fullDescription: "Innovative mobile shopping application that uses augmented reality to allow customers to virtually try products before purchasing. Features advanced 3D rendering and machine learning for size recommendations.",
      features: [
        "Virtual try-on technology",
        "3D product visualization",
        "Size recommendation AI",
        "Social sharing",
        "In-app purchasing",
        "Cross-platform compatibility"
      ],
      stats: { stars: 445, forks: 123, contributors: 10 }
    }
  ];

  return (
    <section id="projects" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing my latest work and innovative solutions
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card group cursor-pointer hover:shadow-glow transition-all duration-300"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gradient">{project.title}</span>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <div className="flex items-center bg-black/50 rounded-full px-2 py-1 text-xs text-white">
                    <Star className="w-3 h-3 mr-1" />
                    {project.stats.stars}
                  </div>
                  <div className="flex items-center bg-black/50 rounded-full px-2 py-1 text-xs text-white">
                    <GitFork className="w-3 h-3 mr-1" />
                    {project.stats.forks}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {project.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                      +{project.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Team Avatars */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.teamAvatars.map((member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background flex items-center justify-center text-xs font-semibold text-white"
                        title={member.name}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {project.teamAvatars.length > 1 && (
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                        <Users className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubUrl, '_blank');
                    }}
                    className="hover:bg-primary/10"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass border border-primary/20">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gradient flex items-center justify-between">
                    {selectedProject.title}
                    <div className="flex space-x-2">
                      <div className="flex items-center bg-primary/20 rounded-full px-3 py-1 text-sm">
                        <Star className="w-4 h-4 mr-1 text-accent" />
                        {selectedProject.stats.stars}
                      </div>
                      <div className="flex items-center bg-primary/20 rounded-full px-3 py-1 text-sm">
                        <GitFork className="w-4 h-4 mr-1 text-secondary" />
                        {selectedProject.stats.forks}
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Project Image */}
                  <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <span className="text-4xl font-bold text-gradient">{selectedProject.title}</span>
                  </div>

                  {/* Full Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About This Project</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProject.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center text-muted-foreground">
                          <div className="w-2 h-2 bg-gradient-primary rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contributors */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contributors</h3>
                    <div className="flex flex-wrap gap-4">
                      {selectedProject.teamAvatars.map((member: any, index: number) => (
                        <div key={index} className="flex items-center space-x-3 glass-card p-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                            {member.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <div className="flex space-x-2 mt-1">
                              <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-center pt-6">
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                    >
                      <Github className="w-5 h-5 mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;