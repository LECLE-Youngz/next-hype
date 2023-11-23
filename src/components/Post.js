import { Link, useNavigate } from 'react-router-dom'
import Markdown from 'react-markdown'
import rehypeRaw from "rehype-raw";
import { BiUpvote, BiComment, BiBookmark, BiSolidUpvote, BiSolidComment, BiSolidBookmark } from "react-icons/bi";
import { useEffect, useState } from 'react';
import { parseTime } from '../libs/time';
import { getInfoUser } from '../storage/local';
import { createComment, getPosts, toggleBookmarkPost, toggleLikeComment, toggleLikePost } from '../helpers/social';
import { IoSend } from "react-icons/io5";
import { IoMdClose, IoMdReturnLeft } from "react-icons/io";

const Post = ({ postId }) => {
	const [account, setAccount] = useState(null)
	const [post, setPost] = useState(null)
	const [replies, setReplies] = useState([])
	const [postComment, setPostComment] = useState('')
	const [onComment, setOnComment] = useState(false)
	const [onReply, setOnReply] = useState(null)
	const [likeCommentLoading, setLikeCommentLoading] = useState(null)

	const [likeUpdating, setLikeUpdating] = useState(false)
	const [bookmarkUpdating, setBookmarkUpdating] = useState(false)
	const [showReplies, setShowReplies] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const user = getInfoUser().user
			setAccount(user);
		}
		fetchData()
	}, [])

	const handleShow = (index) => {
		const newShowReplies = [...showReplies]
		newShowReplies[index] = !newShowReplies[index]
		setShowReplies(newShowReplies)
	}

	const handleReply = (index, text) => {
		const newReplies = [...replies]
		newReplies[index] = text
		setReplies(newReplies)
	}

	const send = async (index, commentId) => {
		if (index !== undefined) {
			setOnReply(commentId)

			await createComment(postId, commentId, replies[index])

			const newReplies = [...replies]
			newReplies[index] = null
			setReplies(newReplies)

			const newShowReplies = [...showReplies]
			newShowReplies[index] = true
			setShowReplies(newShowReplies)

			setOnReply(null)
		} else {
			setOnComment(true)

			await createComment(postId, null, postComment)
			setPostComment('')

			setOnComment(false)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const post = await getPosts(postId)
			setPost(post)
			setReplies(Array(post.listComment.length).fill(null))
			setShowReplies(Array(post.listComment.length).fill(false))
		}
		fetchData()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			const post = await getPosts(postId)
			setPost(post)
		}
		fetchData()
	}, [likeUpdating, bookmarkUpdating, likeCommentLoading, onComment, onReply])

	const toggleLike = async (id) => {
		if (id) {
			setLikeCommentLoading(id)
			await toggleLikeComment(id)
			setLikeCommentLoading(null)
		} else {
			setLikeUpdating(true)
			await toggleLikePost(postId)
			setLikeUpdating(false)
		}
	}

	const toggleBookmark = async () => {
		setBookmarkUpdating(true)
		await toggleBookmarkPost(postId)
		setBookmarkUpdating(false)
	}

	const navigate = useNavigate()


	if (post === null) {
		return (
			<div className='h-screen w-full flex justify-center'>
				<div className='animate-spin self-center rounded-full w-10 h-10 border-b-2 border-gray-500'></div>
			</div>
		)
	}

	return (
		<div className="flex flex-col justify-between">
			<div className="flex justify-between">
				<h1 className="text-4xl text-gray-900"># Join the{' '}
					<span className="twinkle-text">
						community
					</span>{' '}</h1>
				<button className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl" onClick={() => navigate("/social/create")}>
					Create post
				</button>
			</div>
			<div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
				<p className="truncate border-b w-1/4 border-gray-900 text-2xl font-extralight">## demo</p>
				<p className="truncate w-min border-gray-900 text-2xl font-extralight">/</p>
				<p className="truncate border-b w-1/2 border-gray-900 text-2xl font-extralight text-right flex">
					<p className="text-center appearance-none rounded-full flex-1 outline-none text-gray-600 w-full">## post view</p>
				</p>
				<p className="truncate w-min border-gray-900 text-2xl font-extralight">/</p>
				<p className="truncate border-b w-1/4 border-gray-900 text-2xl font-extralight text-right flex">
					<p className="text-right appearance-none rounded-full flex-1 outline-none text-gray-600 w-full">## post detail</p>
				</p>
			</div>
			<div className="grid grid-cols-4 mx-10 gap-10">
				<div className="flex flex-col">
					<img className="w-full h-fit" src={post.nft.thumbnail} alt="post" />
				</div>
				<div className="flex col-span-3">
					<div className='grid grid-cols-3 gap-5 w-full'>
						<div className="col-span-2">
							<p className="text-4xl text-gray-900 font-light font-serif">{post.header}</p>
							<p className="my-5 text-lg text-gray-600 font-semibold">{post.description}</p>
							<div className='border-[0.5px] border-gray-200'></div>
							<div className='-translate-y-4 flex justify-end'>
								<p className='pl-5 bg-white w-fit'>{parseTime(post.timestamp)}</p>
							</div>
							<article className="text-gray-600 ml-5 prose">
								<Markdown rehypePlugins={[rehypeRaw]}>{post.text}</Markdown>
							</article>
							<div className="flex gap-2 mt-5 justify-end">
								{post.tags.map((tag) => (
									<Link to={`/social/tag/${tag}`}
										className="text-gray-600 font-light underline-offset-2 hover:text-black text-lg text-right hover:underline">#{tag}</Link>
								))}
							</div>
						</div>
						<div className="grid gap-5 h-min">
							<div className='flex justify-between'>
								<div className='grid items-center'>
									<Link
										to={"/profile/" + post.postOwner.id}
										className="grid group">
										<span className="text-xl font-light group-hover:text-gray-400 text-gray-900">
											{post.postOwner.name}
										</span>
										<p className="font-semibold group-hover:text-gray-400 text-gray-500">
											{post.postOwner.email}
										</p>
									</Link>
								</div>
								<img
									src={post.postOwner.picture}
									className="h-14"
									alt="profile"
								/>
							</div>
							<div className="flex justify-between text-2xl text-gray-600">
								{
									!likeUpdating ?
										post.likes.includes(account.id) ?
											<div className='w-10 flex items-center space-x-1 group cursor-pointer hover:text-red-400 text-red-600' onClick={() => toggleLike()}>
												<BiSolidUpvote className='' />
												<p className='text-lg'>{post.likes.length}</p>
											</div>
											:
											<div className='w-10 flex items-center space-x-1 group cursor-pointer hover:text-red-400' onClick={() => toggleLike()}>
												<BiUpvote className='' />
												<p className='text-lg'>{post.likes.length}</p>
											</div>
										:
										<div className='flex w-10 justify-center'>
											<div className='self-center animate-spin rounded-full w-6 h-6 border-b-2 border-gray-500'></div>
										</div>
								}
								<a className='flex items-center space-x-1 group cursor-pointer hover:text-gray-400' href='#comment'>
									<BiComment className='' />
									<p className='text-lg'>{post.listComment.length}</p>
								</a>
								{
									!bookmarkUpdating ?
										post.bookmark.includes(account.id) ?
											<div className='flex w-10 items-center space-x-1 group cursor-pointer hover:text-blue-400 text-blue-600' onClick={() => toggleBookmark()}>
												<BiSolidBookmark className='' />
												<p className='text-lg'>{post.bookmark.length}</p>
											</div>
											:
											<div className='flex w-10 items-center space-x-1 group cursor-pointer hover:text-blue-400' onClick={() => toggleBookmark()}>
												<BiBookmark className='' />
												<p className='text-lg'>{post.bookmark.length}</p>
											</div>
										:
										<div className='flex w-10 justify-center'>
											<div className='self-center animate-spin rounded-full w-6 h-6 border-b-2 border-gray-500'></div>
										</div>
								}
							</div>
							<div className='grid pt-3'>
								{post.listComment.map((comment, index) => (
									<div className=''>
										<div className=' bg-gray-100 p-3'>
											<div className='flex justify-between items-center'>
												<Link
													to={"/profile/" + comment.ownerComment.id}
													className="flex items-center space-x-3"
												>
													<img
														src={comment.ownerComment.picture}
														className="h-8"
														alt="profile"
													/>
													<span className="font-light group-hover:text-gray-500 text-gray-900">
														{comment.ownerComment.name}
													</span>
												</Link>
												<p className="text-gray-600 text-sm">{parseTime(comment.timestamp)}</p>
											</div>
											<p className='text-gray-600 mt-3'>{comment.text}</p>
											<div className='flex justify-end space-x-3'>
												{
													likeCommentLoading !== comment.id ?
														comment.likes.includes(account.id) ?
															<>
																<div className='flex items-center space-x-1 group cursor-pointer hover:text-red-400 text-red-600' onClick={() => toggleLike(comment.id)}>
																	<BiSolidUpvote className='' />
																	<p className='text-sm'>{comment.likes.length}</p>
																</div>
															</>
															:
															<div className='flex items-center space-x-1 group cursor-pointer hover:text-red-400' onClick={() => toggleLike(comment.id)}>
																<BiUpvote className='' />
																<p className='text-sm'>{comment.likes.length}</p>
															</div>
														:
														<div className='flex w-10 justify-center'>
															<div className='self-center animate-spin rounded-full w-5 h-5 border-b-2 border-gray-500'></div>
														</div>
												}
												{
													replies[index] === null ?
														<div className='flex items-center space-x-1 group cursor-pointer hover:text-gray-400' onClick={() => handleReply(index, '')}>
															<IoMdReturnLeft className='' />
															<p className='text-sm'>{comment.listReplyComment.length}</p>
														</div>
														:
														<div className='flex items-center space-x-1 group cursor-pointer hover:text-gray-400' onClick={() => handleReply(index, null)}>
															<p className='text-sm invisible'>{comment.listReplyComment.length}</p>
															<IoMdClose className='' />
														</div>
												}
											</div>
										</div>
										<div className={`${showReplies[index] ? 'block' : 'hidden'} pl-10 container bg-gray-100 p-3 transition-all duration-500 ease-in-out space-y-5`}>
											{comment.listReplyComment.map((reply) => (
												<div className='text-sm'>
													<div div className='flex justify-between items-center' >
														<Link
															to={"/profile/" + reply.ownerComment.id}
															className="flex items-center space-x-3"
														>
															<img
																src={reply.ownerComment.picture}
																className="h-6"
																alt="profile"
															/>
															<span className="font-light group-hover:text-gray-500 text-gray-900">
																{reply.ownerComment.name}
															</span>
														</Link>
														<p className="text-gray-600 text-xs">{parseTime(reply.timestamp)}</p>
													</div>
													<div className='flex justify-between space-x-3'>
														<p className='text-gray-600 mt-2'>{reply.text}</p>
														{
															likeCommentLoading !== reply.id ?
																reply.likes.includes(account.id) ?
																	<>
																		<div className='flex items-center space-x-1 group cursor-pointer hover:text-red-400 text-red-600' onClick={() => toggleLike(reply.id)}>
																			<BiSolidUpvote className='' />
																			<p className='text-xs'>{reply.likes.length}</p>
																		</div>
																	</>
																	:
																	<div className='flex items-center space-x-1 group cursor-pointer hover:text-red-400' onClick={() => toggleLike(reply.id)}>
																		<BiUpvote className='' />
																		<p className='text-xs'>{reply.likes.length}</p>
																	</div>
																:
																<div className='flex w-10 justify-center'>
																	<div className='self-center animate-spin rounded-full w-4 h-4 border-b-2 border-gray-500'></div>
																</div>
														}
													</div>
												</div>
											))}
										</div>
										{
											replies[index] !== null &&
											<div className='relative bg-gray-100 p-3 pl-10'>
												<textarea id='reply' onChange={(e) => handleReply(index, e.target.value)} className="w-full h-24 p-3 border cursor-text focus:outline-black flex items-center justify-center" type="text" placeholder="write a reply..." />
												{
													onReply === comment.id ?
														<div className='absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 flex justify-center items-center'>
															<div className='animate-spin rounded-full w-10 h-10 border-b-2 border-gray-500'></div>
														</div>
														:
														<div className='absolute bottom-6 right-6'>
															<IoSend className={`${replies[index] !== '' ? "" : "hidden"} w-5 h-5 cursor-pointer text-gray-400 hover:text-gray-800`}
																onClick={() => send(index, comment.id)}>post</IoSend>
														</div>
												}
											</div>
										}
										<div div className='my-5 border-[0.5px] border-gray-200' ></div>
										{
											comment.listReplyComment.length > 0 &&
											<div className='w-full flex justify-center'>
												<p className='-translate-y-8 bg-white px-3 text-gray-600 hover:text-gray-900 hover:font-medium cursor-pointer'
													onClick={() => handleShow(index)}
												>{showReplies[index] ? 'hide' : 'show'} {comment.listReplyComment.length} replies</p>
											</div>
										}
									</div>
								))}
								<div className='relative mt-3'>
									<textarea id='comment' onChange={(e) => setPostComment(e.target.value)} className="w-full h-24 p-3 border cursor-text focus:outline-black flex items-center justify-center" type="text" placeholder="write a comment..." defaultValue={postComment} />
									{
										onComment ?
											<div className='absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 flex justify-center items-center'>
												<div className='animate-spin rounded-full w-10 h-10 border-b-2 border-gray-500'></div>
											</div>
											:
											<div className='absolute bottom-3 right-3'>
												<IoSend className={`${postComment !== '' ? "" : "hidden"} w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-800`} onClick={() => send()}></IoSend>
											</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Post
