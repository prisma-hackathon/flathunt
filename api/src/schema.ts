import { nexusPrismaPlugin } from 'nexus-prisma'
import { idArg, makeSchema, objectType, stringArg } from 'nexus'

const Flat = objectType({
  name: 'Flat',
  definition(t) {
    t.model.immoId()
    t.model.coldRent()
    t.float('warmRent', f => f.coldRent * 2)
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.flats()
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
