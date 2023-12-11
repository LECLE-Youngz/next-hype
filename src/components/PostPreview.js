import { useEffect, useState } from "react";
import {
	BiUpvote,
	BiComment,
	BiBookmark,
	BiSolidUpvote,
	BiSolidBookmark,
} from "react-icons/bi";
import { getInfoUser } from "../storage/local";
import { Link } from "react-router-dom";
import {
	getPosts,
	toggleBookmarkPost,
	toggleLikePost,
} from "../helpers/social";
import Subscribe from "./Subscribe";

function PostPreview({ postId, setManageBookmarksPopup }) {
	const [account, setAccount] = useState(null);
	const [post, setPost] = useState(null);
	const [subscribePopup, setSubscribePopup] = useState(false);

	const [likeUpdating, setLikeUpdating] = useState(false);
	const [bookmarkUpdating, setBookmarkUpdating] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const user = getInfoUser().user;
			setAccount(user);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (post && !subscribePopup) return;
		const fetchData = async () => {
			const post = await getPosts(postId);
			setPost(post);
		};
		fetchData();
	}, [likeUpdating, bookmarkUpdating, subscribePopup]);

	const toggleLike = async () => {
		setLikeUpdating(true);
		await toggleLikePost(postId);
		setLikeUpdating(false);
	};

	const toggleBookmark = async () => {
		setBookmarkUpdating(true);
		await toggleBookmarkPost(postId);
		setBookmarkUpdating(false);
	};

	if (post === null) {
		return (
			<div className="h-56 w-full flex justify-center">
				<div className="animate-spin self-center rounded-full w-10 h-10 border-b-2 border-gray-500"></div>
			</div>
		);
	}

	return (
		<div className="group grid border w-[31rem] h-56 relative group">
			{subscribePopup && (
				<Subscribe
					user={post.postOwner}
					setSubscribePopup={setSubscribePopup}
				/>
			)}

			{post.exclusiveContent ? (
				<div className="absolute inset-0 grad p-[1.5px]"></div>
			) : (
				<div className="bg-white absolute inset-0 group-hover:bg-gray-900 p-[1.5px]"></div>
			)}

			{post.exclusiveContent && !post.text && (
				<div className="hidden group-hover:flex absolute inset-0 flex-col justify-center items-center text-white text-xl text-light">
					This post is exclusive content
					<div
						className="border-white border py-2 px-6 mt-4 cursor-pointer hover:text-red-500 hover:bg-white duration-200"
						onClick={() => setSubscribePopup(true)}
					>
						subscribe
					</div>
				</div>
			)}

			<div
				className={`absolute inset-0 bg-white m-[1.5px] ${
					post.exclusiveContent && !post.text ? "group-hover:hidden" : ""
				}`}
			>
				<div className="mx-4 mt-4 container">
					<p className="truncate container overflow-hidden w-[29rem] text-gray-900 text-sm font-light">
						{post.tags.length === 0 ? (
							<span className="font-medium">no tags available</span>
						) : (
							<span className="font-medium">posted in </span>
						)}
						{post.tags.map((tag) => (
							<>
								<Link
									onClick={() =>
										setManageBookmarksPopup && setManageBookmarksPopup(false)
									}
									to={`/social/${tag}`}
									className=" hover:underline underline-offset-2"
								>
									{tag}
								</Link>
								<span className="mx-1">
									{tag === post.tags[post.tags.length - 1] ? "" : "/"}
								</span>
							</>
						))}
					</p>
				</div>
				<div
					className={`flex space-x-4 p-4 ${
						post.exclusiveContent && !post.text ? "pointer-events-none" : ""
					}`}
				>
					{post.nft ? (
						<img
							src={post.nft.image}
							className="border-gray-100 h-[9.5rem] object-cover"
							alt="..."
							style={{
								objectFit: "cover",
								backgroundSize: "cover",
								backgroundClip: "cover",
							}}
						/>
					) : (
						<div className="border-gray-100 w-full"></div>
					)}
					<div className="w-full flex flex-col space-y-3 content-between container">
						<Link
							to={`/social/${postId}`}
							className={`grid text-gray-900 hover:text-gray-500 cursor-pointer`}
							onClick={() =>
								setManageBookmarksPopup && setManageBookmarksPopup(false)
							}
						>
							<p className="font-serif text-xl font-bold truncate">
								{post.header}
							</p>
							<p className="text-xs font-light">by {post.postOwner.name}</p>
						</Link>
						<p className="bg-gray-200 p-[0.75rem] text-xs w-[18.5rem] container truncated-text h-[4.5rem]">
							{post.description}
						</p>
						<div className="place-self-end flex space-x-5 text-lg text-gray-600">
							{!likeUpdating ? (
								post.likes.includes(account.id) ? (
									<div
										className="cursor-pointer w-8 space-x-1 flex items-center hover:text-red-400 text-red-600"
										onClick={() => toggleLike()}
									>
										<BiSolidUpvote className="" />
										<p className="text-sm">{post.likes.length}</p>
									</div>
								) : (
									<div
										className="cursor-pointer w-8 space-x-1 flex items-center hover:text-red-400"
										onClick={() => toggleLike()}
									>
										<BiUpvote className="" />
										<p className="text-sm">{post.likes.length}</p>
									</div>
								)
							) : (
								<div className="flex w-8 justify-center">
									<div className="self-center animate-spin rounded-full w-5 h-5 border-b-2 border-gray-500"></div>
								</div>
							)}
							<Link
								className="space-x-1 flex items-center group cursor-pointer hover:text-gray-400"
								to={`/social/${postId}#comment`}
								onClick={() =>
									setManageBookmarksPopup && setManageBookmarksPopup(false)
								}
							>
								<BiComment className="" />
								<p className="text-sm">{post.listComment.length}</p>
							</Link>
							{!bookmarkUpdating ? (
								post.bookmark.includes(account.id) ? (
									<div
										className="cursor-pointer space-x-1 flex items-center hover:text-blue-400 text-blue-600"
										onClick={() => toggleBookmark()}
									>
										<BiSolidBookmark className="" />
										<p className="text-sm">{post.bookmark.length}</p>
									</div>
								) : (
									<div
										className="cursor-pointer space-x-1 flex items-center hover:text-blue-400 text-gray-500"
										onClick={() => toggleBookmark()}
									>
										<BiBookmark className="" />
										<p className="text-sm">{post.bookmark.length}</p>
									</div>
								)
							) : (
								<div className="flex w-8 justify-center">
									<div className="self-center animate-spin rounded-full w-5 h-5 border-b-2 border-gray-500"></div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PostPreview;
