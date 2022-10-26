import React from 'react';

export default function Welcome() {
	return (
		<div className='flex  justify-between items-center bg-yellow-400 border-y border-black py-10'>
			<div className='px-10 space-y-5'>
				<h1 className='text-6xl max-w-xl font-serif'>
					<span className='underline decoration-black decoration-4'>Medium</span> is
					a place to write, read and connect
				</h1>
				<h2>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda autem
					voluptates culpa dicta illum rerum nihil, dolorum inventore error, non
					tenetur ducimus veritatis incidunt necessitatibus.
				</h2>
			</div>
			<img
				className='hidden md:inline-flex h-32 w-32 lg:h-full'
				src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png'
				alt=''
			/>
		</div>
	);
}
