import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PostProps } from '../typings';

interface IFormInput {
	_id: string;
	name: string;
	email: string;
	comment: string;
}

export default function Form({ posts }: PostProps) {
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
	);
}
