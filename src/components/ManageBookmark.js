import { useEffect, useState } from 'react'
import PostPreview from './PostPreview'
import { getBookmarks } from '../helpers/social'

function ManageBookmarks({ userId, setManageBookmarksPopup }) {
    const [bookmarks, setBookmarks] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const bookmarks = await getBookmarks(userId)
            setBookmarks(bookmarks)
        }

        fetchData()
    }, [])

    if (bookmarks === null) {
        return (
            <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
                <div className='h-full w-full flex items-center justify-center'>
                    <div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
                </div>
            </div>
        )
    }

    return (
        <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
            <div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-[72rem] w-3/4">
                <div className="bg-white shadow-xl w-full px-16 py-5 relative">
                    <h3 className="self-center text-4xl mt-4 mb-5 text-gray-900"># Manage bookmarks</h3>
                    <div className="container mx-auto">
                        {bookmarks.length === 0 ?
                            <div className="mt-10 text-center">
                                <p className="text-2xl text-gray-500">
                                    You don't have any bookmarks yet.
                                </p>
                            </div>
                            :
                            <div className="mt-10 flex flex-wrap gap-x-4 overflow-y-auto overflow-x-hidden max-h-[26rem]">
                                {bookmarks.map((bookmark) => (
                                    <div className='grid border my-2 h-56 w-[31rem] border-gray-200 hover:border-gray-900'>
                                        <PostPreview postId={bookmark} setManageBookmarksPopup={setManageBookmarksPopup} />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="py-10 space-y-2 text-gray-600 sm:-mb-8">
                        <p className="text-xs">{'<!-- '}Actions to your bookmarked posts is accessed from here.{' -->'}</p>
                        <p className="text-xs">
                            {'<!-- '}Any action will not need to send a transaction to the blockchain.{' -->'}
                        </p>
                    </div>
                </div>
            </div>
            <div className='h-screen w-screen absolute -z-10' onClick={() => setManageBookmarksPopup(false)}></div>
        </div >
    )
}

export default ManageBookmarks
