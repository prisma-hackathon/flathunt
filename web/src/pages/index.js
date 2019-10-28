import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    {data.immo.flats.map(flat => (
      <>
        <div>Real: {flat.coldRent}</div>
        <div>Fair: {flat.fairRent}</div>
        <div>
          <a href={`https://www.immobilienscout24.de/expose/${flat.immoId}`}>
            Link
          </a>
        </div>
        <img src={flat.pictureUrl} />
      </>
    ))}
  </Layout>
)

export default IndexPage

export const query = graphql`
  # query will go here
  query IndexQuery {
    immo {
      flats {
        immoId
        coldRent
        fairRent
        pictureUrl
      }
    }
  }
`
