import { Block } from "payload";

export const MyProjects: Block = {
  slug: "projectsBlock",
  labels: {
    plural: "Projects Block",
    singular: "Projects Block",
  },
  fields: [
    {
      name: "filterFeatured",
      type: "checkbox",
      label: "Only featured projects",
      required: true,
    },
  ],
  interfaceName: "MyProjectsBlock",
};
