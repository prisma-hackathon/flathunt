import { Photon } from '@generated/photon'
// import { OAuth } from 'oauth'
const Xray = require('x-ray')
const x = Xray()

const photon = new Photon()

async function main() {
  // const oauth: any = new OAuth(
  //   'https://rest.immobilienscout24.de/restapi/security/oauth/request_token',
  //   'https://rest.immobilienscout24.de/restapi/security/oauth/access_token',
  //   'Prisma-Hackathon-SearchKey',
  //   'zsEDRsPmKuVrccPA',
  //   '1.0',
  //   null,
  //   'HMAC-SHA1',
  // )

  // oauth.get(
  //   'https://rest.immobilienscout24.de/restapi/api/search/v1.0/search/radius?realestatetype=ApartmentRent&geocoordinates=52.512303;13.431191;1',
  //   '',
  //   'zsEDRsPmKuVrccPA',
  //   (r: any) => {
  //     console.log(r)
  //   },
  // )

  type El = {
    id: string
    title: string
    coldRent: string
    size: string
  }

  const list: El[] = await x(
    'https://www.immobilienscout24.de/Suche/S-T/Wohnung-Miete/Berlin/Berlin/Mitte-Mitte?enteredFrom=one_step_search',
    '.result-list__listing',
    [
      {
        id: '.result-list-entry__brand-title-container@data-go-to-expose-id',
        title: '.result-list-entry__brand-title',
        coldRent: '.result-list-entry__primary-criterion dd',
        size: '.result-list-entry__primary-criterion:nth-child(2) dd',
      },
    ],
  )

  for (const el of list.slice(0, 3)) {
    const [details] = await x(
      `https://www.immobilienscout24.de/expose/${el.id}`,
      '#is24-content',
      [
        {
          year: '.is24qa-baujahr',
          numBaths: '.is24qa-badezimmer',
          heatingType: '.is24qa-heizungsart',
        },
      ],
    )
    console.log({ ...details, ...el })

    await photon.flats.create({
      data: {
        bathroom: parseInt(details.numBaths, 10) > 0,
        coldRent: parseFloat(el.coldRent.replace('.', '').replace(' €', '')),
        size: parseFloat(el.size.replace(' m²', '')),
        heating: details.heatingType === 'x',
        immoId: el.id,
        year: parseInt(details.year, 10),
      },
    })
  }

  // const result = await photon.flats.findMany()
  // console.log(result)
}

main()
  .catch(e => console.log(e))
  .finally(() => photon.disconnect())
