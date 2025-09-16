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
      // keep all other doc types
      ...S.documentTypeListItems().filter((i) => i.getId() !== 'exhibition'),
    ]);
