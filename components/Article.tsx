import PortableText from 'react-portable-text';
import { urlFor } from '../sanity';
import { PostProps } from '../typings';

export default function Article({ posts }: PostProps) {
	return (
		<article>
			{/* title */}
			<h1 className='text-5xl mt-10 mb-3 font-serif'>{posts.title}</h1>

			{/* Discription */}
			<div className='flex space-x-4 items-center'>
				<img
					className='h-10 w-10 rounded-full'
					src={urlFor(posts.author.image).url()!}
					alt=''
				/>
				<p className='font-extralight text-sm'>
					Blog post by <span className='text-green-600'>{posts.author.name}</span> -
					published at {new Date(posts._createdAt).toLocaleString()}
				</p>
			</div>

			{/* Article */}
			<div>
				<PortableText
					className='my-5 font-serif'
					dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
					projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
					content={posts.body}
					serializers={{
						h1: (props: any) => <h1 className='text-2xl font-bold my-5' {...props} />,
						h2: (props: any) => <h1 className='text-xl font-bold my-5' {...props} />,
						li: ({ children }: any) => <li className='ml-4 list-disc'>{children}</li>,
						link: ({ href, children }: any) => (
							<a href={href} className='text-blue-400 hover:underline'>
								{children}
							</a>
						),
					}}
				/>
			</div>
		</article>
	);
}
