import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Helmet } from "react-helmet"

const query = graphql`
{
  allStrapiWorks {
    edges {
      node {
        strapiId
        name
        description
        image {
          childImageSharp {
            fixed(width: 200, height: 125) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
}
`

export default function Home() {
  return (
    <div>
      <Helmet
        meta={[
          { name: 'charSet', content: 'utf-8' },
        ]}>
        <title>Portfolio</title>
        <link rel="canonical" href="https://portfolio.acrux.jp/" />
        <html lang="ja" />
      </Helmet>
      <h1>Portfolio</h1>
      <StaticQuery
        query={query}
        render={data => (
          <div style={{
            'max-width': '480px'
          }}>
            {data.allStrapiWorks.edges.map(work => (
              <div
                key={work.node.strapiId}
                style={{
                  display: 'flex',
                  'flex-direction': 'column',
                  padding: '1em',
                  'box-shadow': '3px 3px 3px 3px hsla(0, 0%, 0%, 0.2)'
                }}
              >
                <div>
                  {work.node.name}
                </div>
                <div>
                  {work.node.description}
                </div>
                <Img
                  fixed={work.node.image.childImageSharp.fixed}
                />
              </div>
            ))}
          </div>
        )}
      />
    </div>
  )
}
