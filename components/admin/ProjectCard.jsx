import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { DialogContent, DialogTrigger } from "@components/ui/dialog";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { Edit, Layers, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import ProjectCustomForm from "./ProjectCustomForm";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "@redux/slices/api";
import { toast } from "react-toastify";
import { RiMiniProgramFill } from "@node_modules/react-icons/ri";
const ProjectCard = () => {
  const [loadingId, setLoadingId] = useState(null);
  const { data } = useGetProjectsQuery();
  const [remove] = useDeleteProjectMutation();
  const deleteProject = async (id) => {
    setLoadingId(id);
    try {
      const res = await remove(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <Card className="w-full border-none shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Layers className="mr-2" /> Project Management
          </CardTitle>
          <CardDescription>
            Create, edit, and manage your portfolio projects
          </CardDescription>
        </div>

        <CustomDialog
          triggerText="Add Project"
          title="Add"
          component={<Plus className="mr-2" size={16} />}
        />
      </CardHeader>

      <CardContent>
        <div className="w-full">
          {data?.projects.map((project) => (
            <Card
              key={project._id}
              className="transition-all duration-300 border-2 border-transparent border-blue-200 hover:shadow-lg hover:border-blue-400"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {project.title}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-end gap-4">
                  <CustomDialog
                    component={<Edit className="mr-2" size={16} />}
                    triggerText="Edit"
                    title="Edit"
                    project={project}
                  />

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        isLoading={loadingId === project._id}
                        loadingText="Deleting..."
                        variant="destructive"
                      >
                        <Trash2 className="mr-2" size={16} /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="text-black bg-white rounded-lg">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this project?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="flex justify-center px-3 py-2 shadow-sm rounded-[4px] items-center bg-blue-500/80  hover:bg-blue-500/60 hover:text-white  text-white ">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="flex justify-center px-3 py-2 shadow-sm rounded-[4px] items-center bg-red-500/80  hover:bg-red-500/60 text-white "
                          onClick={() => deleteProject(project._id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

const CustomDialog = ({ component, project, triggerText, title }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={title === "Add" ? "outline" : "default"}>
          {component} <span className="hidden sm:block">{triggerText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="container bg-white">
        <DialogTitle>{title} Project</DialogTitle>
        <ProjectCustomForm title={title} project={project} />
      </DialogContent>
    </Dialog>
  );
};
