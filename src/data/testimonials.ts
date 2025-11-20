import { Testimonial } from "../types/testimonials";

export const testimonials: Testimonial[] = [
  {
    id: "exxcellent-hk",
    content:
      "Working with you on this project was a truly positive experience for us. You did a fantastic job as team leader, managing the team effectively, clearly assigning tasks, and ensuring smooth collaboration. Your dedication to the app's design was especially impressive – you put in a lot of effort and creativity to make it user-friendly, visually appealing, and well-structured. The collaboration between you, and the company was consistently professional, efficient, and constructive throughout the entire process. Thank you again for your valuable engagement and the great collaboration.",
    author: "H.K.",
    company: "Exxcellent Solutions",
  },
  {
    id: "hymate-hn",
    content:
      "Julia was very quick to pickup the project and contribute. Our codebase is huge and very business logic intensive, even so it was no problem for her take tickets and solve them at a high standard in little time.  She also went beyond expected by giving suggestions and ideas that incremented the original desired output without increasing development time.  The team was always very satisfied with her work. Communication was always clear and transparent between us in a respectful manner.   Thank you very much for all your contributions and good luck in the future Julia!",
    author: "H.N.",
    company: "Hymate",
  },
  {
    id: "app4it-ms",
    content:
      "Julia is a fantastic colleague and an excellent project manager. Her code is consistently clean and well-structured, and she's a pleasure to collaborate with. Her eye for detail makes her outstanding at QA, and she always ensures the highest standards are met. I would be glad to work with her again anytime",
    author: "M. S.",
    company: "App4it",
  },
];

export const getTestimonialById = (id: string): Testimonial | undefined => {
  return testimonials.find((testimonial) => testimonial.id === id);
};

export const getTestimonialsByCompany = (
  company: string,
): Testimonial[] => {
  return testimonials.filter(
    (testimonial) =>
      testimonial.company.toLowerCase() === company.toLowerCase(),
  );
};

