import Head from 'next/head';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import Feed from '../components/Feed';
import { sanityClient } from '../sanity';
import { Post } from '../typings';
import { GetStaticProps } from 'next';

interface Props {
	posts: Post[];
}

export default function Home({ posts }: Props) {
	return (
		<div className='max-w-6xl mx-auto'>
			<Head>
				<title>Medium</title>
			</Head>

			<main>
				<Header />

				<Welcome />

				{/* Post */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
					{posts.map((post) => (
						<Feed post={post} key={post._id} />
					))}
				</div>
			</main>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const query = `*[_type == 'post']{
						...,
						author->{
							name, image
						},
	  				}`;
	const posts = await sanityClient.fetch(query);
	return {
		props: {
			posts,
		},
		revalidate: 60,
	};
};
