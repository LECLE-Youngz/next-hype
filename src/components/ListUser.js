import React, { useEffect, useState } from "react";
import { getUsers } from "../helpers/user";
import { Link } from "react-router-dom";

const ListUser = ({ ids, name, setListUserPopup }) => {
	const [users, setUsers] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			let users = [];
			for (let i = 0; i < ids.length; i++) {
				const user = await getUsers(ids[i]);
				users.push(user);
			}
			setUsers(users);
		};
		fetchData();
	}, []);

	if (users === null) {
		return (
			<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="h-full w-full flex items-center justify-center">
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			<div className="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-5/12">
				<div className="bg-white shadow-xl w-full px-16 py-5 h-3/4">
					<h3 className="self-center text-4xl mt-4 mb-5 text-gray-900">
						# {name}
					</h3>
					<div class="container mx-auto mt-10">
						{users.length === 0 ? (
							<div className="mb-10 text-center">
								<p className="text-2xl text-gray-500">
									There is no user in this list.
								</p>
							</div>
						) : (
							<div className="mb-10 overflow-y-auto space-y-2 max-h-[26rem]">
								{users.map((user, index) => (
									<Link
										to={`/profile/${user.id}`}
										onClick={() => setListUserPopup(false)}
										className={`flex items-center justify-between border hover:border-gray-800 px-5 py-3 place-items-center`}
									>
										<span className="flex items-center space-x-5">
											<p className={`text-base font-bold`}>{index + 1}</p>
											<img
												src={user.picture}
												className={`w-12 h-12`}
												alt="..."
											/>
											<p className={`text-base font-semibold`}>{user.name}</p>
										</span>
									</Link>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
			<div
				className="h-screen w-screen absolute -z-10"
				onClick={() => setListUserPopup(false)}
			></div>
		</div>
	);
};

export default ListUser;
