import Link from 'next/link';
import React from 'react';
import Test from './Test';

export default function Header() {
	return (
		<header className='flex justify-between p-5 max-w-6xl mx-auto'>
			<div className='flex items-center space-x-5'>
				<Link href={'/'}>
					<img
						className='w-44 object-contain cursor-pointer'
						src='https://links.papareact.com/yvf'
						alt=''
					/>
				</Link>
				<div className='hidden md:inline-flex items-center space-x-5'>
					<h3>About</h3>
					<h3>Contact</h3>
					<h3 className='px-4 py-1 bg-green-600 text-white rounded-full'>Follow</h3>
				</div>
			</div>
			<div className='flex items-center space-x-5 text-green-600'>
				<h3>Sign In</h3>
				<h3 className='border border-green-600 px-4 py-1 rounded-full'>
					Get Started
				</h3>
			</div>
			{/* <Test name={name} /> */}
		</header>
	);
}
