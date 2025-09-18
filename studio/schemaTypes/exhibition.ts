import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'exhibition',
  title: 'Výstavy',
  type: 'document',

  fields: [
    defineField({ name: 'title', title: 'Název výstavy', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'artist', title: 'Autor / kolektiv', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),

    defineField({ 
      name: 'isOneDayEvent', 
      title: 'Jednodenní event', 
      type: 'boolean',
      initialValue: false,
      description: 'Zaškrtněte, pokud se jedná o jednodenní akci'
    }),
    defineField({ 
      name: 'startDate', 
      title: 'Začátek', 
      type: 'date', 
      validation: (r) => r.required()
    }),
    defineField({ 
      name: 'endDate', 
      title: 'Konec', 
      type: 'date', 
      hidden: ({ document }) => Boolean(document?.isOneDayEvent)
    }),

    defineField({
      name: 'poster',
      title: 'Plakát / grafika',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'landscapeImages',
      title: 'Fotky (na šířku)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'portraitImages',
      title: 'Fotky (na výšku)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'landscapeVideos',
      title: 'Videa (na šířku)',
      type: 'array',
      of: [{ type: 'file', options: { accept: 'video/*' } }],
    }),
    defineField({
      name: 'portraitVideos',
      title: 'Videa (na výšku)',
      type: 'array',
      of: [{ type: 'file', options: { accept: 'video/*' } }],
    }),

    defineField({ name: 'intro', title: 'Intro', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'mainText', title: 'Hlavní text', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] }),

    defineField({
      name: 'namecard',
      title: 'Credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'name', title: 'Jméno', type: 'string' },
          ],
          preview: {
            select: {
              role: 'role',
              name: 'name'
            },
            prepare(selection) {
              const { role, name } = selection;
              return {
                title: `${role || 'Role'} • ${name || 'Jméno'}`,
                subtitle: 'Credit entry'
              };
            }
          }
        },
      ],
      options: {
        layout: 'list',
        sortable: true,
      }
    }),
  ],

  // --- Sorting choices shown in the middle column toolbar ---
  orderings: [
    {
      title: 'Podle začátku – nejnovější nahoře',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Podle začátku – nejstarší nahoře',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
    {
      title: 'Podle konce – nejnovější nahoře',
      name: 'endDateDesc',
      by: [{ field: 'endDate', direction: 'desc' }],
    },
    {
      title: 'Podle konce – nejstarší nahoře',
      name: 'endDateAsc',
      by: [{ field: 'endDate', direction: 'asc' }],
    },
  ],

  // --- Nice row preview: show artist + date range under the title ---
  preview: {
    select: {
      title: 'title',
      artist: 'artist',
      startDate: 'startDate',
      endDate: 'endDate',
      isOneDayEvent: 'isOneDayEvent',
      poster: 'poster.asset',
      firstLandscape: 'landscapeImages.0.asset',
      firstPortrait: 'portraitImages.0.asset',
    },
    prepare(sel) {
      const { title, artist, startDate, endDate, isOneDayEvent, poster, firstLandscape, firstPortrait } = sel as {
        title?: string;
        artist?: string;
        startDate?: string;
        endDate?: string;
        isOneDayEvent?: boolean;
        poster?: any;
        firstLandscape?: any;
        firstPortrait?: any;
      };

      const fmt = (d?: string) =>
        d
          ? new Date(d).toLocaleDateString('cs-CZ', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })
          : '';

      let dates = '';
      if (isOneDayEvent) {
        dates = startDate ? fmt(startDate) : '';
      } else {
        dates = startDate && endDate ? `${fmt(startDate)} – ${fmt(endDate)}` : startDate ? fmt(startDate) : '';
      }

      const subtitle = [artist, dates].filter(Boolean).join(' • ');
      const media = poster || firstLandscape || firstPortrait || undefined;

      return {
        title: title || 'Bez názvu',
        subtitle,
        media,
      };
    },
  },
});
