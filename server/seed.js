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
      {
        name: "Samiksha Gupta",
        avatar: "https://i.pravatar.cc/100?img=8",
        email: "samiksha@example.com",
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
            section_name: "Introduction to React",
            lectures: [
              {
                id: 1,
                name: "What is React?",
                description: "Introduction to the React library and its ecosystem.",
                is_demo: true,
              },
              {
                id: 2,
                name: "JSX and Components",
                description: "Building UI with JSX and understanding components.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Core Concepts",
            lectures: [
              {
                id: 3,
                name: "State and Props",
                description: "Understanding data flow in React using state and props.",
                is_demo: true,
              },
              {
                id: 4,
                name: "Handling Events",
                description: "Handling user interactions and events in React.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "React Router",
            lectures: [
              {
                id: 5,
                name: "Routing in React",
                description: "Navigating between pages using React Router.",
                is_demo: true,
              },
              {
                id: 6,
                name: "Nested Routes and Params",
                description: "Implementing nested routes and working with route parameters.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "React Hooks",
            lectures: [
              {
                id: 7,
                name: "useState and useEffect",
                description: "Using basic hooks to manage state and side effects.",
                is_demo: false,
              },
              {
                id: 8,
                name: "Custom Hooks",
                description: "Creating reusable hooks in your application.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Project and Deployment",
            lectures: [
              {
                id: 9,
                name: "Building a Mini Project",
                description: "Apply your knowledge in a hands-on project.",
                is_demo: false,
              },
              {
                id: 10,
                name: "Deploying React App",
                description: "How to deploy a React application using Vercel or Netlify.",
                is_demo: true,
              },
            ],
          },
        ],
      },
      {
        courseTitle: "JavaScript - The Complete Guide",
        description: "Master JavaScript from fundamentals to advanced concepts like closures and async programming.",
        courseThumbnail: "https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1920,q_auto",
        creator: creators[2]._id,
        category: ["javascript", "frontend development"],
        courseLevel: "Medium",
        coursePrice: 199,
        isPublished: true,
        lectures: [
          {
            section_name: "JavaScript Basics",
            lectures: [
              {
                id: 1,
                name: "Variables and Data Types",
                description: "Learn about var, let, const and different data types.",
                is_demo: true,
              },
              {
                id: 2,
                name: "Functions",
                description: "Writing reusable code blocks and function declarations vs expressions.",
                is_demo: false,
              },
              {
                id: 3,
                name: "Control Flow",
                description: "If statements, loops, and logical operators in JavaScript.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Intermediate JavaScript",
            lectures: [
              {
                id: 4,
                name: "Arrays and Objects",
                description: "Working with data collections in JavaScript.",
                is_demo: false,
              },
              {
                id: 5,
                name: "DOM Manipulation",
                description: "Interacting with the web page using JavaScript.",
                is_demo: true,
              },
            ],
          },
          {
            section_name: "Advanced JavaScript",
            lectures: [
              {
                id: 6,
                name: "Closures",
                description: "Understand closures and lexical scope in-depth.",
                is_demo: false,
              },
              {
                id: 7,
                name: "Async JavaScript",
                description: "Master callbacks, promises, and async/await.",
                is_demo: false,
              },
              {
                id: 8,
                name: "JavaScript Modules",
                description: "How to structure and import/export modules in JS.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Project and Deployment",
            lectures: [
              {
                id: 9,
                name: "JavaScript Mini Project",
                description: "Build a small interactive app using what you've learned.",
                is_demo: false,
              },
              {
                id: 10,
                name: "Hosting with GitHub Pages",
                description: "Deploy your static JS project using GitHub Pages.",
                is_demo: true,
              },
            ],
          },
        ],
      },      
      {
        courseTitle: "Backend Development with Node.js",
        description: "Learn backend development by building robust APIs using Node.js, Express.js, and MongoDB.",
        courseThumbnail: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220517005132/Why-to-Use-NodeJS-for-Backend-Development.jpg",
        creator: creators[3]._id,
        category: ["backend development", "fullstack development"],
        courseLevel: "Medium",
        coursePrice: 199,
        isPublished: true,
        lectures: [
          {
            section_name: "Backend Fundamentals",
            lectures: [
              {
                id: 1,
                name: "What is Backend?",
                description: "Understanding server-side logic and architecture.",
                is_demo: true,
              },
              {
                id: 2,
                name: "HTTP & REST APIs",
                description: "How the web communicates using HTTP and RESTful architecture.",
                is_demo: false,
              },
              {
                id: 3,
                name: "Node.js Basics",
                description: "Installing Node, understanding the event loop and core modules.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Building with Express.js",
            lectures: [
              {
                id: 4,
                name: "Intro to Express.js",
                description: "Create a basic Express server and handle routing.",
                is_demo: true,
              },
              {
                id: 5,
                name: "Middleware and Routing",
                description: "Use middleware and modularize your app routes.",
                is_demo: false,
              },
              {
                id: 6,
                name: "RESTful API Development",
                description: "Build robust REST APIs using Express.js.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Database Integration",
            lectures: [
              {
                id: 7,
                name: "MongoDB and Mongoose",
                description: "Connect your backend with MongoDB using Mongoose.",
                is_demo: false,
              },
              {
                id: 8,
                name: "CRUD Operations",
                description: "Implement Create, Read, Update, Delete operations in MongoDB.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Project and Deployment",
            lectures: [
              {
                id: 9,
                name: "Build a REST API Project",
                description: "Develop a mini RESTful API using Express and MongoDB.",
                is_demo: false,
              },
              {
                id: 10,
                name: "Deploying to Render",
                description: "Deploy your Node.js API to Render or another cloud service.",
                is_demo: true,
              },
            ],
          },
        ],
      },      
      {
        courseTitle: "Python for Everybody",
        description: "Learn Python from scratch with hands-on examples, practical exercises, and beginner-friendly projects.",
        courseThumbnail: "https://www.aruviinstituteoflearning.com/Style/images/Python-image.jpg",
        creator: creators[1]._id,
        category: ["data science", "python"],
        courseLevel: "Beginner",
        coursePrice: 99,
        isPublished: true,
        lectures: [
          {
            section_name: "Getting Started with Python",
            lectures: [
              {
                id: 1,
                name: "Installing Python",
                description: "Setting up Python and configuring your environment.",
                is_demo: true,
              },
              {
                id: 2,
                name: "First Python Script",
                description: "Writing and running your first Python program.",
                is_demo: true,
              },
              {
                id: 3,
                name: "Python Syntax Basics",
                description: "Understanding indentation, variables, and input/output.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Working with Data",
            lectures: [
              {
                id: 4,
                name: "Lists and Dictionaries",
                description: "How to store and retrieve structured data in Python.",
                is_demo: false,
              },
              {
                id: 5,
                name: "Loops and Conditionals",
                description: "Using `for`, `while`, and `if` statements effectively.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Functions and Modules",
            lectures: [
              {
                id: 6,
                name: "Defining Functions",
                description: "How to write reusable functions and use arguments/return values.",
                is_demo: false,
              },
              {
                id: 7,
                name: "Importing and Using Modules",
                description: "Working with Python's built-in libraries.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Project and Final Application",
            lectures: [
              {
                id: 8,
                name: "Mini Project: Student Grade Calculator",
                description: "Build a CLI tool to compute average grades and give feedback.",
                is_demo: true,
              },
              {
                id: 9,
                name: "Course Recap and Next Steps",
                description: "Summarize what you've learned and explore advanced paths.",
                is_demo: false,
              },
            ],
          },
        ],
      },      
      {
        courseTitle: "Docker for Developers",
        description: "Learn how to use Docker to containerize applications, manage images and containers, and deploy scalable systems.",
        courseThumbnail: "https://miro.medium.com/v2/resize:fit:1400/0*tn-WMY-zDAQX8x0t.png",
        creator: creators[2]._id,
        category: ["docker", "backend development"],
        courseLevel: "Advance",
        coursePrice: 299,
        isPublished: true,
        lectures: [
          {
            section_name: "Introduction to Docker",
            lectures: [
              {
                id: 1,
                name: "What is Docker?",
                description: "Why developers use Docker and how it fits into modern DevOps.",
                is_demo: true,
              },
              {
                id: 2,
                name: "Installing Docker",
                description: "How to install Docker on Windows, macOS, and Linux.",
                is_demo: false,
              },
              {
                id: 3,
                name: "Understanding Containers vs. VMs",
                description: "Differences between containers and virtual machines.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Core Docker Concepts",
            lectures: [
              {
                id: 4,
                name: "Images and Containers",
                description: "Understanding how Docker images are built and containers are run.",
                is_demo: false,
              },
              {
                id: 5,
                name: "Docker CLI Essentials",
                description: "Learning essential Docker commands to manage containers.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Building and Sharing Images",
            lectures: [
              {
                id: 6,
                name: "Dockerfile Explained",
                description: "Creating your own Docker images using Dockerfile.",
                is_demo: false,
              },
              {
                id: 7,
                name: "Pushing to Docker Hub",
                description: "How to tag and push your images to Docker Hub.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Advanced Usage and Deployment",
            lectures: [
              {
                id: 8,
                name: "Docker Compose",
                description: "Managing multi-container applications with Docker Compose.",
                is_demo: true,
              },
              {
                id: 9,
                name: "Deploying a Node.js App with Docker",
                description: "End-to-end deployment of a backend app using Docker.",
                is_demo: false,
              },
            ],
          },
        ],
      },      
      {
        courseTitle: "MongoDB Essentials",
        description: "Master NoSQL databases using MongoDB, learn data modeling, aggregation, and integrate with backend apps.",
        courseThumbnail: "https://cdn.shopaccino.com/igmguru/products/mongo-db-xl2-435424047415284_m.jpg?v=531",
        creator: creators[0]._id,
        category: ["mongodb", "backend development"],
        courseLevel: "Medium",
        coursePrice: 199,
        isPublished: true,
        lectures: [
          {
            section_name: "Getting Started with MongoDB",
            lectures: [
              {
                id: 1,
                name: "What is MongoDB?",
                description: "Understanding NoSQL databases and how MongoDB differs from traditional RDBMS.",
                is_demo: true,
              },
              {
                id: 2,
                name: "Installing MongoDB Locally",
                description: "Running MongoDB on Windows, macOS, and Linux environments.",
                is_demo: false,
              },
              {
                id: 3,
                name: "MongoDB Shell vs Compass",
                description: "Using the MongoDB shell and GUI tool effectively.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Core MongoDB Operations",
            lectures: [
              {
                id: 4,
                name: "CRUD Operations",
                description: "Performing Create, Read, Update, and Delete in MongoDB.",
                is_demo: false,
              },
              {
                id: 5,
                name: "Schema Design and Data Modeling",
                description: "Designing efficient NoSQL schemas for real-world apps.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Advanced MongoDB Features",
            lectures: [
              {
                id: 6,
                name: "Indexes in MongoDB",
                description: "Improving performance with indexes.",
                is_demo: false,
              },
              {
                id: 7,
                name: "Aggregation Framework",
                description: "Using pipelines to analyze and transform data.",
                is_demo: true,
              },
            ],
          },
          {
            section_name: "Real-World Integration",
            lectures: [
              {
                id: 8,
                name: "Connecting MongoDB with Node.js",
                description: "How to use MongoDB in backend apps using Mongoose.",
                is_demo: false,
              },
              {
                id: 9,
                name: "Deploying MongoDB Atlas",
                description: "Cloud-hosted MongoDB and using it in production.",
                is_demo: false,
              },
            ],
          },
        ],
      },      
      {
        courseTitle: "Data Science",
        description: "Become a data scientist by mastering Python, machine learning, and hands-on projects using real-world datasets.",
        courseThumbnail: "https://media.assettype.com/analyticsinsight%2F2024-07%2Fafccd6ac-6bc3-4872-954a-82710c8b0ca3%2FTop_10_Best_and_Free_Data_Science_Certification_Courses_2019_2.png",
        creator: creators[3]._id,
        category: ["data science", "python"],
        courseLevel: "Medium",
        coursePrice: 199,
        isPublished: true,
        lectures: [
          {
            section_name: "Introduction to Data Science",
            lectures: [
              {
                id: 1,
                name: "What is Data Science?",
                description: "Overview of the data science field, roles, and applications.",
                is_demo: true,
              },
              {
                id: 2,
                name: "Setting up Python Environment",
                description: "Installing Python, Jupyter Notebook, and key libraries like Pandas and Numpy.",
                is_demo: false,
              },
              {
                id: 3,
                name: "Understanding Data Types and Structures",
                description: "DataFrames, Series, and essential operations.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Exploratory Data Analysis (EDA)",
            lectures: [
              {
                id: 4,
                name: "Importing and Cleaning Data",
                description: "Handling missing values, duplicates, and data formats.",
                is_demo: false,
              },
              {
                id: 5,
                name: "Data Visualization with Matplotlib and Seaborn",
                description: "Plotting graphs to understand patterns and relationships.",
                is_demo: true,
              },
            ],
          },
          {
            section_name: "Machine Learning Basics",
            lectures: [
              {
                id: 6,
                name: "Supervised vs Unsupervised Learning",
                description: "Key ML concepts and when to use them.",
                is_demo: false,
              },
              {
                id: 7,
                name: "Training a Linear Regression Model",
                description: "Building and evaluating a regression model.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Hands-On Projects",
            lectures: [
              {
                id: 8,
                name: "House Price Prediction",
                description: "Create a regression model to estimate house prices.",
                is_demo: false,
              },
              {
                id: 9,
                name: "Customer Segmentation",
                description: "Use clustering to identify customer types.",
                is_demo: false,
              },
            ],
          },
        ],
      },      
      {
        courseTitle: "Fullstack Development",
        description: "Become a fullstack developer by mastering Node.js, React, and MongoDB through practical projects and hands-on experience.",
        courseThumbnail: "https://ik.imagekit.io/mdzi40eohii/tsc/Full_Stack_Image_daa0e85929_mkCd6n2su.png?tr=ar-16-9,w-3840,q-75",
        creator: creators[0]._id,
        category: ["frontend development", "backend development", "mern stack development"],
        courseLevel: "Advance",
        coursePrice: 299,
        isPublished: true,
        lectures: [
          {
            section_name: "Introduction to Fullstack Development",
            lectures: [
              {
                id: 1,
                name: "What is Fullstack?",
                description: "Overview of fullstack development and the role of a fullstack developer.",
                is_demo: true,
              },
              {
                id: 2,
                name: "Frontend vs Backend",
                description: "Understanding the differences, responsibilities, and technologies.",
                is_demo: false,
              },
              {
                id: 3,
                name: "Overview of the MERN Stack",
                description: "Intro to MongoDB, Express, React, and Node.js.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Frontend with React",
            lectures: [
              {
                id: 4,
                name: "Creating React Components",
                description: "Building UI with functional and class components.",
                is_demo: true,
              },
              {
                id: 5,
                name: "Using React Hooks",
                description: "State management with useState and useEffect.",
                is_demo: false,
              },
              {
                id: 6,
                name: "Routing with React Router",
                description: "Navigating pages in your React app.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Backend with Node.js and Express",
            lectures: [
              {
                id: 7,
                name: "Setting Up Express Server",
                description: "Creating your first API endpoint.",
                is_demo: false,
              },
              {
                id: 8,
                name: "Middleware and Routing",
                description: "Handling requests and responses efficiently.",
                is_demo: false,
              },
              {
                id: 9,
                name: "Connecting MongoDB with Mongoose",
                description: "Schema design and CRUD operations.",
                is_demo: false,
              },
            ],
          },
          {
            section_name: "Integration & Deployment",
            lectures: [
              {
                id: 10,
                name: "Connecting Frontend and Backend",
                description: "Making API calls from React to Express.",
                is_demo: false,
              },
              {
                id: 11,
                name: "Deploying Fullstack App",
                description: "Deploying using platforms like Vercel and Render.",
                is_demo: true,
              },
            ],
          },
        ],
      },      
      {
        courseTitle: "MERN Stack Crash Course",
        description: "Build complete MERN stack apps with real-world projects.",
        courseThumbnail: "https://www.developerguru.in/images/courses/mern_stack.gif",
        creator: creators[2]._id,
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