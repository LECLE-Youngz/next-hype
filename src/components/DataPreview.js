import { useState } from 'react'
import GenerationData from './GenerationData'

const fakeData = {
    meta: {
        prompt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies.",
        negative_prompt: "Nunc nisl ultrices nisl, eu ultricies nisl nisl eget nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl ultrices nisl, eu ultricies nisl nisl eget nisl.",
        model: "Lorem ipsum dolor sit amet.",
        vae: "Consectetur adipiscing elit.",
        W: 512,
        H: 512,
        revision: "Lorem ipsum dolor sit amet.",
        steps: 20,
        guidance_scale: 7.5,
        seed: 12345,
        safetychecker: "Lorem",
        enable_attention_slicing: "Lorem",
        instant_response: "Lorem",
    }
}

const DataPreview = ({ data }) => {
    const [metaPopup, setMetaPopup] = useState(false)

    let metadata = data ?? fakeData

    return (
        <>
            {
                metaPopup &&
                <GenerationData data={metadata} setMetaPopup={setMetaPopup} />
            }
            <div className="container grid hover:bg-gray-50 cursor-pointer" onClick={() => setMetaPopup(true)}>
                <div className="grid text-sm w-full divide-y-[0.5px] px-3 divide-gray-300 items-center overflow-y-auto max-h-[26rem]">
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.prompt}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.negative_prompt}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.model}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.vae}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.W}x{metadata.meta.H}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.revision}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.steps}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.guidance_scale}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.seed}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.safetychecker}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.enable_attention_slicing}
                    </p>
                    <p className="font-medium w-full px-4 py-3">
                        {metadata.meta.instant_response}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DataPreview
