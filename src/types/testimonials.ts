export type Testimonial = {
  id: string;
  content: string;
  author: string;
  company: string;
  authorInitials?: string;
};

export type TestimonialsSectionProps = {
  testimonials: Testimonial[];
  title?: string;
};

