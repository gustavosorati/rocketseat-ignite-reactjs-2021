import { render ,screen} from '@testing-library/react'
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getStaticProps } from '../../pages';
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../services/prismic';


const post = {
    slug: 'my-new-post',
    title: 'my-new-post',
    content: '<p>post-excerpt</p>',
    updatedAt: '10 de Abril'
}



jest.mock('../../services/prismic');
jest.mock('next-auth/react');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: '/posts/my-new-post',
  }),
}))

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce(null)
    render(<Post post={post}/>)

    expect(screen.getByText("my-new-post")).toBeInTheDocument();
    expect(screen.getByText("post-excerpt")).toBeInTheDocument();
    // expect(screen.getByText("Wanna Continue Reading?")).toBeInTheDocument();
  });

  // it('redirects user to full post when user is subcribed', async () => {
  //   const useSessionMocked = jest.mocked(useSession);
  //   const useRouterMocked = jest.mocked(useRouter);
  //   const pushMock = jest.fn();

  //   useSessionMocked.mockReturnValueOnce([
  //     { activeSubscription: 'fake-active-subscription '},
  //     false
  //   ] as any);

  //   useRouterMocked.mockReturnValueOnce({
  //     push: pushMock,
  //   } as any)

  //   render(<Post post={post}/>)

  //   expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  // });

  it('loads initial data', async () => {
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

    const response = await getStaticProps({
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

