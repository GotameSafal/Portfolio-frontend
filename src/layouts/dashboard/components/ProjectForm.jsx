import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";

const ProjectForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    liveLink: "",
    githubLink: "",
    technologies: [],
    file: null,
  });

  const [techInput, setTechInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/dashboard");
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Failed to create project");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.file) {
      setError("Please upload a project image");
      return;
    }

    if (formData.technologies.length === 0) {
      setError("Please add at least one technology");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-screen-md mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Add New Project</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-md bg-opacity-10">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-lg p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Short Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Enter a brief description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Detailed Description
            </label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter a detailed description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Live Link
              </label>
              <Input
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                GitHub Link (Optional)
              </label>
              <Input
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Technologies
            </label>
            <div className="flex">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="bg-gray-700 border-gray-600 rounded-r-none"
                placeholder="Add a technology"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 bg-blue-600 rounded-r-md hover:bg-blue-700"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-700 rounded-full px-3 py-1"
                >
                  <span className="text-sm">{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="ml-2 text-gray-400 hover:text-gray-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <div>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mx-auto h-32 w-auto object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl("");
                        setFormData((prev) => ({ ...prev, file: null }));
                      }}
                      className="mt-2 text-sm text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none"
                      >
                        <span className="px-2">Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
