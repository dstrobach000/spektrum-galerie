import type { Rule } from "sanity";

const upcomingExhibition = {
  name: "upcomingExhibition",
  title: "Upcoming Exhibition",
  type: "document",
  fields: [
    {
      name: "artist",
      title: "Artist",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "exhibition",
      title: "Exhibition Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      options: { dateFormat: "DD.MM.YY" },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      options: { dateFormat: "DD.MM.YY" },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "vernissageDate",
      title: "Vernisáž (Opening)",
      type: "datetime",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "link",
      title: "Link (optional)",
      type: "url",
    },
  ],
};

export default upcomingExhibition;
