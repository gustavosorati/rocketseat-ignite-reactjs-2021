import { render ,screen} from '@testing-library/react'
import { getSession } from 'next-auth/react';
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../services/prismic';


const post = {
    slug: 'my-new-post',
    title: 'my-new-post',
    content: '<p>post-excerpt</p>',
    updatedAt: '10 de Abril'
}



jest.mock('../../services/prismic');
jest.mock('next-auth/react')

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Post post={post}/>)

    expect(screen.getByText("my-new-post")).toBeInTheDocument();
    expect(screen.getByText("post-excerpt")).toBeInTheDocument();
  });

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = jest.mocked(getSession);

    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any);
    console.log(response)

    expect(response).toEqual({
      redirect: expect.objectContaining({
        destination: '/',
      })
    })
  });

  it('loads initial data', async () => {
    const getSessionMocked = jest.mocked(getSession);
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'Fake title 1' }],
          content: [{ type: 'paragraph', text: 'Fake excerpt 1' }],
        },
        last_publication_date: '04-01-2022'
      })
    } as any);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'Fake title 1',
            content: '<p>Fake excerpt 1</p>',
            updatedAt: '01 de abril de 2022'
          }
        },
      })
    )
  });
});

