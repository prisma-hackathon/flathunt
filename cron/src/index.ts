import { Photon } from '@generated/photon'
// import { OAuth } from 'oauth'
const Xray = require('x-ray')
const x = Xray()

const photon = new Photon()

type ListResult = {
  id: string
  title: string
  coldRent: string
  size: string
}

async function main() {
  const list: ListResult[] = await x(
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

    const data = {
      bathroom: parseInt(details.numBaths, 10) > 0,
      coldRent: parseFloat(el.coldRent.replace('.', '').replace(' €', '')),
      size: parseFloat(el.size.replace(' m²', '')),
      heating: details.heatingType === 'x',
      year: parseInt(details.year, 10),
    }

    await photon.flats.upsert({
      where: { immoId: el.id },
      update: data,
      create: { immoId: el.id, ...data },
    })
  }
}

main()
  .catch(e => console.log(e))
  .finally(() => photon.disconnect())
