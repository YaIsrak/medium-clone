import { GetStaticProps } from 'next';
import Head from 'next/head';
import { sanityClient } from '../../sanity';
import { Post, PostProps } from '../../typings';
import Header from '../../components/Header';
import Article from '../../components/Article';
import PostHeader from '../../components/PostHeader';
import Form from '../../components/Form';
import CommentBox from '../../components/CommentBox';

export default function PostPage({ posts }: PostProps) {
	return (
		<div className='max-w-6xl mx-auto'>
			<Head>
				<title>Medium | Posts</title>
			</Head>

			<main>
				<Header />
				<PostHeader posts={posts} />
				<Article posts={posts} />
				<hr className='max-w-lg my-5 mx-auto border border-yellow-500' />
				<Form posts={posts} />
				<CommentBox posts={posts} />
			</main>
		</div>
	);
}

export const getStaticPaths = async () => {
	const query = `*[_type == 'post']{
						_id,
						_createdAt,
						title,
						slug,
						body,
						mainImage,
						author->{
							name, image
						},
	  				}`;
	const posts = await sanityClient.fetch(query);
	const paths = posts.map((post: Post) => ({
		params: {
			slug: post.slug.current,
		},
	}));
	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type == 'post' && slug.current == $slug][0]{
		_id,
		_createdAt,
		title,
		body,
		slug,
		mainImage,
		author->{
		  name, image
		},
		"comment" : *[
			_type == 'comment' && post._ref == ^._id && approved == true
		  ]
	  }`;

	const posts = await sanityClient.fetch(query, {
		slug: params?.slug,
	});

	if (!posts) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			posts,
		},
		revalidate: 60,
	};
};
