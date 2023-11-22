import { useEffect, useState } from 'react'
import { BiUpvote, BiComment, BiBookmark, BiSolidUpvote, BiSolidComment, BiSolidBookmark } from "react-icons/bi";
import { getInfoUser } from '../storage/local';
import { Link } from 'react-router-dom';
import { getPosts, toggleLikePost } from '../helpers/social';
import { includes } from 'lodash';

function PostPreview({ postId, text, header, description, bookmark, listLike, listComment, tags, nft, postOwner }) {
	const [account, setAccount] = useState(null)

	const [likes, setLikes] = useState({ num: null, liked: null })
	const [likeUpdating, setLikeUpdating] = useState(false)
	const [bookmarks, setBookmarks] = useState(bookmark)
	const [bookmarkUpdating, setBookmarkUpdating] = useState(false)

	useEffect(() => {
		const user = getInfoUser().user
		setLikes({ num: listLike.length, liked: listLike.includes(user?.id) })
		setAccount(user);
	}, [])

	const toggleLike = async () => {
		setLikeUpdating(true)
		toggleLikePost(postId)
		const post = await getPosts(postId)
		setLikes({ num: post.listLike.length, liked: post.listLike.includes(account?.id) })
		setLikeUpdating(false)
	}

	return (
		<>
			<div className='mx-4 mt-4 flex'>
				{tags.map(tag =>
					<>
						<Link to={`/social/${tag}`} className='text-gray-900 text-sm font-light truncate hover:underline underline-offset-2'>{tag}</Link>
						<span className='text-gray-900 text-sm font-light mx-1'>{tag === tags[tags.length - 1] ? '' : '/'}</span>
					</>
				)}
			</div>
			<div className='flex space-x-4 p-4'>
				{
					nft ?
						<img
							src={nft.thumbnail}
							className="border-gray-100 w-1/3 object-cover"
							alt="..."
							style={{ objectFit: 'cover', backgroundSize: 'cover', backgroundClip: 'cover' }}
						/> : <div className='border-gray-100 w-full'></div>
				}
				<div className='w-full flex flex-col space-y-3 content-between'>
					<Link to={`/social/${postId}`} className='group grid'>
						<p className='text-gray-900 group-hover:text-gray-500 font-serif text-xl font-bold truncate'>{header}</p>
						<p className='text-gray-900 group-hover:text-gray-500 text-xs font-light'>by {postOwner.name}</p>
					</Link>
					<div className='bg-gray-200 p-3 text-xs h-full'>
						{description}
					</div>
					<div className='place-self-end flex space-x-5 text-lg text-gray-600'>
						{
							!likeUpdating ?
								likes?.liked ?
									<div className='cursor-pointer w-8 space-x-1 flex items-center hover:text-red-400 text-red-600' onClick={() => toggleLike()}>
										<BiSolidUpvote className='' />
										<p className='text-sm'>{likes?.num}</p>
									</div>
									:
									<div className='cursor-pointer w-8 space-x-1 flex items-center hover:text-red-400' onClick={() => toggleLike()}>
										<BiUpvote className='' />
										<p className='text-sm'>{likes?.num}</p>
									</div>
								:
								<div className='flex w-8 justify-center'>
									<div className='self-center animate-spin rounded-full w-5 h-5 border-b-2 border-gray-500'></div>
								</div>
						}
						<Link className='space-x-1 flex items-center group cursor-pointer hover:text-gray-400' to={`/social/${postId}#comment`}>
							<BiComment className='' />
							<p className='text-sm'>{listComment.length}</p>
						</Link>
						{
							bookmarks.includes(account?.id) ?
								<div className='cursor-pointer space-x-1 flex items-center hover:text-blue-400 text-blue-600'>
									<BiSolidBookmark className='' />
									<p className='text-sm'>{bookmarks.length}</p>
								</div>
								:
								<div className='cursor-pointer space-x-1 flex items-center hover:text-blue-400 text-gray-500'>
									<BiBookmark className='' />
									<p className='text-sm'>{bookmarks.length}</p>
								</div>
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default PostPreview
