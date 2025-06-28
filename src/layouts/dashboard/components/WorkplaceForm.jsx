import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkplace, createWorkplaceWithImages } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { X, Plus, Upload } from "lucide-react";

const WorkplaceForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    duration: "",
    description: "",
    responsibilities: [],
    technologies: [],
    file: null,
    files: [],
  });

  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (data) => {
      // If we have multiple images, use createWorkplaceWithImages
      if (data.files && data.files.length > 0) {
        return createWorkplaceWithImages(data);
      }
      // Otherwise use regular createWorkplace
      return createWorkplace(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workplaces"] });
      navigate("/dashboard");
    },
    onError: (error) => {
      setError(error.response?.data?.message || "Failed to create workplace");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Create preview URLs for all selected images
      const newPreviews = files.map((file) => URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...files],
      }));

      setImagesPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagesPreviews[index]);
    setImagesPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addResponsibility = () => {
    if (
      responsibilityInput.trim() &&
      !formData.responsibilities.includes(responsibilityInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        responsibilities: [
          ...prev.responsibilities,
          responsibilityInput.trim(),
        ],
      }));
      setResponsibilityInput("");
    }
  };

  const removeResponsibility = (item) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((r) => r !== item),
    }));
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

    if (formData.responsibilities.length === 0) {
      setError("Please add at least one responsibility");
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-screen-md mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Add New Workplace</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Company Name
              </label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Position
              </label>
              <Input
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="bg-gray-700 border-gray-600"
                placeholder="Enter job position"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Duration
            </label>
            <Input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="bg-gray-700 border-gray-600"
              placeholder="e.g., 2020-2022"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Job Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter job description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Responsibilities
            </label>
            <div className="flex">
              <Input
                value={responsibilityInput}
                onChange={(e) => setResponsibilityInput(e.target.value)}
                className="bg-gray-700 border-gray-600 rounded-r-none"
                placeholder="Add a responsibility"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addResponsibility();
                  }
                }}
              />
              <button
                type="button"
                onClick={addResponsibility}
                className="px-4 bg-blue-600 rounded-r-md hover:bg-blue-700"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.responsibilities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-700 rounded-full px-3 py-1"
                >
                  <span className="text-sm">{item}</span>
                  <button
                    type="button"
                    onClick={() => removeResponsibility(item)}
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
              Company Logo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {logoPreview ? (
                  <div>
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="mx-auto h-32 w-auto object-contain rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setLogoPreview("");
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
                        htmlFor="logo-upload"
                        className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none"
                      >
                        <span className="px-2">Upload logo</span>
                        <input
                          id="logo-upload"
                          name="logo-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Images (Optional)
            </label>
            <div className="mt-1 border-2 border-gray-600 border-dashed rounded-md p-4">
              <div className="flex items-center justify-center">
                <label
                  htmlFor="images-upload"
                  className="flex items-center justify-center w-full h-32 cursor-pointer bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-400">
                      Click to upload project images
                    </p>
                    <p className="text-xs text-gray-500">
                      You can select multiple images
                    </p>
                  </div>
                  <input
                    id="images-upload"
                    name="images-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImagesChange}
                  />
                </label>
              </div>

              {imagesPreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imagesPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
              {mutation.isPending ? "Saving..." : "Save Workplace"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkplaceForm;
