import React from 'react';
import { CommentProps } from '../typings';

export default function Comment({ comment }: CommentProps) {
	return (
		<div>
			<p>
				<span className='text-yellow-500'>{comment.name}</span> : {comment.comment}
			</p>
		</div>
	);
}
