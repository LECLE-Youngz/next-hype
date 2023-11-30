import { useEffect, useState } from "react";

import { generateImage, fetchImage } from "../helpers/stablediffusion";
import { RiNftFill } from "react-icons/ri"
import Mint from "../components/Mint";
import { useLocation } from "react-router-dom";

export default function Generate() {
	const [response, setResponse] = useState(null);
	const [onGenerate, setOnGenerate] = useState(false);
	const { state } = useLocation();

	const [generateParams, setGenerateParams] = useState(state?.meta ?? {
		prompt: "",
		negative_prompt: "(worst quality, low quality, large head, extra digits:1.4) ",
		width: 512,
		height: 512,
		samples: 1,
		num_inference_steps: 20,
		safety_checker: "yes",
		enhance_prompt: "no",
		seed: null,
		guidance_scale: 7.5,
		multi_lingual: "no",
		panorama: "no",
		self_attention: "no",
		upscale: "no",
		embeddings_model: null,
		webhook: null,
		track_id: null
	});

	useEffect(() => {
		if (generateParams.seed === "") {
			setGenerateParams({ ...generateParams, seed: null })
		}
	}, [generateParams.seed])

	const imageSizeClass = {
		true: "bg-white border-gray-900 text-gray-500",
		false: "bg-gray-200 hover:bg-white text-gray-900 border-gray-200"
	};

	const inputClass = {
		false: "bg-white border-gray-900 text-gray-900",
		true: "bg-gray-200 text-gray-900 border-gray-200",
	}

	const previewSizeClass = (ratio) => ratio === 1 ? "w-[20rem] h-[20rem]" : ratio > 1 ? "w-[20rem] h-[32rem]" : "w-[32rem] h-[20rem]"

	const generate = async () => {
		setOnGenerate(true)
		setResponse(null)
		const res = await generateImage(generateParams)

		if (res.status === "processing") {
			console.log(res)
			const img = await fetchImage(res.id)
			console.log(img)
		} else if (res.status !== "success") {
			setResponse("failed")
			setOnGenerate(false)
			return
		}

		setOnGenerate(false)
		setResponse(res)
	}

	const [copy, setCopy] = useState("Click to copy")
	const resetTooltip = () => {
		setTimeout(() => {
			setCopy("Click to copy")
		}, 50)
		document.removeEventListener("mouseout", resetTooltip);
	};
	const copyText = (text) => {
		navigator.clipboard.writeText(text)
		setCopy("Copied to clipboard!")
		document.addEventListener("mouseout", resetTooltip);
	}

	const [mintPopup, setMintPopup] = useState(false);

	return (
		<div className="flex flex-col justify-between">
			{mintPopup && <Mint response={response} setMintPopup={setMintPopup} />}
			<h1 className="text-4xl text-gray-900"># Turn your{' '}
				<span className="twinkle-text">
					imagination
				</span>{' '}into NFTs</h1>
			<div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
				<p className="border-b truncate w-1/2 border-gray-900 text-2xl font-extralight">## specify your generation parameters below</p>
				<p className="w-min border-gray-900 text-2xl font-extralight">/</p>
				<p className="border-b truncate w-1/2 border-gray-900 text-2xl font-extralight text-right">## preview your image</p>
			</div>
			<div className="text-gray-900 mx-5 font-light grid grid-cols-2">
				<div className="grid items-center mx-auto w-5/6">
					<div className="gap-y-2 mx-auto w-full z-20">
						<p className="self-center mb-2">### prompt</p>
						<textarea onChange={(e) => setGenerateParams({ ...generateParams, prompt: e.target.value })} className={`${inputClass[generateParams.prompt === ""]} w-full h-24 p-3 border cursor-text focus:outline-black flex items-center justify-center `} type="text" defaultValue={generateParams.prompt} />
						<p className="self-center mb-2 mt-5">### negative prompt</p>
						<textarea onChange={(e) => setGenerateParams({ ...generateParams, negative_prompt: e.target.value })} className={`${inputClass[generateParams.negative_prompt === ""]} w-full h-24 p-3 border cursor-text focus:outline-black flex items-center justify-center `} type="text" defaultValue={generateParams.negative_prompt} />
						<div className="w-full justify-between flex">
							<div className="w-1/2">
								<p className="self-center mt-5 mb-2">### size</p>
								<div className="w-full flex gap-4 items-center justify-between group">
									<div className={`${imageSizeClass[generateParams.height === 768 && generateParams.width === 512] + " w-16 h-24 border flex items-center cursor-pointer"}`}
										onClick={() => setGenerateParams({ ...generateParams, height: 768, width: 512 })}
									>
										<p className="text-center text-sm w-full">512x768</p>
									</div>
									<div className={`${imageSizeClass[generateParams.height === 512 && generateParams.width === 512] + " w-16 h-16 border flex items-center cursor-pointer"}`}
										onClick={() => setGenerateParams({ ...generateParams, height: 512, width: 512 })}
									>
										<p className="text-center text-sm w-full">512x512</p>
									</div>
									<div className={`${imageSizeClass[generateParams.height === 512 && generateParams.width === 768] + " w-24 h-16 border flex items-center cursor-pointer"}`}
										onClick={() => setGenerateParams({ ...generateParams, height: 512, width: 768 })}
									>
										<p className="text-center text-sm w-full">768x512</p>
									</div>
								</div>
								<p className="self-center mb-2 mt-5">### steps</p>
								<div className="w-full flex">
									<input
										type="range" min="10" max="50" step="1" onChange={(e) => setGenerateParams({ ...generateParams, num_inference_steps: e.target.value })} defaultValue={generateParams.num_inference_steps}
										className="self-center transparent h-1 w-full cursor-pointer appearance-none border-transparent bg-gray-200 accent-gray-900 hover:accent-gray-500"
										id="customRange1" />
									<label for="customRange1" className="self-center text-base text-gray-900 w-1/12 text-right">{generateParams.num_inference_steps}</label>
								</div>
								<p className="self-center mb-2 mt-5">### cfg scale</p>
								<div className="w-full flex">
									<input
										type="range" min="1" max="20" step="0.5" onChange={(e) => setGenerateParams({ ...generateParams, guidance_scale: e.target.value })} defaultValue={generateParams.guidance_scale}
										className="self-center transparent h-1 w-full cursor-pointer appearance-none border-transparent bg-gray-200 accent-gray-900 hover:accent-gray-500"
										id="customRange1" />
									<label for="customRange1" className="self-center text-base text-gray-900 w-1/12 text-right">{Number(generateParams.guidance_scale).toFixed(1)}</label>
								</div>
							</div>
							<div className="mx-5 mt-5 border-r border-gray-900"></div>
							<div className="grid w-1/2">
								<p className="self-center mb-2 mt-5">### seed</p>
								<input onChange={(e) => setGenerateParams({ ...generateParams, seed: e.target.value })} className={`${inputClass[generateParams.seed === null]} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `} type="number" defaultValue={generateParams.seed} />
								<p className="self-center mb-2 mt-5">### nsfw filter</p>
								<div className="w-full flex">
									<button onClick={() => setGenerateParams({ ...generateParams, safety_checker: "yes" })}
										className={`${inputClass[generateParams.safety_checker !== "yes"]} border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}>
										<p className="text-center w-full">yes</p>
									</button>
									<button onClick={() => setGenerateParams({ ...generateParams, safety_checker: "no" })}
										className={`${inputClass[generateParams.safety_checker !== "no"]} border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}>
										<p className="text-center w-full">no</p>
									</button>
								</div>
								<p className="self-center mb-2 mt-5">#### enhance prompt</p>
								<div className="w-full flex">
									<button onClick={() => setGenerateParams({ ...generateParams, enhance_prompt: "yes" })}
										className={`${inputClass[generateParams.enhance_prompt !== "yes"]}  border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}>
										<p className="text-center w-full">yes</p>
									</button>
									<button onClick={() => setGenerateParams({ ...generateParams, enhance_prompt: "no" })}
										className={`${inputClass[generateParams.enhance_prompt !== "no"]}  border cursor-pointer none h-12 w-1/2 flex items-center justify-center`}>
										<p className="text-center w-full">no</p>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='flex'>
						<button className={`${onGenerate ? "border-gray-900 cursor-default" : "hover:border-gray-500"} group h-12 w-40 mt-10 mx-auto border border-gray-900 hover:bg-gray-900 transition duration-300 disabled:cursor-default disabled:pointer-events-none`} onClick={() => generate()} disabled={onGenerate}>
							<div className="relative flex items-center space-x-4 justify-center">
								<span className="block text-gray-900 text-sm transition duration-300 group-hover:text-gray-200 sm:text-base">
									{
										!onGenerate ?
											"Summit"
											:
											<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
									}
								</span>
							</div>
						</button>
					</div>
				</div>
				<div className="flex flex-col items-center mt-10">
					<div className={`${previewSizeClass(generateParams.height / generateParams.width)} ${inputClass[typeof response !== "object" || response == null]}  border-gray-400  border-[1.5px] border-dashed grid self-center`}>
						{
							typeof response === "object" && response !== null ? (
								<div className="relative">
									<img src={response?.output?.[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="xl" />
									<div className={`${onGenerate ? "block" : "hidden"} absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
									</div>
								</div>
							) : (
								<div className="relative grid">
									<div className="self-center text-center text-xl w-full flex justify-center">
										{response === "failed" ?
											"failed to generate image"
											: onGenerate ?
												<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
												: "preview image"
										}
									</div>
								</div>
							)
						}
					</div>
					<div className="mt-10">
						<button className={`group h-12 w-40 mx-auto border border-gray-900 hover:bg-gray-900 transition duration-300 disabled:cursor-default disabled:pointer-events-none`} onClick={() => setMintPopup(true)} disabled={typeof response !== "object" || response == null}>
							<div className="relative flex items-center space-x-4 justify-center">
								<span className="block text-gray-900 text-sm transition duration-300 group-hover:text-gray-200 sm:text-base">
									<RiNftFill className="inline-block mr-2" /> Mint NFT
								</span>
							</div>
						</button>
					</div>
				</div>
			</div>
			{
				typeof response === "object" && response !== null &&
				<div className="w-full mx-5">
					<h3 className="mt-10 mb-5 text-2xl text-gray-900 mx-5 font-extralight">## generation details</h3>
					<div className=" mx-14 border border-dashed border-gray-200 bg-gray-100 p-5 ">
						{
							<div className="grid grid-cols-6 gap-x-10 gap-y-5 items-center">
								<p className="">### generation time</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(response.generationTime)}>
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.generationTime} s
								</p>
								<p className="">### prompt</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(response.meta.prompt)}>
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.prompt}
								</p>
								<p className="">### negative prompt</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(response.meta.negative_prompt)}>
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.negative_prompt}
								</p>
								<p className="">### model</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(response.meta.model)}>
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.model}
								</p>
								<p className="">### vae</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(response.meta.vae)}>
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.vae}
								</p>
								<p className="">### size</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(response.meta.W + "x" + response.meta.H)}>
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.W}x{response.meta.H}
								</p>
								<p className="">### revision</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.revision}
								</p>
								<p className="">### steps</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(response.meta.steps)}>
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.steps}
								</p>
								<p className="">### cfg scale</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(response.meta.guidance_scale)}>
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.guidance_scale}
								</p>
								<p className="">### seed</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full" onClick={() => copyText(response.meta.seed)}>
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.seed}
								</p>
								<p className="">### nsfw filter</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.safetychecker}
								</p>
								<p className="">### attention slicing</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.enable_attention_slicing}
								</p>
								<p className="">### instant response</p>
								<p className="group relative font-medium col-span-5 hover:bg-gray-200 hover:cursor-pointer py-2 px-4 hover:text-gray-800 w-full">
									<span className="pointer-events-none absolute right-4 bottom-2 opacity-0  transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.instant_response}
								</p>
							</div>
						}
					</div>
				</div>
			}
		</div>
	);
}