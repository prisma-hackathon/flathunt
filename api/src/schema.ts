import { nexusPrismaPlugin } from 'nexus-prisma'
import { idArg, makeSchema, objectType, stringArg } from 'nexus'

type rentClass = {
  number: number
  bathroom: boolean
  heating: boolean
  startYear: number
  endYear: number
  maxRent: number
}

const categories: rentClass[] = [
  {
    number: 1,
    bathroom: true,
    heating: true,
    startYear: 0,
    endYear: 1918,
    maxRent: 6.45,
  },
  {
    number: 2,
    bathroom: false,
    heating: true,
    startYear: 0,
    endYear: 1918,
    maxRent: 5.0,
  },
  {
    number: 2,
    bathroom: true,
    heating: false,
    startYear: 0,
    endYear: 1918,
    maxRent: 5.0,
  },
  {
    number: 3,
    bathroom: false,
    heating: false,
    startYear: 0,
    endYear: 1918,
    maxRent: 3.92,
  },
  {
    number: 4,
    bathroom: true,
    heating: true,
    startYear: 1919,
    endYear: 1949,
    maxRent: 6.27,
  },
  {
    number: 5,
    bathroom: true,
    heating: false,
    startYear: 1919,
    endYear: 1949,
    maxRent: 5.22,
  },

  {
    number: 5,
    bathroom: false,
    heating: true,
    startYear: 1919,
    endYear: 1949,
    maxRent: 5.22,
  },
  {
    number: 6,
    bathroom: false,
    heating: false,
    startYear: 1919,
    endYear: 1949,
    maxRent: 4.59,
  },
  {
    number: 7,
    bathroom: true,
    heating: true,
    startYear: 1950,
    endYear: 1964,
    maxRent: 6.08,
  },
  {
    number: 8,
    bathroom: false,
    heating: true,
    startYear: 1950,
    endYear: 1964,
    maxRent: 5.62,
  },
  {
    number: 8,
    bathroom: true,
    heating: false,
    startYear: 1950,
    endYear: 1964,
    maxRent: 5.62,
  },
  {
    number: 9,
    bathroom: true,
    heating: true,
    startYear: 1965,
    endYear: 1972,
    maxRent: 5.95,
  },
  {
    number: 10,
    bathroom: true,
    heating: true,
    startYear: 1973,
    endYear: 1990,
    maxRent: 6.04,
  },
  {
    number: 11,
    bathroom: true,
    heating: true,
    startYear: 1991,
    endYear: 2002,
    maxRent: 8.13,
  },
  {
    number: 12,
    bathroom: true,
    heating: true,
    startYear: 2003,
    endYear: 2013,
    maxRent: 9.8,
  },
]

const Flat = objectType({
  name: 'Flat',
  definition(t) {
    t.model.id()
    t.model.year()
    t.model.immoId()
    t.model.coldRent()
    t.model.pictureUrl()
    // t.float('warmRent', f => f.coldRent * 2)
    t.float('fairRent', f => {
      var filteredCategories = categories.filter(
        x =>
          x.heating == f.heating &&
          x.bathroom == f.bathroom &&
          x.startYear < f.year &&
          x.endYear >= f.year,
      )

      var fairrent =
        filteredCategories.length > 0
          ? filteredCategories[0].maxRent * f.size
          : f.coldRent
      console.log({ filteredCategories, id: f.id })
      return fairrent
    })
    // t.string('pictureUrl', { resolve: f => f.pictureUrl, nullable: true })
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('flats', {
      type: 'Flat',
      resolve: (root, args, ctx) =>
        ctx.photon.flats.findMany({ where: { year: { lte: 2016 } } }),
    })
  },
})

export const schema = makeSchema({
  types: [Query, Flat],
  plugins: [nexusPrismaPlugin()],
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
