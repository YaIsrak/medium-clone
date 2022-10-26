import Link from 'next/link';
import React from 'react';
import { urlFor } from '../sanity';
import { Post } from '../typings';

interface TypePost {
	post: Post;
}

export default function Feed({ post }: TypePost) {
	return (
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
	);
}
