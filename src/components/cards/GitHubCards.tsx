import { SideCardProps } from './Cards';
import { GitHubRepository } from '../../types/GitHubProjects';
import React from 'react';

export interface GitHubCardProps extends SideCardProps {
  repository: GitHubRepository;
}

export const GitHubRepoDetailsSideCard = ({ props }: { props: GitHubCardProps }) => {
  return (
    props && (
      <section id={props.id} className='project-card side-card'>
        <h3>Project Details</h3>
        <table>
          <tbody>
            {props.repository.created && (
              <tr>
                <td>
                  <strong>Date created</strong>
                </td>
                <td>{props.repository.created.toDateString()}</td>
              </tr>
            )}
            {props.repository.updated && (
              <tr>
                <td>
                  <strong>Last updated</strong>
                </td>
                <td>{props.repository.updated.toDateString()}</td>
              </tr>
            )}
            {/*{props.repository.lastPushed && (
              <tr>
                <td>
                  <strong>Last pushed</strong>
                </td>
                <td>{props.repository.lastPushed.toDateString()}</td>
              </tr>
          )}*/}
            {props.repository.license && (
              <tr>
                <td>
                  <strong>License</strong>
                </td>
                <td>
                  <a
                    href={props.repository.license.url}
                    title={props.repository.license.name}
                    target='_blank'
                    rel='noopener noreferrer'>
                    {props.repository.license.shortHand}
                  </a>
                </td>
              </tr>
            )}
            {props.repository.language && (
              <tr>
                <td>
                  <strong>Primary language</strong>
                </td>
                <td>{props.repository.language}</td>
              </tr>
            )}
            <tr>
              <td>
                <strong>Stargazers</strong>
              </td>
              <td>
                <a href={`${props.repository.url.url}/stargazers`}>{props.repository.stargazers}</a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Watchers</strong>
              </td>
              <td>
                <a href={`${props.repository.url.url}/watchers`}>{props.repository.subscribers}</a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Forks</strong>
              </td>
              <td>
                <a href={`${props.repository.url.url}/forks`}>{props.repository.forks}</a>
              </td>
            </tr>
            {props.repository.tags && (
              <tr>
                <td>
                  <strong>Tags</strong>
                </td>
                <td>{props.repository.tags.join(', ')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    )
  );
};
