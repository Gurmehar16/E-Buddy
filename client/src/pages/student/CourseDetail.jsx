import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  const [openSection, setOpenSection] = useState(null);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  const toggleSection = (index) => {
    setOpenSection((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-lg">Course Sub-title</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Side */}
        <div className="w-full lg:w-2/3 space-y-5">
          {/* Description */}
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />

          {/* Course Curriculum */}
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>
                {course.lectures?.reduce((acc, section) => acc + section.lectures.length, 0)} lectures
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {course.lectures.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  {/* Section Header */}
                  <div
                    className="flex justify-between items-center cursor-pointer p-2 rounded"
                    onClick={() => toggleSection(idx)}
                  >
                    <h2 className="font-semibold text-lg">{section.section_name}</h2>
                    <span className="text-sm">
                      {openSection === idx ? "▲" : "▼"}
                    </span>
                  </div>

                  {/* Lectures (only if section is open) */}
                  {openSection === idx && (
                    <div className="space-y-1 p-2">
                      {section.lectures.length > 0 ? (
                        section.lectures.map((lecture) => (
                          <div key={lecture.id} className="flex items-center gap-3 text-sm">
                            <span>
                              {lecture.is_demo || purchased ? (
                                <PlayCircle size={16} />
                              ) : (
                                <Lock size={16} />
                              )}
                            </span>
                            <p>{lecture.name}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-xs">
                          No lectures available in this section.
                        </p>
                      )}
                    </div>
                  )}
                  <Separator />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              {/* Preview Player */}
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={course?.lectures[0]?.lectures[0]?.videoUrl}
                  controls={true}
                />
              </div>

              <h1 className="font-bold">
                {course?.lectures[0]?.lectures[0]?.name || "Lecture title"}
              </h1>

              <Separator className="my-2" />

              <h1 className="text-lg md:text-xl font-semibold">
                Course Price: ₹{course.coursePrice}
              </h1>
            </CardContent>

            {/* Footer Button */}
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;