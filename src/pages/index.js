/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import TextLoop from 'react-text-loop';
import { css } from '@emotion/core';

import Layout from '../components/layout';
import ProjectsSlider from '../components/ProjectsSlider';
import InsightsSlider from '../components/InsightsSlider';
import CapabilitiesSlider from '../components/CapabilitiesSlider';
import LogoGrid from '../components/LogoGrid';
import SplitSection from '../components/SplitSection';
import { ContactUs, BeUs } from '../components/Prefooter';
import { colors } from '../styles';
import { useHasBeenVisible } from '../hooks/useVisibility';
import FullWidthSection from '../components/FullWidthSection';
import { NewsletterFullWidthSection } from '../components/NewsletterForm';

// eslint-disable-next-line react/prop-types
export default ({ data }) => {
  const halfPage = useRef();
  const preload = useRef();
  const hasScrolled = useHasBeenVisible(halfPage);
  const isScrolling = useHasBeenVisible(preload);

  const fontStyles = css`
    @media screen and (min-width: 25em) {
      font-size: calc(29px + (72 - 29) * (100vw - 500px) / (1440 - 500));
    }

    @media screen and (min-width: 25em) {
      font-size: calc(29px + (72 - 29) * (100vw - 500px) / (1440 - 500));
    }

    @media screen and (min-width: 50em) {
      font-size: calc(29px + (72 - 29) * (100vw - 500px) / (1440 - 500));
    }
  `;

  return (
    <Layout
      headerData={{
        metaTitle: `We are an obsessive digital innovation company`,
        title: (
          <span css={fontStyles}>
            <span>We are a</span>{' '}
            <TextLoop
              springConfig={{ stiffness: 155, damping: 15 }}
              adjustingSpeed={250}
            >
              <span>tireless</span>
              <span>handsome</span>
              <span>poised</span>
              <span>bold</span>
              <span>fearless</span>
              <span>robust</span>
            </TextLoop>{' '}
            <br />
            <span style={{ position: 'relative' }}>collection of</span>{' '}
            <TextLoop
              springConfig={{ stiffness: 155, damping: 15 }}
              adjustingSpeed={255}
            >
              <span>technologists</span>
              <span>creatives</span>
              <span>listeners</span>
              <span>brand builders</span>
              <span>innovators</span>
              <span>storytellers</span>
            </TextLoop>{' '}
          </span>
        ),
        mobileMinHeight: '93vh',
      }}
    >
      {' '}
      <ProjectsSlider data={data.allCaseStudy} />
      <CapabilitiesSlider
        title='What We Do'
        backgroundColor={colors.lightblue}
      />
      {hasScrolled || isScrolling ? (
        <>
          <InsightsSlider data={data.allInsight} />
          <LogoGrid title='A Few of Our Friends' />
          <NewsletterFullWidthSection />
          <SplitSection>
            <ContactUs />
            <BeUs />
          </SplitSection>
        </>
      ) : (
        <FullWidthSection ref={halfPage} height='2286px' minHeight='3448px' />
      )}
    </Layout>
  );
};

// define fragments
export const query = graphql`
  {
    allCaseStudy(
      sort: { fields: created, order: DESC }
      limit: 7
      filter: { field_hidden: { eq: false } }
    ) {
      nodes {
        ...CaseStudyFragment
      }
    }
    allInsight(
      sort: { fields: created, order: DESC }
      limit: 4
      filter: { field_hidden: { eq: false } }
    ) {
      nodes {
        ...InsightFragment
      }
    }
  }
  fragment InsightFragment on insight {
    id
    title
    field_inverse_header
    field_image {
      alt
    }
    created(formatString: "MMM D, YYYY")
    path {
      alias
    }
    relationships {
      node_type {
        name
      }
      uid {
        name: display_name
      }
      field_image {
        id
        localFile {
          publicURL
          childImageSharp {
            fluid(maxWidth: 530, maxHeight: 400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          childImageSlideMobile: childImageSharp {
            fluid(maxWidth: 325, maxHeight: 250) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          childImageSlideDesktop: childImageSharp {
            fluid(maxWidth: 450, maxHeight: 400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      field_components {
        ... on component__text {
          relationships {
            component_type {
              name
            }
          }
          field_body {
            processed
          }
        }
        ... on component__image {
          id
          field_image {
            alt
          }
          relationships {
            component_type {
              name
            }
            field_image {
              id
              localFile {
                publicURL
                childImageSharp {
                  fluid(maxWidth: 630, maxHeight: 630) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  fragment CaseStudyFragment on case_study {
    id
    title
    field_subtitle
    field_inverse_header
    field_image_arrangement
    field_image {
      alt
    }
    field_secondary_image {
      alt
    }
    field_tertiary_image {
      alt
    }
    path {
      alias
    }
    relationships {
      field_tags {
        name
      }
      field_image {
        id
        localFile {
          publicURL
          childImageSharp {
            fluid(maxWidth: 850, maxHeight: 850, cropFocus: NORTH) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          childImageMobile: childImageSharp {
            fixed(width: 335, height: 260, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
          childImageTypeA: childImageSharp {
            fixed(width: 450, height: 320, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
          childImageTypeB: childImageSharp {
            fixed(width: 380, height: 420, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
          childImageTypeC: childImageSharp {
            fixed(width: 420, height: 340, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
      }
      field_secondary_image {
        id
        localFile {
          publicURL
          childImageSharp {
            fluid(maxWidth: 850, maxHeight: 850) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          childImageMobile: childImageSharp {
            fixed(width: 1, height: 1) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
          childImageTypeA: childImageSharp {
            fixed(width: 250, height: 180, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
          childImageTypeB: childImageSharp {
            fixed(width: 340, height: 260, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
          childImageTypeC: childImageSharp {
            fixed(width: 270, height: 210, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
      }
      field_tertiary_image {
        id
        localFile {
          publicURL
          childImageSharp {
            fluid(maxWidth: 850, maxHeight: 850) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          childImageMobile: childImageSharp {
            fixed(width: 1, height: 1) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
          childImageTypeA: childImageSharp {
            fixed(width: 250, height: 495, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
          childImageTypeB: childImageSharp {
            fixed(width: 230, height: 210, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
          childImageTypeC: childImageSharp {
            fixed(width: 320, height: 210, cropFocus: CENTER) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`;
