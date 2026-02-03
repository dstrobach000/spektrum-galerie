export default {
  name: "siteSettings",
  type: "document",
  title: "Nastavení webu",
  fields: [
    {
      name: "showCurrentButton",
      title: "Zobrazit tlačítko „Aktuální“ v menu",
      type: "boolean",
      initialValue: true,
      description: "Vypněte, pokud nechcete zobrazovat položku „Aktuální“ v menu.",
    },
    {
      name: "showCurrentLabel",
      title: "Zobrazit štítek „Aktuální“ na kartách",
      type: "boolean",
      initialValue: true,
      description: "Vypněte, pokud nechcete zobrazovat štítek „Aktuální“ na kartách výstav.",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Nastavení webu",
      };
    },
  },
};
