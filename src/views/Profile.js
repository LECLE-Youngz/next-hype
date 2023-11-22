import { useEffect, useState } from 'react'
import NFT from '../components/NFT';
import { MdOutlineLanguage } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom';
import { emailToWallet } from '../helpers/user';
import { getPosts } from '../helpers/social';
import PostPreview from '../components/PostPreview';
import { getInfoUser } from '../storage/local';

function Profile({ user }) {
	const regionNames = new Intl.DisplayNames(['en'], {
		type: 'language'
	});

	const [emailSearch, setEmailSearch] = useState("")
	const [nftSearch, setNFTSearch] = useState("")
	const [postSearch, setPostSearch] = useState("")
	const navigate = useNavigate()
	const [posts, setPosts] = useState([])
	const [wallet, setWallet] = useState(false)
	const [account, setAccount] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const wallet = await emailToWallet(emailSearch)
			setWallet(wallet)
		}
		fetchData()
	}, [emailSearch])

	useEffect(() => {
		const fetchData = async () => {
			let user = getInfoUser().user
			setAccount(user)

			let allPosts = await getPosts()
			allPosts = allPosts.filter(post => post.postOwner.id === user.id)
			setPosts(allPosts)
		};

		fetchData();
	}, []);

	return (
		<div className="flex flex-col justify-between">
			<div className='flex justify-between'>
				<h1 className="text-4xl text-gray-900"># View our{' '}
					<span className="twinkle-text">
						creator
					</span>
				</h1>
				<p className="self-center w-1/2 truncate border-b border-gray-900 text-3xl font-extralight text-right flex">
					<input className="text-right pr-1 appearance-none rounded-full flex-1 outline-none text-gray-600 w-full" placeholder="# Find user by email" type="text" required="" onChange={(e) => setEmailSearch(e.target.value)} />
					<button className="ml-5 bg-white border-t border-x border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-3 py-2 text-2xl disabled:pointer-events-none" aria-label="search" onClick={() => navigate(`/profile/${wallet.id}`)} disabled={!emailSearch || !wallet}>
						search
					</button>
				</p>
			</div>
			<div className="flex mt-10 mx-10 justify-between">
				<div className='flex justify-evenly w-3/5'>
					<img src={user.picture} className=" self-center shadow-xl h-40" alt="..." />
					<div className="self-center text-center space-y-2">
						<p className='flex text-4xl font-light text-gray-900'>{user.name}
							{
								account?.id !== user.id && (
									user.socialUser.followers.includes(account?.id) ?
										<span className='ml-5 border border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-gray-100 cursor-pointer py-2 px-6 text-xl self-center w-min'>unfollow</span>
										:
										<span className='ml-5 border border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-gray-100 cursor-pointer py-2 px-6 text-xl self-center w-min'>follow</span>
								)
							}
						</p>
						<div className='flex justify-evenly'>
							<div className="gap-2 flex items-center">
								<HiOutlineMail className="font-bold text-xl text-gray-500" />
								{user.email}
							</div>
							<div className="gap-2 flex items-center">
								<MdOutlineLanguage className="font-bold text-xl text-gray-500" />
								{regionNames.of(user.locale)}
							</div>
						</div>
						<div className="text-center leading-8">
							<span className='font-medium text-2xl text-gray-800'>
								{user.socialUser.followers.length}
							</span>
							{' '}followers {' '} / {' '}
							<span className='font-medium text-2xl text-gray-800'>
								{user.socialUser.following.length}
							</span>
							{' '}following
						</div>
					</div>
				</div>
				<div className='w-2/5 grid place-items-center'>
					<div className="text-right leading-8">
						<p className='text-2xl font-light text-gray-900'>## fun fact</p>
						{' '}there are{' '}
						<span className='font-medium text-2xl text-gray-800'>
							{user.socialUser.numNFTSold}
						</span>
						{' '}nfts have been sold and{' '}
						<span className='font-medium text-2xl text-gray-800'>
							{user.socialUser.numNFTPurchased}
						</span>
						{' '}nfts have been purchased. Also, there are{' '}
						<span className='font-medium text-2xl text-gray-800'>
							{user.socialUser.numPromptSold}
						</span>
						{' '}prompts have been sold and{' '}
						<span className='font-medium text-2xl text-gray-800'>
							{user.socialUser.numPromptPurchased}
						</span>
						{' '}prompts have been purchased by {user.name}.
					</div>
				</div>
			</div>
			<div className="flex justify-between mx-10 mt-10 mb-8">
				<p className="truncate border-b w-3/5 border-gray-900 text-2xl font-extralight text-right flex">
					<input className="pl-1 text-left appearance-none rounded-full flex-1 outline-none text-gray-600 w-full" placeholder="## find user's nfts" type="text" required="" onChange={(e) => setNFTSearch(e.target.value)} />
				</p>
				<p className="truncate w-min border-gray-900 text-2xl font-extralight">/</p>
				<p className="truncate border-b w-2/5 border-gray-900 text-2xl font-extralight text-right flex">
					<input className="text-right pr-1 appearance-none rounded-full flex-1 outline-none text-gray-600 w-full" placeholder="## find user's posts" type="text" required="" onChange={(e) => setPostSearch(e.target.value)} />
				</p>
			</div>
			<div className='flex mx-10 h-min'>
				<div className="flex w-3/5 flex-wrap justify-center">
					{
						user.nft.filter(nft => nft.name.toLowerCase().includes(nftSearch.toLowerCase())).map((nft) => (
							<NFT owner={user} {...nft} />
						))
					}
				</div>
				<div className='w-2/5 grid h-min mt-3 space-y-6'>
					{
						posts.filter(post =>
							post.header.toLowerCase().includes(postSearch.toLowerCase()) ||
							post.description.toLowerCase().includes(postSearch.toLowerCase()) ||
							post.text.toLowerCase().includes(postSearch.toLowerCase())
						).map(post =>
							<div className="h-min grid border w-full border-gray-200 hover:border-gray-900 cursor-pointer">
								<PostPreview {...post} />
							</div>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default Profile
