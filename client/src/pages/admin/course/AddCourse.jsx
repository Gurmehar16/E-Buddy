import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseTitle: "",
    subtitle: "",
    description: "",
    category: "",
    courseLevel: "",
    price: "",
  });

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const createCourseHandler = async () => {
    await createCourse(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully");
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to create course");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10 space-y-6">
      <div className="mb-6">
        <h1 className="font-bold text-2xl">Add detail information regarding course</h1>
        <p className="text-muted-foreground">
          Make changes to your courses here. Click save when you're done.
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information Section */}
        <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="font-semibold text-lg">Basic Course Information</h2>
          
          <div className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleChange}
                placeholder="e.g., HTML Fundamentals"
              />
            </div>
            
            <div>
              <Label>Subtitle</Label>
              <Input
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="e.g., Master HTML in 2 weeks"
              />
            </div>
            
            <div>
              <Label>Description</Label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                placeholder="Describe your course..."
              />
            </div>
          </div>
        </div>

        {/* Category & Level Section */}
        <div className="p-6 bg-white rounded-lg shadow-sm border space-y-4">
          <h2 className="font-semibold text-lg">Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Course Category</Label>
              <Select 
                onValueChange={(value) => setFormData({...formData, category: value})}
                value={formData.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Course Level</Label>
              <Select 
                onValueChange={(value) => setFormData({...formData, courseLevel: value})}
                value={formData.courseLevel}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="font-semibold text-lg mb-4">Price in (INR)</h2>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter course price"
            className="w-40"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/course")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={createCourseHandler}
            disabled={isLoading || !formData.courseTitle || !formData.category}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : "Create Course"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;