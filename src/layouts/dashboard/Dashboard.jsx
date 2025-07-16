import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  getProjects,
  getWorkplaces,
  useDeleteProject,
  useDeleteWorkplace,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Trash, Eye, ExternalLink, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

// Project Detail Modal Component
const ProjectDetailModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 w-full max-w-lg sm:max-w-2xl mx-auto my-8 shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <Eye className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {project.imgUrl && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <motion.img
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={project.imgUrl.url}
              alt={project.title}
              className="w-full h-48 sm:h-64 object-cover"
            />
          </div>
        )}

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-2">
              Description
            </h4>
            <p className="text-gray-300 text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {project.detailedDescription && (
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">
                Detailed Description
              </h4>
              <p className="text-gray-300 text-sm sm:text-base">
                {project.detailedDescription}
              </p>
            </div>
          )}

          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-2">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1 bg-gray-700 text-cyan-300 rounded-full text-xs sm:text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubLink && project.githubLink.trim() !== "" && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors text-sm sm:text-base"
              >
                <ExternalLink size={16} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Workplace Detail Modal Component
const WorkplaceDetailModal = ({ workplace, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 w-full max-w-lg sm:max-w-2xl mx-auto my-8 shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {workplace.company}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <Eye className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {workplace.logoUrl && (
          <div className="mb-6 flex justify-center">
            <motion.img
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={workplace.logoUrl.url}
              alt={workplace.company}
              className="h-24 sm:h-32 object-contain"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">
                Position
              </h4>
              <p className="text-gray-300 text-sm sm:text-base">
                {workplace.position}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">
                Duration
              </h4>
              <p className="text-gray-300 text-sm sm:text-base">
                {workplace.duration}
              </p>
            </div>
          </div>

          {workplace.description && (
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">
                Description
              </h4>
              <p className="text-gray-300 text-sm sm:text-base">
                {workplace.description}
              </p>
            </div>
          )}

          {workplace.responsibilities &&
            workplace.responsibilities.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-2">
                  Responsibilities
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {workplace.responsibilities.map((responsibility, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-gray-300 text-sm sm:text-base"
                    >
                      {responsibility}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

          {workplace.technologies && workplace.technologies.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {workplace.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 bg-gray-700 text-cyan-300 rounded-full text-xs sm:text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {workplace.images && workplace.images.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">
                Gallery
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {workplace.images.map((image, index) => (
                  <motion.img
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    src={image.url}
                    alt={`${workplace.company} image ${index + 1}`}
                    className="rounded-lg object-cover h-24 sm:h-32 w-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Card component for mobile view
const ProjectCard = ({ project, onView, onDelete, isDeleting = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-white">{project.title}</h3>
          <p className="text-gray-300 text-sm mt-1 line-clamp-2">
            {project.description}
          </p>
        </div>
        {project.imgUrl && (
          <img
            src={project.imgUrl.url}
            alt={project.title}
            className="w-16 h-16 rounded-md object-cover"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {project.technologies.slice(0, 3).map((tech, index) => (
          <span
            key={index}
            className="px-2 py-0.5 text-xs bg-gray-700 rounded-full"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="px-2 py-0.5 text-xs bg-gray-700 rounded-full">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-3">
        <button
          onClick={() => onView(project)}
          className="p-2 rounded-full bg-blue-600/20 text-blue-400"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={() => onDelete(project._id)}
          disabled={isDeleting}
          className="p-2 rounded-full bg-red-600/20 text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const WorkplaceCard = ({ workplace, onView, onDelete, isDeleting = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-white">{workplace.company}</h3>
          <p className="text-gray-300 text-sm">{workplace.position}</p>
          <p className="text-gray-400 text-xs mt-1">{workplace.duration}</p>
        </div>
        {workplace.logoUrl && (
          <img
            src={workplace.logoUrl.url}
            alt={workplace.company}
            className="w-16 h-16 rounded-md object-contain"
          />
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-3">
        <button
          onClick={() => onView(workplace)}
          className="p-2 rounded-full bg-blue-600/20 text-blue-400"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={() => onDelete(workplace._id)}
          disabled={isDeleting}
          className="p-2 rounded-full bg-red-600/20 text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const { logout } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedWorkplace, setSelectedWorkplace] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    type: null, // 'project' or 'workplace'
    id: null,
    title: "",
  });

  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const { data: workplacesData, isLoading: workplacesLoading } = useQuery({
    queryKey: ["workplaces"],
    queryFn: getWorkplaces,
  });

  const deleteProjectMutation = useDeleteProject();
  const deleteWorkplaceMutation = useDeleteWorkplace();

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteProject = (id) => {
    const project = projectsData?.projects.find((p) => p._id === id);
    setDeleteConfirm({
      isOpen: true,
      type: "project",
      id,
      title: project?.title || "this project",
    });
  };

  const handleDeleteWorkplace = (id) => {
    const workplace = workplacesData?.workplaces.find((w) => w._id === id);
    setDeleteConfirm({
      isOpen: true,
      type: "workplace",
      id,
      title: workplace?.company || "this workplace",
    });
  };

  const confirmDelete = () => {
    if (deleteConfirm.type === "project") {
      deleteProjectMutation.mutate(deleteConfirm.id);
    } else if (deleteConfirm.type === "workplace") {
      deleteWorkplaceMutation.mutate(deleteConfirm.id);
    }
    setDeleteConfirm({ isOpen: false, type: null, id: null, title: "" });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, type: null, id: null, title: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            Logout
          </button>
        </div>

        {/* Projects Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold">Projects</h2>
            <Link
              to="/dashboard/projects/new"
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Add New Project
            </Link>
          </div>

          {projectsLoading ? (
            <p>Loading projects...</p>
          ) : (
            <>
              {/* Desktop view - Table */}
              <div className="hidden md:block bg-gray-800 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Technologies
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {projectsData?.projects.map((project) => (
                      <tr key={project._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {project.title}
                        </td>
                        <td className="px-6 py-4 text-sm truncate max-w-xs">
                          {project.description}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-gray-700 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedProject(project)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project._id)}
                              disabled={deleteProjectMutation.isPending}
                              className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile view - Cards */}
              <div className="md:hidden">
                {projectsData?.projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onView={() => setSelectedProject(project)}
                    onDelete={handleDeleteProject}
                    isDeleting={deleteProjectMutation.isPending}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Workplaces Section */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold">Workplaces</h2>
            <Link
              to="/dashboard/workplaces/new"
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Add New Workplace
            </Link>
          </div>

          {workplacesLoading ? (
            <p>Loading workplaces...</p>
          ) : (
            <>
              {/* Desktop view - Table */}
              <div className="hidden md:block bg-gray-800 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {workplacesData?.workplaces.map((workplace) => (
                      <tr key={workplace._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {workplace.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {workplace.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {workplace.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedWorkplace(workplace)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteWorkplace(workplace._id)
                              }
                              disabled={deleteWorkplaceMutation.isPending}
                              className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile view - Cards */}
              <div className="md:hidden">
                {workplacesData?.workplaces.map((workplace) => (
                  <WorkplaceCard
                    key={workplace._id}
                    workplace={workplace}
                    onView={() => setSelectedWorkplace(workplace)}
                    onDelete={handleDeleteWorkplace}
                    isDeleting={deleteWorkplaceMutation.isPending}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Workplace Detail Modal */}
      <AnimatePresence>
        {selectedWorkplace && (
          <WorkplaceDetailModal
            workplace={selectedWorkplace}
            onClose={() => setSelectedWorkplace(null)}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title={`Delete ${
          deleteConfirm.type === "project" ? "Project" : "Workplace"
        }`}
        message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isLoading={
          deleteProjectMutation.isPending || deleteWorkplaceMutation.isPending
        }
      />
    </div>
  );
};

export default Dashboard;
