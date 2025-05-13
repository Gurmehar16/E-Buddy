import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {Course} from '../models/course.model.js';
import { SessionsClient } from '@google-cloud/dialogflow'; // ✅ Correct import

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectId = 'nomadic-proton-458410-q8';

const sessionClient = new SessionsClient({
  keyFilename: path.resolve(__dirname, '../dialogflow-key.json'),
});

export const sendMessageToBot = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const sessionId = uuidv4();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId); // ✅ updated method name

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    res.status(200).json({
      reply: result.fulfillmentText,
    });
  } catch (error) {
    console.error('Dialogflow full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    res.status(500).json({ error: 'Dialogflow error occurred' });
  }
};

export const handleDialogflowWebhook = async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;

  let responseText = "I'm not sure how to help with that.";

  try {
    switch (intentName) {
      case 'course_recommendation': {
        const category = parameters['course_category'];
        const courses = await Course.find({
          category: new RegExp(category, 'i'),
          isPublished: true,
        }).limit(3);

        responseText = courses.length > 0
          ? `Top ${category} courses:\n` + courses.map(c => `• ${c.courseTitle}`).join('\n')
          : `Sorry, I couldn't find any ${category} courses right now.`;
        break;
      }

      case 'course_level_inquiry': {
        const level = parameters['level'];
        responseText = `You selected ${level} level. This level is great for learners who want to build foundational to intermediate skills.`;
        break;
      }

      case 'difficulty_level_info': {
        const difficulty = parameters['difficulty'];
        responseText = `Here are some great ${difficulty} level courses: React Essentials, JavaScript Advanced, and Python .`;
        break;
      }

      case 'enroll_in_course': {
        const courseCategory = parameters['course_category'];
        const level = parameters['level'];
        const enrollmentStatus = parameters['enrollment_status'];

        responseText = `You’re now enrolled in a ${level} level course on ${courseCategory}. Happy learning!`;
        break;
      }

      case 'course_category_info': {
        responseText = `We offer courses in Web Development, Data Science, Fullstack, Backend, Frontend, and more!`;
        break;
      }

      case 'payment_status_check': {
        const status = parameters['payment_status'];
        responseText = status === 'success'
          ? `Your payment was successful. Enjoy your course!`
          : `We couldn't confirm your payment. Please check and try again.`;
        break;
      }

      case 'user_type_info': {
        const userType = parameters['user_type'];
        responseText = userType === 'student'
          ? `Hello student! Browse through hundreds of curated courses for you.`
          : `Hello creator! Manage your courses and see insights in your dashboard.`;
        break;
      }

      default:
        responseText = "I'm still learning how to respond to that. Try asking about courses!";
    }

    return res.json({ fulfillmentText: responseText });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ fulfillmentText: "Something went wrong while processing your request." });
  }
};
