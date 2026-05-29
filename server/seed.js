import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Course from '../server/models/course.model.js';
import User from '../server/models/user.model.js';

dotenv.config();


const seedCourses = async () => {

  try {
    // Clean old data
    await User.deleteMany();
    await Course.deleteMany();

    // Step 1: Create dummy instructors
    const creators= await User.insertMany([
      {
        name: "Mehar Singh",
        avatar: "https://github.com/shadcn.png",
        email: "mehar@example.com",
        password: "password123"
      },
      {
        name: "Harsh Mehta",
        avatar: "https://i.pravatar.cc/100?img=5",
        email: "harsh@example.com",
        password: "password123"
      },
      {
        name: "Priya Sharma",
        avatar: "https://i.pravatar.cc/100?img=8",
        email: "priya@example.com",
        password: "password123"
      },
    ]);

    // Step 2: Create courses using instructor IDs
    const courses = [
      {
        courseTitle: "Next JS",
        description: "Learn advanced Next.js techniques for building scalable web apps.",
        courseThumbnail: "https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg",
        creator: creators[0]._id,
        category: ["nextjs","frontend development","fullstack development"],
        courseLevel: "Advance",
        coursePrice: 299,
        isPublished: true,
        lectures: [
          {
            section_name: "Introduction to Next.js",
            lectures: [
              {
                id: 1,
                name: "What is Next.js?",
                description: "Overview of the Next.js framework and its advantages.",
                is_demo: true,
              },
              {
                id: 2,
                name: "Setting Up the Environment",
                description: "Installing Node.js and setting up a Next.js project.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Routing and Pages",
            lectures: [
              {
                id: 3,
                name: "Pages and Routing Basics",
                description: "Learn how routing works in Next.js.",
                is_demo: true,
              },
              {
                id: 4,
                name: "Dynamic Routes",
                description: "Implement dynamic routes and understand how they work.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Data Fetching",
            lectures: [
              {
                id: 5,
                name: "getStaticProps and getServerSideProps",
                description: "Fetching data at build time and on server-side.",
                is_demo: false,
              },
              {
                id: 6,
                name: "API Routes in Next.js",
                description: "Building backend API routes inside a Next.js project.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Deployment",
            lectures: [
              {
                id: 7,
                name: "Deploying Next.js App on Vercel",
                description: "Step-by-step guide to deploy on Vercel platform.",
                is_demo: true,
              },
            ],
          },
        ],
      },      
      {
        courseTitle: "React JS For Beginners",
        description: "Start your journey with React JS by learning the fundamentals of components, state, props, and hooks.",
        courseThumbnail: "https://img-c.udemycdn.com/course/750x422/3321318_e77c_3.jpg",
        creator: creators[1]._id,
        category: ["frontend development"],
        courseLevel: "Beginner",
        coursePrice: 99,
        isPublished: true,
        lectures: [
          {
            section_name: "Introduction to React JS",
              lectures: [
                {
                  section_name: "React Basics",
                  lectures: [
                    { id: 1, name: "JSX and Components", description: "Building UI with JSX.", is_demo: true },
                    { id: 2, name: "State and Props", description: "Managing data flow.", is_demo: false },
                  ],
                },
                {
                  section_name: "React Router",
                  lectures: [
                    { id: 3, name: "Routing in React",
                      description: "Navigating between pages.",
                      is_demo: true 
                    },
                  ],
                },
              ],
          },
        ],
      },
      {
        courseTitle: "JavaScript - The Complete Guide",
        courseThumbnail: "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1920,q_auto",
        creator: creators[2]._id,
        category: ["javascript","frontend development"],
        courseLevel: "Medium",
        coursePrice: 199,
        isPublished: true,
        lectures: [
          {
            section_name: "JavaScript Basics",
            lectures: [
              { id: 1, name: "Variables and Data Types", description: "Learn about var, let, const.", is_demo: true },
              { id: 2, name: "Functions", description: "Writing reusable code blocks.", is_demo: false },
            ],
          },
          {
            section_name: "Advanced JavaScript",
            lectures: [
              { id: 3, name: "Closures", description: "Advanced concepts explained.", is_demo: false },
              { id: 4, name: "Async JS", description: "Promises and async/await.", is_demo: false },
            ],
          },
        ],
      },
      {
        courseTitle: "Backend Development with Node.js",
        description: "Learn backend API development using Node.js and Express.js.",
        courseThumbnail: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220517005132/Why-to-Use-NodeJS-for-Backend-Development.jpg",
        creator: creators[2]._id,
        category: ["backend development","fullstack development" ],
        courseLevel: "Medium",
        coursePrice: 199,
        isPublished: true,
        lectures: [
          {
            section_name: "Backend Fundamentals",
            lectures: [
              { id: 1, name: "What is Backend?", description: "Understanding server-side development.", is_demo: true },
              { id: 2, name: "HTTP & REST APIs", description: "Basics of API communication.", is_demo: false },
            ],
          },
          {
            section_name: "Express.js and APIs",
            lectures: [
              { id: 3, name: "Building RESTful APIs", description: "Practical API building with Express.js.", is_demo: false },
            ],
          },
        ],
      },
      
      {
        courseTitle: "Docker for Developers",
        description: "Learn how to use Docker to containerize and deploy applications.",
        courseThumbnail: "https://miro.medium.com/v2/resize:fit:1400/0*tn-WMY-zDAQX8x0t.png",
        creator: creators[2]._id,
        category: ["docker","backend development"],
        courseLevel: "Advance",
        coursePrice: 299,
        isPublished: true,
        lectures: [
          {
            section_name: "Introduction to Docker",
            lectures: [
              { id: 1, name: "What is Docker?", description: "Why developers use Docker.", is_demo: true },
              { id: 2, name: "Docker Installation", description: "Setting up Docker on your machine.", is_demo: false },
            ],
          },
          {
            section_name: "Docker Commands",
            lectures: [
              { id: 3, name: "Common Docker Commands", description: "Running containers and images.", is_demo: false },
            ],
          },
        ],
      },
      
      {
        courseTitle: "Data Science ",
        description: "Become a data scientist with hands-on projects and real-world datasets.",
        courseThumbnail: "https://media.assettype.com/analyticsinsight%2F2024-07%2Fafccd6ac-6bc3-4872-954a-82710c8b0ca3%2FTop_10_Best_and_Free_Data_Science_Certification_Courses_2019_2.png",
        creator: creators[2]._id,
        category: ["data science","python"],
        courseLevel: "Medium",
        coursePrice: 199,
        isPublished: true,
        lectures: [
          {
            section_name: "Introduction to Data Science",
            lectures: [
              { id: 1, name: "What is Data Science?", description: "Overview of DS industry.", is_demo: true },
              { id: 2, name: "Setting up Python Environment", description: "Jupyter, Pandas, and more.", is_demo: false },
            ],
          },
          {
            section_name: "Projects",
            lectures: [
              { id: 3, name: "House Price Prediction", description: "Simple ML project.", is_demo: false },
            ],
          },
        ],
      },
      {
        courseTitle: "Fullstack Development ",
        description: "Become a fullstack developer with Node.js, React, and MongoDB.",
        courseThumbnail: "https://ik.imagekit.io/mdzi40eohii/tsc/Full_Stack_Image_daa0e85929_mkCd6n2su.png?tr=ar-16-9,w-3840,q-75",
        creator: creators[0]._id,
        category: ["frontend development","backend development","mern stack development"],
        courseLevel: "Advance",
        coursePrice: 299,
        isPublished: true,
        lectures: [
          {
            section_name: "Fullstack Basics",
            lectures: [
              { id: 1, name: "What is Fullstack?", description: "Introduction to fullstack development.", is_demo: true },
              { id: 2, name: "Frontend vs Backend", description: "Understanding the difference.", is_demo: false },
            ],
          },
          {
            section_name: "Building a Full App",
            lectures: [
              { id: 3, name: "Setup Project Structure", description: "Best practices.", is_demo: false },
              { id: 4, name: "Connecting Frontend and Backend", description: "Making them talk.", is_demo: false },
            ],
          },
        ],
      },
      {
        courseTitle: "MERN Stack Crash Course",
        description: "Build complete MERN stack apps with real-world projects.",
        courseThumbnail: "https://www.developerguru.in/images/courses/mern_stack.gif",
        creator: creators[1]._id,
        category: ["mongodb","backend development","mern stack development"],
        courseLevel: "Medium",
        coursePrice: 199,
        isPublished: true,
        lectures: [
          {
            section_name: "MongoDB Basics",
            lectures: [
              { id: 1, name: "Intro to MongoDB", description: "NoSQL database overview.", is_demo: true },
              { id: 2, name: "Mongoose Models", description: "Define your data.", is_demo: false },
            ],
          },
          {
            section_name: "Building MERN App",
            lectures: [
              { id: 3, name: "Authentication System", description: "Login, signup and more.", is_demo: false },
            ],
          },
        ],
      },

    ];

    await Course.insertMany(courses);

    console.log("🌱 Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed ❌", error);
    process.exit(1);
  }
};



export default seedCourses;