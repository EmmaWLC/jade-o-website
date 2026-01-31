import { defineField, defineType } from 'sanity'

export const translationType = defineType({
  name: 'translation',
  title: 'Global Dictionary',
  type: 'document',
  fields: [
    defineField({
      name: 'label_year',
      title: 'Label Year',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'label_location',
      title: 'Label Location',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'label_type',
      title: 'Label Type',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'label_status',
      title: 'Label Status',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'label_surface',
      title: 'Label Surface',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'label_client',
      title: 'Label Client',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'label_collaborators',
      title: 'Label Collaborator(s)',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'label_design_team',
      title: 'Label Design team',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'label_design_awards',
      title: 'Label Awards',
      type: 'internationalizedArrayString',
    }),
    
  ],
  preview: {
    select: {
      title: 'label_year', 
    },
    prepare() {
      return {
        title: 'Global Labels',
      };
    },
  },
})