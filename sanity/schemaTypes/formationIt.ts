import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Schéma Sanity — Formation IT
 * Modélise une formation du catalogue IT d'Avenir Conseil.
 * Le dataset correspondant est exporté dans ../formations-it.ndjson
 */
export const formationIt = defineType({
  name: 'formationIt',
  title: 'Formation IT',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Intitulé', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}}),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          'Développement Web',
          'Cloud & DevOps',
          'Cybersécurité',
          'Data, IA & Analytics',
          'Réseaux & Systèmes',
          'Gestion de projet & Agile',
        ],
      },
    }),
    defineField({name: 'categoryColor', title: 'Couleur catégorie', type: 'string'}),
    defineField({
      name: 'level',
      title: 'Niveau',
      type: 'string',
      options: {list: ['Débutant', 'Intermédiaire', 'Avancé']},
    }),
    defineField({name: 'durationDays', title: 'Durée (jours)', type: 'number'}),
    defineField({name: 'durationHours', title: 'Durée (heures)', type: 'number'}),
    defineField({name: 'price', title: 'Tarif (indicatif)', type: 'string'}),
    defineField({name: 'isNew', title: 'Nouveau', type: 'boolean', initialValue: true}),
    defineField({name: 'summary', title: 'Résumé', type: 'text', rows: 3}),
    defineField({name: 'objectives', title: 'Objectifs', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'audience', title: 'Public concerné', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'prerequisites', title: 'Prérequis', type: 'array', of: [{type: 'string'}]}),
    defineField({
      name: 'program',
      title: 'Programme',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'module',
          fields: [
            {name: 'module', title: 'Module', type: 'string'},
            {name: 'items', title: 'Points abordés', type: 'array', of: [{type: 'string'}]},
          ],
        }),
      ],
    }),
    defineField({name: 'tools', title: 'Outils', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'order', title: 'Ordre', type: 'number'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category'},
  },
})
