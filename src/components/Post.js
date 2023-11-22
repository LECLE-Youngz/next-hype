import { Link } from 'react-router-dom'
import { BiUpvote, BiComment, BiBookmark, BiSolidUpvote, BiSolidComment, BiSolidBookmark } from "react-icons/bi";
import { useEffect, useState } from 'react';
import { parseTime } from '../libs/time';
import { getInfoUser } from '../storage/local';
import { getPosts, likePost, toggleLikePost, unlikePost } from '../helpers/social';

const Post = ({ postId, text, header, description, bookmark, listLike, listComment, tags, timestamp, nft, postOwner }) => {
	const [account, setAccount] = useState(null)

	const [comment, setComment] = useState(Array(listComment.length).fill(null))

	const [likes, setLikes] = useState({ num: null, liked: null })
	const [likeUpdating, setLikeUpdating] = useState(false)
	const [comments, setComments] = useState(listComment)
	const [commentUpdating, setCommentUpdating] = useState(false)
	const [bookmarks, setBookmarks] = useState(bookmark)
	const [bookmarkUpdating, setBookmarkUpdating] = useState(false)
	const [showReplies, setShowReplies] = useState(Array(listComment.length).fill(false))

	useEffect(() => {
		const user = getInfoUser().user
		setLikes({ num: listLike.length, liked: listLike.includes(user?.id) })
		setAccount(user);
	}, [])

	const handleShow = (index) => {
		const newShowReplies = [...showReplies]
		newShowReplies[index] = !newShowReplies[index]
		setShowReplies(newShowReplies)
	}

	const handleReply = (index, text) => {
		const newComment = [...comment]
		newComment[index] = text
		setComment(newComment)
	}

	const toggleLike = async () => {
		setLikeUpdating(true)
		toggleLikePost(postId)
		const post = await getPosts(postId)
		setLikes({ num: post.listLike.length, liked: post.listLike.includes(account?.id) })
		setLikeUpdating(false)
	}

	return (
		<div className='grid grid-cols-3 gap-5 w-full'>
			<div className="col-span-2">
				<p className="text-4xl text-gray-900 font-light font-serif">{header}</p>
				<p className="my-5 text-lg text-gray-600 font-semibold">{description}</p>
				<div className='border-[0.5px] border-gray-200'></div>
				<div className='-translate-y-4 flex justify-end'>
					<p className='pl-5 bg-white w-fit'>{parseTime(timestamp)}</p>
				</div>
				<p className="text-gray-600 ml-5">{text}</p>
				<div className="flex gap-2 mt-5 justify-end">
					{tags.map((tag) => (
						<Link to={`/social/${tag}`}
							className="text-gray-600 font-light underline-offset-2 hover:text-black text-lg text-right hover:underline">#{tag}</Link>
					))}
				</div>
			</div>
			<div className="grid gap-5 h-min">
				<div className='flex justify-between'>
					<div className='grid items-center'>
						<Link
							to={"/profile/" + postOwner.id}
							className="grid group">
							<span className="text-xl font-light group-hover:text-gray-400 text-gray-900">
								{postOwner.name}
							</span>
							<p className="font-semibold group-hover:text-gray-400 text-gray-500">
								{postOwner.email}
							</p>
						</Link>
					</div>
					<img
						src={postOwner.picture}
						className="h-14"
						alt="profile"
					/>
				</div>
				<div className="flex justify-between text-2xl text-gray-600">
					{
						!likeUpdating ?
							likes?.liked ?
								<div className='w-10 flex items-center space-x-1 group cursor-pointer hover:text-red-400 text-red-600' onClick={() => toggleLike()}>
									<BiSolidUpvote className='' />
									<p className='text-lg'>{likes?.num}</p>
								</div>
								:
								<div className='w-10 flex items-center space-x-1 group cursor-pointer hover:text-red-400' onClick={() => toggleLike()}>
									<BiUpvote className='' />
									<p className='text-lg'>{likes?.num}</p>
								</div>
							:
							<div className='flex w-10 justify-center'>
								<div className='self-center animate-spin rounded-full w-6 h-6 border-b-2 border-gray-500'></div>
							</div>
					}
					<a className='flex items-center space-x-1 group cursor-pointer hover:text-gray-400' href='#comment'>
						<BiComment className='' />
						<p className='text-lg'>{listComment.length}</p>
					</a>
					{
						!bookmarkUpdating ?
							bookmarks.includes(account?.id) ?
								<div className='flex w-10 items-center space-x-1 group cursor-pointer hover:text-blue-400 text-blue-600'>
									<BiSolidBookmark className='' />
									<p className='text-lg'>{bookmarks.length}</p>
								</div>
								:
								<div className='flex w-10 items-center space-x-1 group cursor-pointer hover:text-blue-400'>
									<BiBookmark className='' />
									<p className='text-lg'>{bookmarks.length}</p>
								</div>
							:
							<div className='flex w-10 justify-center'>
								<div className='self-center animate-spin rounded-full w-6 h-6 border-b-2 border-gray-500'></div>
							</div>
					}
				</div>
				<div className='mt-3'>
					<textarea id='comment' onChange={(e) => setComment(e.target.value)} className="w-full h-24 p-3 border cursor-text focus:outline-black flex items-center justify-center" type="text" placeholder="write a comment..." />
				</div>
				<div className='grid pt-3'>
					{comments.map((cmt, index) => (
						<div className=''>
							<div className=' bg-gray-100 p-3'>
								<div className='flex justify-between items-center'>
									<Link
										to={"/profile/" + cmt.ownerComment.id}
										className="flex items-center space-x-3"
									>
										<img
											src={cmt.ownerComment.picture}
											className="h-8"
											alt="profile"
										/>
										<span className="font-light group-hover:text-gray-500 text-gray-900">
											{cmt.ownerComment.name}
										</span>
									</Link>
									<p className="text-gray-600 text-sm">{parseTime(cmt.timestamp)}</p>
								</div>
								<p className='text-gray-600 mt-3'>{cmt.text}</p>
								{
									comment[index] === null ?
										<p className='self-end text-right font-medium cursor-pointer hover:underline'
											onClick={() => handleReply(index, '')}
										>reply</p>
										:
										<p className='self-end text-right font-medium cursor-pointer hover:underline'
											onClick={() => handleReply(index, null)}
										>cancel</p>
								}
							</div>
							{
								<div className={`${showReplies[index] ? 'block' : 'hidden'} pl-10 container bg-gray-100 p-3 transition-all duration-500 ease-in-out space-y-5`}>
									{cmt.listReplyComment.map((reply) => (
										<div className='text-sm'>
											<div className='flex justify-between items-center'>
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
											<p className='text-gray-600 mt-2'>{reply.text}</p>
										</div>
									))}
								</div>
							}
							{
								comment[index] !== null &&
								<div className='bg-gray-100 p-3 pl-10'>
									<textarea id='comment' onChange={(e) => handleReply(index, e.target.value)} className="w-full h-24 p-3 border cursor-text focus:outline-black flex items-center justify-center" type="text" placeholder="write a reply..." />
								</div>
							}
							<div className='my-5 border-[0.5px] border-gray-200'></div>
							{
								cmt.numberOfReplies > 0 &&
								<div className='w-full flex justify-center'>
									<p className='-translate-y-8 bg-white px-3 text-gray-600 hover:text-gray-900 hover:font-medium cursor-pointer'
										onClick={() => handleShow(index)}
									>{showReplies[index] ? 'hide' : 'show'} {cmt.numberOfReplies} replies</p>
								</div>
							}
						</div>
					))}
				</div>
			</div>
		</div >
	)
}

export default Post
