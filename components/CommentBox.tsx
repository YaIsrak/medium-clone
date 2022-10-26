import React from 'react';
import { PostProps, TypeComment } from '../typings';
import Comment from './Comment';

export default function CommentBox({ posts }: PostProps) {
	return (
		<div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2 rounded-lg'>
			<h3>Comments</h3>
			<hr />
			{posts.comment.map((cmnt: TypeComment) => (
				<Comment comment={cmnt} key={cmnt._id} />
			))}
		</div>
	);
}
