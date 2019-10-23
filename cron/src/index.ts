import { Photon } from '@generated/photon'
import { OAuth } from 'oauth'

const photon = new Photon()

async function main() {
  const oauth: any = new OAuth(
    'https://rest.immobilienscout24.de/restapi/security/oauth/request_token',
    'https://rest.immobilienscout24.de/restapi/security/oauth/access_token',
    'Prisma-Hackathon-SearchKey',
    'zsEDRsPmKuVrccPA',
    '1.0',
    null,
    'HMAC-SHA1',
  )

  oauth.get(
    'https://rest.immobilienscout24.de/restapi/api/search/v1.0/search/radius?realestatetype=ApartmentRent&geocoordinates=52.512303;13.431191;1',
    '',
    'zsEDRsPmKuVrccPA',
    (r: any) => {
      console.log(r)
    },
  )

  const result = await photon.flats.findMany()
  console.log(result)
}

main()
  .catch(e => console.log(e))
  .finally(() => photon.disconnect())
