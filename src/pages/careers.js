import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';

import { colors, fonts, weights } from '../styles';
import Layout from '../components/layout';
import FullWidthSection from '../components/FullWidthSection';

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allResumatorJob {
        nodes {
          title
          status
        }
      }
    }
  `);

  const JobList = styled.ul`
    margin: 3rem auto;
    li {
      list-style: none;
      padding: 2rem;
      text-align: center;
      a {
        font-family: ${fonts.serif};
        font-weight: ${weights.bold};
        font-size: 57px;
        color: ${colors.darkgray};
        letter-spacing: 0;
        text-align: center;
        line-height: 72px;
        text-decoration: none;
      }
    }
  `;

  return (
    <Layout
      headerData={{
        title: 'Careers',
        height: '450px',
      }}
    >
      <FullWidthSection height='100%'>
        <JobList>
          {data.allResumatorJob.nodes
            .filter(j => j.status === 'Open')
            .map(job => (
              <li>
                <Link
                  to={`/careers/${job.title.toLowerCase().replace(/ /g, '-')}`}
                >
                  {job.title}
                </Link>
              </li>
            ))}
        </JobList>
      </FullWidthSection>
    </Layout>
  );
};
