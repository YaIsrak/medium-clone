import React from 'react';
import { urlFor } from '../sanity';
import { PostProps } from '../typings';

export default function PostHeader({ posts }: PostProps) {
	return (
		<img
			className='w-full h-40 object-cover'
			src={urlFor(posts.mainImage).url()!}
			alt=''
		/>
	);
}
