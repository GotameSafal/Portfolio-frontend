"use client";
import ProjectCard from "@components/admin/ProjectCard";
import SkillCard from "@components/admin/SkillCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { TooltipProvider } from "@components/ui/tooltip";
import { Code, Layers } from "lucide-react";
import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const PortfolioAdminDashboard = () => {
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "Advanced E-commerce Platform",
      description:
        "Full-stack e-commerce solution with microservices architecture",
      technologies: ["React", "Node.js", "GraphQL", "Docker"],
      githubLink: "https://github.com/example/ecommerce",
      liveLink: "https://example-ecommerce.com",
      isActive: true,
      complexity: "High",
    },
  ]);

  const [skills, setSkills] = useState([
    {
      id: "1",
      name: "React",
      category: "Frontend",
      proficiency: "Expert",
      icon: <Code className="text-blue-500" />,
    },
    {
      id: "2",
      name: "Docker",
      category: "DevOps",
      proficiency: "Advanced",
      icon: <Layers className="text-blue-700" />,
    },
  ]);

  const {
    register: registerProject,
    control: projectControl,
    handleSubmit: handleProjectSubmit,
    reset: resetProjectForm,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      technologies: [{ value: "" }],
      githubLink: "",
      liveLink: "",
      complexity: "Medium",
      isActive: true,
    },
  });

  // Skill Form Configuration
  const {
    register: registerSkill,
    handleSubmit: handleSkillSubmit,
    reset: resetSkillForm,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      proficiency: "Intermediate",
    },
  });

  // Dynamic Technology Field Array
  const {
    fields: techFields,
    append: appendTech,
    remove: removeTech,
  } = useFieldArray({
    control: projectControl,
    name: "technologies",
  });

  // Project Submission Handler with Enhanced Logic
  const onProjectSubmit = useCallback(
    (data) => {
      const newProject = {
        ...data,
        id: Date.now().toString(),
        technologies: data.technologies
          .map((tech) => tech.value)
          .filter(Boolean),
        createdAt: new Date().toISOString(),
      };
      setProjects((prev) => [...prev, newProject]);
      resetProjectForm();
    },
    [resetProjectForm]
  );

  // Skill Submission Handler
  const onSkillSubmit = useCallback(
    (data) => {
      const newSkill = {
        ...data,
        id: Date.now().toString(),
        icon: <Code className="text-green-500" />,
      };
      setSkills((prev) => [...prev, newSkill]);
      resetSkillForm();
    },
    [resetSkillForm]
  );

  // Delete Handlers with Confirmation
  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }, []);

  const deleteSkill = useCallback((id) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  }, []);

  return (
    <TooltipProvider>
      <div className="container max-w-screen-lg min-h-screen p-6 mx-auto bg-gradient-to-br animate-in from-gray-900 via-gray-800 to-purple-900 ">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white border shadow-md">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-black font-bold"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-black font-bold"
            >
              Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="w-full">
            <ProjectCard />
          </TabsContent>
          <TabsContent value="skills">
            <SkillCard />
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default PortfolioAdminDashboard;
