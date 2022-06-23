import useArticleForm from '@u/hooks/useArticleForm';
import Input from '@c/Input/Input';
import { NextComponentType, NextPageContext } from 'next';
interface Props {
	isNewArticle: boolean;
}
const ArticlesForm: NextComponentType<NextPageContext, {}, Props> = ({
	isNewArticle,
}: Props) => {
	const [
		formState,
		handleChange,
		handleBlur,
		handleSubmit,
		handleDelete,
		handleCancel,
		onClickSubmitButton,
		errors,
		formValid,
	] = useArticleForm({
		formState: {
			title: '',
			content: '',
			author: '',
			image: 'default-image.jpeg',
		},
		validateOn: 'blurAndSubmit',
		isNewArticle,
	});
	return (
		<div className='container ArticlesForm'>
			<form onSubmit={handleSubmit}>
				<h1 className='ArticlesForm__title'>
					{isNewArticle
						? 'Create a new article:'
						: 'Edit this article:'}{' '}
				</h1>
				<Input
					errors={errors.title}
					type='input'
					onChange={handleChange}
					defaultValue={formState.title}
					name='title'
					onBlur={handleBlur}
					placeholder='Write your article title here'
				/>
				<Input
					errors={errors.content}
					type='textarea'
					onChange={handleChange}
					defaultValue={formState.content}
					name='content'
					onBlur={handleBlur}
					placeholder='Write your article content here'
				/>
				<Input
					errors={errors.author}
					type='input'
					onChange={handleChange}
					defaultValue={formState.author}
					name='author'
					onBlur={handleBlur}
					placeholder='Write the article author name here'
				/>
				<button
					disabled={!formValid}
					type='submit'
					className='btn btn-primary'
				>
					<span onClick={onClickSubmitButton}>
						{isNewArticle ? 'Create' : 'Edit'}
					</span>
				</button>
				{!isNewArticle && (
					<button
						type='button'
						className='btn btn-danger'
						onClick={handleDelete}
					>
						Delete
					</button>
				)}
				<button
					onClick={handleCancel}
					type='button'
					className='btn btn-dark'
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default ArticlesForm;
