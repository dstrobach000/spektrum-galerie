export default {
  name: "contact",
  type: "document",
  title: "Kontakt",
  __experimental_actions: ['update', 'publish'], // Disable create and delete
  fields: [
    {
      name: "address",
      title: "Adresa",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "mapLink",
      title: "Odkaz na Google Maps",
      type: "url",
    },
    {
      name: "invoiceDetails",
      title: "Fakturační údaje",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "openingHours",
      title: "Otevírací doba",
      type: "text",
    },
    {
      name: "facebook",
      title: "Facebook",
      type: "url",
    },
    {
      name: "instagram",
      title: "Instagram",
      type: "url",
    },
    {
      name: "roles",
      title: "Role a kontakty",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Jméno" },
            { name: "role", type: "string", title: "Role" },
            { name: "email", type: "string", title: "E-mail" },
          ],
        },
      ],
    },
  ],

  preview: {
    prepare() {
      return {
        title: "Kontakty",
      };
    },
  },
};
