import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import Img from 'gatsby-image';

import { NewsletterSimpleOverlay } from '../components/NewsletterForm';
import LogoGrid from '../components/LogoGrid';
import FullWidthSection from '../components/FullWidthSection';
import SplitSection from '../components/SplitSection';
import Layout from '../components/layout';
import {
  container,
  mediaQueries,
  weights,
  colors,
  jsBreakpoints,
  fonts,
} from '../styles';
import Button from '../components/Button';
import { GetInTouch, SeeInsights } from '../components/Prefooter';

const AcquiaEngage = ({ data }) => {
  const [isActive, setIsActive] = useState(false);
  const [exploreLink, setExploreLink] = useState(
    'https://engage.acquia.com/agenda'
  );
  const [joinLink, setJoinLink] = useState('https://engage.acquia.com/agenda');

  const getImageSrc = name =>
    data.allFile.edges.filter(({ node }) => name === node.name)[0].node
      .publicURL;

  const { node } = data.allAcquiaEngageJson.edges[0];

  const images = data.allFile.nodes;

  const getSrc = (name, media) => {
    if (media === 'leader') {
      return [
        images.find(img => img.name === name).mobileImage.fluid,
        {
          ...images.find(img => img.name === name).leaderDesktop.fluid,
          media: `(min-width: ${jsBreakpoints.phoneLarge}px)`,
        },
      ];
    }
    if (media === 'location') {
      return [
        images.find(img => img.name === name).mobileImage.fluid,
        {
          ...images.find(img => img.name === name).desktopImage.fluid,
          media: `(min-width: ${jsBreakpoints.phoneLarge}px)`,
        },
      ];
    }
    return images.find(img => img.name === name).childImageSharp.fluid;
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const onKeypress = e => {
    if (e.keyCode === 13) {
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    async function getLinks() {
      const URL =
        'https://spreadsheets.google.com/feeds/cells/18dA1bKdXZo3ecZFyjLhtY1CXFwZDsCpwxpnZQqB8Y8s/1/public/full?alt=json';

      try {
        const response = await fetch(URL);
        const json = await response.json();
        json.feed.entry.forEach(item => {
          if (item.title.$t.indexOf('B1') !== -1) {
            setExploreLink(item.content.$t);
          }
          if (item.title.$t.indexOf('B2') !== -1) {
            setJoinLink(item.content.$t);
          }
        });
      } catch (error) {
        setJoinLink('https://engage.acquia.com/agenda');
        setExploreLink('https://engage.acquia.com/agenda');
        console.error(error);
      }
    }
    getLinks();
  }, []);

  const layoutStyles = css`
    span {
      font-size: 25px;
      font-weight: ${weights.black};
    }
  `;

  const logogridStyles = css`
    h2 {
      font-size: 27px;
      font-weight: ${weights.bold};

      ${mediaQueries.phoneLarge} {
        font-size: 32px;
      }
    }

    h3 {
      font-family: ${fonts.sans};
      font-weight: ${weights.thin};
      line-height: 1;
      font-size: 16px;
    }

    div {
      max-width: 850px;
    }
  `;

  const splitWithButtonsCss = css`
    > div {
      padding-top: 20px;

      ${mediaQueries.phoneLarge} {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-left: 40px;
        padding-right: 40px;
      }
    }

    > div > div {
      margin-bottom: 64px;

      ${mediaQueries.phoneLarge} {
        margin-bottom: 90px;
        flex: 0 0 calc(50% - 86px);
        padding-top: 20px;

        &:nth-child(odd):last-child {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }

    h3 {
      font-size: 21px;
      font-weight: ${weights.bold};
      margin-bottom: 6px;
      padding-top: 40px;
      font-family: ${fonts.sans};
      line-height: 1.2;

      ${mediaQueries.phoneLarge} {
        font-size: 25px;
      }
    }

    p {
      font-weight: ${weights.thin};
      margin-bottom: 0;
    }

    .gatsby-image-wrapper > div {
      ${mediaQueries.phoneLarge} {
        padding-bottom: 100% !important;
      }
    }

    .button--container {
      display: flex;
      justify-content: center;
      align-items: center;
      ${mediaQueries.phoneLarge} {
        display: block;
      }
      button {
        margin: 0 auto;
        display: block;
      }
    }
  `;

  const splitWithImageCss = css`
    padding-top: 0;

    ${mediaQueries.phoneLarge} {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-left: 40px;
      padding-right: 40px;
    }

    > div {
      margin-bottom: 64px;

      ${mediaQueries.phoneLarge} {
        flex: 0 0 calc(50% - 86px);
        padding-top: 20px;

        &:nth-child(odd):last-child {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }

    h4 {
      font-size: 21px;
      font-weight: ${weights.bold};
      margin-bottom: 6px;
      padding-top: 40px;

      ${mediaQueries.phoneLarge} {
        font-size: 27px;
      }
    }

    p {
      font-weight: ${weights.thin};
      margin-bottom: 0;
    }

    .gatsby-image-wrapper > div {
      ${mediaQueries.phoneLarge} {
        padding-bottom: 100% !important;
      }
    }
  `;

  const linkStyles = css`
    display: flex;
    margin-top: 12px;
    a {
      font-family: ${fonts.sans};
      font-size: 15px;
      font-weight: ${weights.light};
      line-height: 2.4;
      padding: 0 10px;
      position: relative;
    }
  `;

  return (
    <Layout
      css={layoutStyles}
      headerData={{
        metaTitle: node.header[0].title,
        title: node.header[0].title,
        subTitle: node.header[0].date,
        linksA: [
          {
            url: '../../Visit TAG at Acquia Engage 2020.ics',
            text: '+iCal',
          },
          {
            url: '../../Visit TAG at Acquia Engage 2020.ics',
            text: '+Google Calendar',
          },
        ],
        mobileMinHeight: '93vh',
        hideNav: true,
        color: colors.yellow,
        invert: false,
        banner: true,
        styles: layoutStyles,
        navLink: joinLink,
      }}
    >
      <FullWidthSection
        height='200px'
        backgroundColor={colors.white}
        css={css`
          > div {
            ${container.textOnly}
            padding: 50px 20px 0;
            position: relative;
            ${mediaQueries.phoneLarge} {
              padding: 100px 0 0 0;
            }
          }
        `}
      >
        <div css={[splitWithButtonsCss, container.medium]}>
          <h3>{node.header[0].subtitle}</h3>

          <div>
            <div className='button--container'>
              <Button
                css={css`
                  display: none;

                  ${mediaQueries.phoneLarge} {
                    display: inline-block;
                  }
                `}
              >
                <a href={exploreLink} target='_blank' rel='noreferrer'>
                  Explore Event
                </a>
              </Button>
            </div>
            <div className='button--container'>
              <Button
                onClick={handleClick}
                onKeyDown={onKeypress}
                css={css`
                  display: none;

                  ${mediaQueries.phoneLarge} {
                    display: inline-block;
                  }
                `}
              >
                Grab That Swag
              </Button>
            </div>
          </div>
        </div>
      </FullWidthSection>
      <FullWidthSection
        backgroundColor={colors.white}
        height='100%'
        css={css`
          padding: 40px 0 20px;

          ${mediaQueries.desktop} {
            padding: 45px 0 20px;
          }

          h3 {
            font-size: 27px;
            font-weight: ${weights.bold};

            ${mediaQueries.phoneLarge} {
              font-size: 32px;
            }
          }
        `}
      >
        <h3>{node.who[0].header}</h3>

        <div css={[splitWithImageCss, container.medium]}>
          {node.who[0].people &&
            node.who[0].people.map(({ img, name, email, title }) => (
              <div key={name}>
                <Img alt={name} fluid={getSrc(img, 'leader')} />
                <h4>{name}</h4>
                <p>
                  <a href={`mailto:${email}`}>Say Hi</a>
                </p>
                <p>{title}</p>
              </div>
            ))}
        </div>
      </FullWidthSection>
      <LogoGrid
        title={node.drumroll[0].header}
        logoset='acquiaEngage'
        subtitle={node.drumroll[0].subhead}
        styles={logogridStyles}
      />
      <FullWidthSection
        align='flex-start'
        height='500px'
        css={css`
          ${container.textOnly}
          padding: 50px 20px;
          position: relative;
          ${mediaQueries.phoneLarge} {
            padding: 50px 0 120px 0;
          }

          p {
            text-align: left;
            margin-bottom: 0;
          }
        `}
      >
        <h3>{node.talk[0].header}</h3>
        <p>{node.talk[0].header}</p>
        {node.talk[0].tagTalks &&
          node.talk[0].tagTalks.map(({ title, date, time, description }) => (
            <>
              <br />
              <p>
                <b>{title}</b>
              </p>
              <p>{date}</p>
              <p>{time}</p>
              <p>{description}</p>
            </>
          ))}
        <br />
        <br />
        <br />
        <h3>Our Friends</h3>
        <p>
          {`After you visit with us, we have some other suggestions for you. Here’s a breakdown of what to do and who to meet.`}{' '}
        </p>
        {node.talk[0].talks &&
          node.talk[0].talks.map(({ title, date, time, description }) => (
            <>
              <br />
              <p>
                <b>{title}</b>
              </p>
              <p>{date}</p>
              <p>{time}</p>
              <p>{description}</p>
            </>
          ))}
      </FullWidthSection>
      <FullWidthSection height='100%' minHeight='100%'>
        {node.header[0].links && (
          <div css={linkStyles}>
            {node.header[0].links.map(l => (
              <a key={l.text} href={l.url}>
                <img src={getImageSrc(l.text.toLowerCase())} alt={l.text} />
              </a>
            ))}
          </div>
        )}
      </FullWidthSection>
      <SplitSection>
        <SeeInsights />
        <GetInTouch />
      </SplitSection>
      {isActive && (
        <NewsletterSimpleOverlay
          setIsActive={setIsActive}
          isActive={isActive}
          header='Enter your email for your free card caddy.'
          confirmMessage='Thanks! We’ll be in touch.'
          subheader=''
          formName='acquia-engage'
        />
      )}
    </Layout>
  );
};

AcquiaEngage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AcquiaEngage;

export const query = graphql`
  {
    allFile(
      filter: { absolutePath: { regex: "/acquia-engage/|/headshots/" } }
    ) {
      edges {
        node {
          name
          publicURL
          absolutePath
        }
      }
      nodes {
        name
        publicURL
        childImageSharp {
          fluid(cropFocus: NORTH, maxHeight: 335, maxWidth: 335) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
        mobileImage: childImageSharp {
          fluid(cropFocus: NORTH, maxHeight: 335, maxWidth: 335) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
        desktopImage: childImageSharp {
          fluid(cropFocus: NORTH, maxHeight: 335, maxWidth: 335) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
        leaderDesktop: childImageSharp {
          fluid(cropFocus: NORTH, maxHeight: 335, maxWidth: 335) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    allAcquiaEngageJson {
      edges {
        node {
          header {
            date
            subtitle
            title
            links {
              text
              url
            }
          }
          talk {
            header
            subhead
          }
          who {
            header
            people {
              email
              img
              name
              title
            }
          }
          drumroll {
            header
            sites {
              category
              name
            }
            subhead
          }
          cta {
            one {
              before
              during
              url
            }
            two {
              text
              url
            }
          }
        }
      }
    }
  }
`;
