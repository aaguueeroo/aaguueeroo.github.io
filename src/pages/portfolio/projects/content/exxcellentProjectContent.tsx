import { Box, Typography } from "@mui/material";
import ProjectFeaturesWideSection from "../../components/ProjectFeaturesWideSection";
import {
  ProjectFeaturesSectionContent,
  ProjectPageContent,
} from "../projectContentTypes";
import exxcellentHeroImage from "../../../../assets/images/portfolio/exxcellent/hero.png";
import exxcellentMealPlanningImage from "../../../../assets/images/portfolio/exxcellent/meal_planning.png";
import exxcellentMealListImage from "../../../../assets/images/portfolio/exxcellent/meal_list.png";
import exxcellentMealChoosingImage from "../../../../assets/images/portfolio/exxcellent/meal_choosing.png";
import exxcellentDishDetailsImage from "../../../../assets/images/portfolio/exxcellent/dish_details.png";
import exxcellentPosterImage from "../../../../assets/images/portfolio/exxcellent/poster.png";

export const exxcellentProjectContent: ProjectPageContent = {
  slug: "exxcellent-meal-management",
  seo: {
    title: "Meal Management System - Julia's Portfolio",
    description:
      "Internal mobile app for Exxcellent employees to choose meals and chefs to plan meals, reducing food waste through efficient meal management.",
    image: exxcellentHeroImage,
  },
  hero: {
    coverImage: exxcellentHeroImage,
    coverImageAlt: "Exxcellent Meal Management System hero background",
    title: "Meal Management System",
    subtitle:
      "An internal mobile application that streamlines meal planning for company cafeterias, enabling chefs to plan meals and employees to select their preferences, reducing food waste through data-driven planning.",
    description:
      "The app connects chefs and employees in a workflow where chefs schedule meals and time slots, while employees choose from the menu in advance, allowing precise food preparation and minimizing waste.",
    technologies: ["Figma", "Flutter", "Firebase", "Python"],
    useLightColors: true,
  },
  description: {
    title: "Project Overview",
    paragraphs: [
      "The Exxcellent Meal Management System was developed as an internal application for Exxcellent company to optimize their cafeteria operations. The app addresses the challenge of meal planning and food waste by creating a direct communication channel between chefs and employees.",
      "Chefs can schedule meals for specific days and time slots, view employee selections in real-time, and adjust preparation quantities accordingly. Employees can browse available meals, see allergen information, select their preferred options, and communicate directly with the chef through comments.",
    ],
    bulletPoints: [
      "Real-time meal planning and scheduling for chefs",
      "Employee meal selection with allergen information",
      "Waste reduction through accurate attendance prediction",
      "Direct communication between chefs and employees",
      "Meal rating and feedback system",
      "Flexible scheduling with week and day views",
    ],
  },
  renderFeaturesSection: ({ onOpenImageModal }) => (
    <ProjectFeaturesWideSection
      features={exxcellentFeaturesSection}
      onFeatureImageClick={onOpenImageModal}
    />
  ),
  technologies: {
    title: "Technology Highlights",
    technologies: [
      {
        name: "Flutter",
        category: "Frontend",
        description:
          "Cross-platform mobile application built with Flutter and Provider for state management, delivering a native experience on both iOS and Android.",
        chips: ["Provider"],
        color: "#1976D2",
      },
      {
        name: "Python",
        category: "Backend",
        description:
          "Backend services and APIs built with Python to handle business logic, data processing, and integration with Firebase services.",
        chips: [],
        color: "#3776AB",
      },
      {
        name: "Firebase",
        category: "Backend",
        description:
          "Firebase Firestore for NoSQL database storage, Firebase Authentication for secure user management, and real-time data synchronization between chefs and employees.",
        chips: ["Firestore", "Auth", "NoSQL"],
        color: "#FFCA28",
      },
      {
        name: "Figma",
        category: "Design",
        description:
          "User interface and user experience design created in Figma, ensuring an intuitive and accessible experience for both chefs and employees.",
        chips: ["Autolayout"],
        color: "#F24E1E",
      },
    ],
  },
  renderExtraSection: () => (
    <Box component="section" sx={{ mb: 16 }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: "center",
          fontSize: { xs: "1.9rem", md: "2.4rem" },
        }}
      >
        Project Overview
      </Typography>
      <Box
        sx={{
          width: "100%",
          borderRadius: 0.5,
          overflow: "hidden",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          component="img"
          src={exxcellentPosterImage}
          alt="Exxcellent Meal Management System project overview poster"
          sx={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </Box>
    </Box>
  ),
  cta: {
    title: "Interested in building something similar?",
    buttonText: "Start your project",
    buttonHref: "/quote",
  },
};

const exxcellentFeaturesSection: ProjectFeaturesSectionContent = {
  title: "Key Features",
  features: [
    {
      id: "meal-planning",
      title: "Meal Planning",
      description:
        "The chef interface provides flexible meal planning with week and day views. Chefs can schedule specific days and time slots for meals, then add meal options to each slot. The preview view shows real-time employee selections, attendance counts per time slot, and messages from employees, enabling precise food preparation planning.",
      image: exxcellentMealPlanningImage,
      imageAlt: "Exxcellent meal planning interface showing edit and preview views",
    },
    {
      id: "meal-list",
      title: "List of Meals",
      description:
        "Both employees and chefs can view the meal list, with chefs having editing capabilities. The interface supports two layouts: a square grid view focusing on meal images for quick browsing, and a detailed list view emphasizing descriptions. Employees can see allergen information through icons and mark dishes as liked, which helps chefs understand preferences. Chefs can create or edit dishes, adding name, food type, description, allergens, and ingredients, with the option to take photos or generate images using AI.",
      image: exxcellentMealListImage,
      imageAlt: "Exxcellent meal list showing different layouts and editing capabilities",
    },
    {
      id: "meal-choosing",
      title: "Meal Choosing",
      description:
        "Employees can browse available meals organized by weeks and days, selecting one meal per day along with their preferred time slot. The interface displays attendance counts for each time slot, helping employees make informed decisions. Employees can also add comments for the chef directly from this view, facilitating communication about dietary needs or preferences.",
      image: exxcellentMealChoosingImage,
      imageAlt: "Exxcellent meal choosing interface for employees",
    },
    {
      id: "dish-details",
      title: "Details of the Dishes",
      description:
        "The dish details view is accessible to both chefs and employees, providing comprehensive information about each meal. It includes detailed descriptions, allergen information displayed with both icons and text, ingredients lists, and meal ratings. Users can like or dislike dishes from this view, contributing to the feedback system that helps chefs plan future menus based on employee preferences.",
      image: exxcellentDishDetailsImage,
      imageAlt: "Exxcellent dish details view with allergen information and ratings",
    },
  ],
};

