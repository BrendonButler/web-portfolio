import { PropsWithChildren, ReactElement, ReactNode, useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import ReactMarkdown from 'react-markdown';
import { Project, Link } from '../pages/Projects';
import rehypeRaw from 'rehype-raw';

interface Image {
  source: string;
  alt: string;
  title: string;
}

interface CardProps {
  id?: string;
  title?: string;
  readme?: string;
  readmeLink?: string;
  shortDescription?: string;
  image?: Image;
  links?: Link[];
}

export function PreviewCard(cardProps: CardProps, children?: ReactNode) {
  return ((cardProps !== undefined || children) && (
    <div className='project-card' id='preview-card'>
      {cardProps.image && (
        <img src={cardProps.image.source} alt={cardProps.image.alt} title={cardProps.image.title} />
      )}
      <div className={'project-card-info'}>
        {cardProps.title && <h3>{cardProps.title}</h3>}
        {cardProps.shortDescription && <p>{cardProps.shortDescription}</p>}
        {cardProps.links &&
          cardProps.links.map((link: Link, index: number) => (
            <a key={index} id={link.id} href={link.url} target='_blank' rel='noopener noreferrer'>
              {link.text || link.url}
              {link.version && <span>{link.version}</span>}
            </a>
          ))}
      </div>
    </div>
  )) as JSX.Element | null;
}

export function HeaderCard({
  cardProps,
  selectProject
}: {
  cardProps: CardProps;
  selectProject: (project: Project | undefined) => void;
}) {
  return (cardProps !== undefined && (
    <section className={'project-card'} id={'header-card'}>
      {cardProps.image && (
        <img src={cardProps.image.source} alt={cardProps.image.alt} title={cardProps.image.title} />
      )}
      <div className={'project-card-info'}>
        <div className={'project-card-title'}>
          <span id={'back-button'} onClick={() => selectProject(undefined)}>
            ..
          </span>
          {cardProps.title && <h2>{cardProps.title}</h2>}
        </div>
        {cardProps.shortDescription && <p>{cardProps.shortDescription}</p>}
      </div>
      <div className={'project-card-links'}>
        {cardProps.links &&
          cardProps.links.map(
            (link: Link, index: number) =>
              link.id === 'latest-download' && (
                <a
                  key={index}
                  id={link.id}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <span className={'latest-download-text'}>Download {link.text || link.url}</span>
                  {link.version && (
                    <span className={'latest-download-version'}>{link.version}</span>
                  )}
                </a>
              )
          )}
      </div>
    </section>
  )) as ReactElement | null;
}

export function MainCard(cardProps?: PropsWithChildren<CardProps>) {
  const [readme, setReadme] = useState(cardProps?.readme || '');

  useEffect(() => {
    if (cardProps && cardProps?.readmeLink) {
      fetch(cardProps.readmeLink)
        .then((response) => response.text())
        .then((text) => setReadme(text));
    }
  }, [cardProps, cardProps?.readmeLink]);

  return (cardProps !== undefined && (
    <section className='project-card' id='main-card'>
      {readme && (
        <article>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readme}</ReactMarkdown>
        </article>
      )}
      {cardProps.children && <article>{cardProps.children}</article>}
    </section>
  )) as ReactElement | null;
}

export function SideCard(cardProps?: PropsWithChildren<CardProps>) {
  return (cardProps !== undefined && (
    <section className='project-card side-card' id={'side-card_' + cardProps.id}>
      {cardProps.title && <h3>{cardProps.title}</h3>}
      {cardProps.children && cardProps.children}
    </section>
  )) as ReactElement | null;
}
