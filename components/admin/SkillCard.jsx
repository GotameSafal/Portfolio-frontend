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
import { toast } from "react-toastify";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Code, Edit, Plus, Trash2, Layers } from "lucide-react";
import { useState } from "react";
import SkillCustomForm from "./SkillCustomForm";
import { useDeleteSkillMutation, useGetSkillsQuery } from "@redux/slices/api";
const SkillCard = () => {
  const [deleteSkill, { isLoading }] = useDeleteSkillMutation();
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
  const { data } = useGetSkillsQuery();
  const deleteHandler = async (item) => {
    try {
      const res = await deleteSkill(item).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err) {
      toast.error(err?.response?.message);
    }
  };
  return (
    <Card className="border-none shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Code className="mr-2" /> Skill Management
          </CardTitle>
          <CardDescription>
            Curate and showcase your professional skills
          </CardDescription>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-green-50 hover:bg-green-100"
            >
              <Plus className="mr-2" /> Add Skill
            </Button>
          </DialogTrigger>
          <SkillCustomForm />
        </Dialog>
      </CardHeader>

      <CardContent>
        <div className="w-full p-2">
          {data?.skills?.map((skill) => (
            <div className="">
              <h2 className="text-2xl font-semibold ">{skill?.skills}</h2>
              <ul className="px-4 py-1 space-y-1">
                {skill?.options?.map((item) => (
                  <Card className="w-full transition-all duration-300 border-2 border-transparent hover:shadow-lg hover:border-green-200">
                    <CardHeader className="flex flex-row items-center space-x-4">
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <CardTitle>{item.skill_name}</CardTitle>
                          <Badge variant="secondary" className="px-4">
                            {item.proficiency}
                          </Badge>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Edit />
                              </Button>
                            </DialogTrigger>
                            <SkillCustomForm
                              data={{ ...item, skills: skill?.skills }}
                              title="Edit"
                            />
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Skill?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove this skill?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                  <Button
                                    onClick={() =>
                                      deleteHandler({
                                        ...item,
                                        skills: skill?.skills,
                                      })
                                    }
                                    variant="destructive"
                                    size="sm"
                                  >
                                    Delete
                                  </Button>
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;

const obj = [
  {
    title: "Frontend Develop",
    options: [
      {
        skill_name: "Next.js",
        proficiency: "80%",
      },
    ],
  },
];
