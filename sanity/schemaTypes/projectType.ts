import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const projectType = defineType({
    name: 'project',
    title: 'Projects',
    type: 'document',
    icon: DocumentIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Project Name',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL Keyword)',
            type: 'slug',
            options: {
                source: (doc: any) => {
                    const enTitle = doc.title?.find((t: any) => t._key === 'en')?.value
                    const zhTitle = doc.title?.find((t: any) => t._key === 'zh')?.value
                    return enTitle || zhTitle || ''
                },
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Year Value',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location Label',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'usage_reference',
            title: 'Usage Label (Linked)',
            type: 'reference',
            to: [{ type: 'usage' }], 
            description: 'Please select a default usage label.'
        }),
        defineField({
            name: 'status_reference',
            title: 'Status Label (Linked)',
            type: 'reference',
            to: [{ type: 'status' }],
            description: 'Please select a default status label.'
        }),
        defineField({
            name: 'surface',
            title: 'Surface',
            type: 'number',
        }),
        defineField({
            name: 'client_reference',
            title: 'Client Label (Linked)',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'client' }],
                    options: {
                        disableDuplicates: true
                    }
                }
            ],
            description: 'Please select a default client label.'
        }),
        defineField({
            name: 'collaborators_reference',
            title: 'Collaborators Label (Linked)',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'collaborators' }],
                    options: {
                        disableDuplicates: true
                    }
                }
            ],
            description: 'Please enter a collaborator name.'
        }),
        defineField({
            name: 'designteam_reference',
            title: 'Design Team Label (Linked)',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'designTeam' }],
                    options: {
                        disableDuplicates: true
                    }
                }
            ],
            description: 'Please enter a designer name'
        }),
        defineField({
            name: 'content',
            title: 'Detailed Content',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'renderImages',
            title: 'Project Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'floorPlanImages',
            title: 'Floor Plan Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'awards_reference',
            title: 'Awards Label (Linked)',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'awards' }],
                    options: {
                        disableDuplicates: true
                    }
                }
            ],
            description: 'Please select a award label.'
        }),
    ],
    preview: {
        select: {
            allTitles: 'title',
            year: 'year',
            media: 'renderImages.0',
        },
        prepare({ allTitles, year, media }) {
            // 挑選要在後台清單顯示的語言名稱
            const zhTitle = allTitles?.find((t: any) => t._key === 'zh')?.value
            const enTitle = allTitles?.find((t: any) => t._key === 'en')?.value

            return {
                title: enTitle || zhTitle || 'Untitled Project',
                subtitle: year ? `Year: ${year}` : 'No year set',
                media: media,
            }
        },
    },
})