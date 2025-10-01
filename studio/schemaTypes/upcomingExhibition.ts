import type { Rule } from "sanity";

const upcomingExhibition = {
  name: "upcomingExhibition",
  title: "Připravujeme",
  type: "document",
  __experimental_actions: ['update', 'publish'], // Disable create and delete
  fields: [
    {
      name: "artist",
      title: "Vystavující",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "exhibition",
      title: "Název výstavy",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "startDate",
      title: "Od",
      type: "date",
      options: { dateFormat: "DD.MM.YY" },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "endDate",
      title: "Do",
      type: "date",
      options: { dateFormat: "DD.MM.YY" },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "vernissageDate",
      title: "Vernisáž",
      type: "datetime",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "link",
      title: "Odkaz",
      type: "url",
    },
  ],
};

export default upcomingExhibition;
