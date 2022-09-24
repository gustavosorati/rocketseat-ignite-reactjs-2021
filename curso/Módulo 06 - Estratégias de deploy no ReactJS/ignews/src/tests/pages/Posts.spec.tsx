import { render ,screen} from '@testing-library/react'
import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic';


const posts = [
  {
    slug: 'my-new-post',
    title: 'my-new-post',
    excerpt: 'post-excerpt',
    updatedAt: '10 de Abril'
  }
]

jest.mock('../../services/prismic')

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts}/>)

    expect(screen.getByText("my-new-post")).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'fake-slug',
            data: {
              title: [
                {
                  type: 'heading', text: 'Fake title 1'
                }
              ],
              content: [
                {
                  type: 'paragraph',
                  text: 'Fake excerpt 1',
                },
              ],
            },
            last_publication_date: '01-01-2020',
          },
        ],
      }),
    } as any);
  });
});

