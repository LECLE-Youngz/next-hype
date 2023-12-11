import { useEffect, useState } from "react";
import { getCollections, getNFTs } from "../helpers/nft";
import CollectionPreview from "../components/CollectionPreview";
import Collection from "../components/Collection";
import CreateEvent from "../components/CreateEvent";
import { getEvents } from "../helpers/social";
import EventPreview from "../components/EventPreview";
import { Link } from "react-router-dom";

export default function Events() {
	const [search, setSearch] = useState("");
	const [createEvent, setCreateEvent] = useState(false);
	const [events, setEvents] = useState(null);
	const [newEvent, setNewEvent] = useState(null);
	const [tags, setTags] = useState(null);
	const [chosenTag, setChosenTag] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const res = await getEvents();
			const tags = [];
			for (let i = 0; i < res.length; i++) {
				const event = res[i];
				if (tags.filter((tag) => tag.tag === event.tag).length === 0) {
					tags.push({ tag: event.tag, count: 1 });
				} else {
					tags.filter((tag) => tag.tag === event.tag)[0].count++;
				}
			}
			setTags(tags);
			setEvents(res);
			setNewEvent(res);
		};

		fetchData();
	}, [search]);

	useEffect(() => {
		if (events === null) return;
		if (chosenTag === "") {
			setNewEvent(events);
			return;
		}
		const newEvents = events.filter((event) => event.tag === chosenTag);
		setNewEvent(newEvents);
	}, [chosenTag]);

	if (events === null) {
		return (
			<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="h-full w-full flex items-center justify-center">
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-between">
			{createEvent && <CreateEvent setCreateEvent={setCreateEvent} />}
			<div className="flex justify-between">
				<h1 className="text-4xl text-gray-900">
					# Ongoing <span className="twinkle-text">events</span>{" "}
				</h1>
				<button
					className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
					onClick={() => setCreateEvent(true)}
				>
					Create event
				</button>
			</div>
			<div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
				<p className="truncate border-b w-1/4 border-gray-900 text-2xl font-extralight">
					## choose your tags
				</p>
				<p className="truncate w-min border-gray-900 text-2xl font-extralight">
					/
				</p>
				<p className="truncate border-b w-3/4 border-gray-900 text-2xl font-extralight text-right flex">
					<input
						className="text-right appearance-none rounded-full flex-1 outline-none text-gray-600 w-full pr-1"
						placeholder="## find events"
						type="text"
						required=""
						onChange={(e) => setSearch(e.target.value)}
					/>
				</p>
			</div>
			<div className="grid grid-cols-4 mx-10 gap-10">
				<div className="flex flex-wrap gap-3 h-min">
					{[...tags].reverse().map((tag) => (
						<div
							className={`${
								chosenTag === tag.tag
									? "bg-gray-900 text-gray-100"
									: "text-gray-900 hover:text-gray-100 hover:bg-gray-900 "
							} group cursor-pointer border border-gray-900 py-2 px-4 h-min`}
							onClick={() => setChosenTag(chosenTag === tag.tag ? "" : tag.tag)}
						>
							{chosenTag === tag.tag ? (
								<div className="btn-group relative w-full">
									<span className="group-hover:invisible visible">
										{tag.tag} &nbsp;|&nbsp; {tag.count}
									</span>
									<span className="group-hover:block hidden absolute top-0 w-full">
										{tag.tag} &nbsp;|&nbsp; x
									</span>
								</div>
							) : (
								<span className="">
									{tag.tag} &nbsp;|&nbsp; {tag.count}
								</span>
							)}
						</div>
					))}
				</div>
				<div className="col-span-3 flex flex-wrap gap-y-6 justify-evenly">
					{newEvent.map((event) => (
						<EventPreview {...event} />
					))}
				</div>
			</div>
		</div>
	);
}
