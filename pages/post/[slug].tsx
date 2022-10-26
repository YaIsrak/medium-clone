import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post, TypeComment } from '../../typings';
import PortableText from 'react-portable-text';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Props {
	posts: Post;
}

interface IFormInput {
	_id: string;
	name: string;
	email: string;
	comment: string;
}

export default function PostPage({ posts }: Props) {
	const router = useRouter();
	const [submitted, setSubmitted] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		fetch('/api/createComment', {
			method: 'POST',
			body: JSON.stringify(data),
		})
			.then(() => {
				console.log(data);
				setSubmitted(true);
			})
			.catch((err) => {
				console.log(err);
				setSubmitted(false);
			});
	};

	return (
		<div className='max-w-6xl mx-auto'>
			<Head>
				<title>Medium | Posts</title>
			</Head>
			<main>
				<Header />
				<img
					className='w-full h-40 object-cover'
					src={urlFor(posts.mainImage).url()!}
					alt=''
				/>
				<article>
					<h1 className='text-5xl mt-10 mb-3 font-serif'>{posts.title}</h1>
					<div className='flex space-x-4 items-center'>
						<img
							className='h-10 w-10 rounded-full'
							src={urlFor(posts.author.image).url()!}
							alt=''
						/>
						<p className='font-extralight text-sm'>
							Blog post by <span className='text-green-600'>{posts.author.name}</span>{' '}
							- published at {new Date(posts._createdAt).toLocaleString()}
						</p>
					</div>
					<div>
						<PortableText
							className='my-5 font-serif'
							dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
							projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
							content={posts.body}
							serializers={{
								h1: (props: any) => (
									<h1 className='text-2xl font-bold my-5' {...props} />
								),
								h2: (props: any) => (
									<h1 className='text-xl font-bold my-5' {...props} />
								),
								li: ({ children }: any) => (
									<li className='ml-4 list-disc'>{children}</li>
								),
								link: ({ href, children }: any) => (
									<a href={href} className='text-blue-400 hover:underline'>
										{children}
									</a>
								),
							}}
						/>
					</div>
				</article>

				<hr className='max-w-lg my-5 mx-auto border border-yellow-500' />

				{/* form */}
				<div>
					{submitted ? (
						<div className='flex flex-col py-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
							<h1 className='text-3xl font-bold text-center'>
								Thank you for submitting your comment
							</h1>
							<p className='text-center'>
								Once it has been approved, it will apeare below
							</p>
						</div>
					) : (
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex flex-col p-5 max-w-2xl mx-auto mb-10'
						>
							<h3 className='text-sm text-yellow-500'>Enjoyed this articale?</h3>
							<h4 className='text-3xl font-bold'>Leave a comment below</h4>
							<hr className='py-3 mt-2' />

							<input {...register('_id')} name='_id' type='hidden' value={posts._id} />

							<label className='block mb-5'>
								<span className='text-gray-700 '>Name</span>
								<input
									{...register('name', { required: true })}
									className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring focus:outline-none'
									placeholder='Enter Your name'
									type='text'
								/>
							</label>
							<label className='block mb-5'>
								<span className='text-gray-700 '>Email</span>
								<input
									{...register('email', { required: true })}
									className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring focus:outline-none'
									placeholder='Enter Your email'
									type='text'
								/>
							</label>
							<label className='block mb-5'>
								<span className='text-gray-700 '>Comment</span>
								<textarea
									{...register('comment', { required: true })}
									className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring focus:outline-none'
									placeholder='abure kabure...'
									rows={8}
								/>
							</label>

							{/* errors */}
							<div className='flex flex-col p-5 '>
								{errors.name && (
									<span className='text-red-500'>- This Name Field is requied</span>
								)}
								{errors.email && (
									<span className='text-red-500'>- This email Field is requied</span>
								)}
								{errors.comment && (
									<span className='text-red-500'>- This Comment Field is requied</span>
								)}
							</div>

							<input
								className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer'
								type='submit'
							/>
						</form>
					)}
				</div>

				{/* comment */}
				<div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2 rounded-lg'>
					<h3>Comments</h3>
					<hr />
					{posts.comment.map((cmnt: TypeComment) => (
						<div key={cmnt._id}>
							<p>
								<span className='text-yellow-500'>{cmnt.name}</span> : {cmnt.comment}
							</p>
						</div>
					))}
				</div>
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