import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

  return (
    <div className="relative bg-gradient-to-r from-[hsl(var(--gradient-from))] to-[hsl(var(--gradient-to))] py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className=" text-4xl font-bold mb-4">
          Find the Best Courses for You
        </h1>
        <p className="  mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form onSubmit={searchHandler} className="flex items-center bg-white  rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900  placeholder-gray-400 "
          />
          <Button type="submit" className="bg-blue-600  text-white px-6 py-3 rounded-r-full hover:bg-blue-700">Search</Button>
        </form>
        <Button onClick={() => navigate(`/course/search?query`)} className="bg-white  text-blue-600 rounded-full hover:bg-gray-200">Explore Courses</Button>
      </div>
    </div>
  );
};

export default HeroSection;
