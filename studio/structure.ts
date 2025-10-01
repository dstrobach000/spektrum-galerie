import type {StructureResolver} from 'sanity/desk';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Výstavy')
        .schemaType('exhibition')
        .child(
          S.documentTypeList('exhibition')
            .title('Výstavy')
            .defaultOrdering([{ field: 'startDate', direction: 'desc' }]) // open newest-first
        ),
      // Single document types - editors can only edit existing documents
      S.listItem()
        .title('Kontakt')
        .schemaType('contact')
        .child(S.documentTypeList('contact').title('Kontakt')),
      S.listItem()
        .title('Připravujeme')
        .schemaType('upcomingExhibition')
        .child(S.documentTypeList('upcomingExhibition').title('Připravujeme')),
      S.listItem()
        .title('Ke stažení')
        .schemaType('press')
        .child(S.documentTypeList('press').title('Ke stažení')),
    ]);
