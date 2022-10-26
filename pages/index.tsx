import Head from 'next/head';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';
import Link from 'next/link';
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
						<Link key={post._id} href={`/post/${post.slug.current}`}>
							<div className='group cursor-pointer rounded-lg overflow-hidden shadow-md'>
								<img
									className='h-60 w-full object-cover group-hover:scale-105 transition-all duration-300 ease-in-out'
									src={urlFor(post.mainImage).url()}
									alt=''
								/>
								<div className='flex justify-between p-5 bg-white'>
									<div>
										<p className='text-lg font-bold'> {post.title} </p>
										<p className='text-xs text-gray-500'>by {post.author.name}</p>
									</div>
									<img
										className='h-12 w-12 rounded-full'
										src={urlFor(post.author.image).url()!}
										alt=''
									/>
								</div>
							</div>
						</Link>
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
