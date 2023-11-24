export const parsePrompt = (prompt) => {
    let upscale, width, height

    const origin = [512, 768]

    if (origin.includes(prompt.W) && origin.includes(prompt.H)) {
        upscale = "no"
        width = prompt.W
        height = prompt.H
    } else {
        upscale = "yes"

        width = prompt.W > prompt.H ? 768 : 512
        height = prompt.W >= prompt.H ? 512 : 768
    }

    return {
        prompt: prompt.prompt,
        negative_prompt: prompt.negative_prompt,
        width: width,
        height: height,
        samples: prompt.n_samples,
        num_inference_steps: prompt.steps,
        safety_checker: prompt.safetychecker,
        enhance_prompt: "no",
        seed: prompt.seed,
        guidance_scale: prompt.guidance_scale,
        multi_lingual: "no",
        panorama: "no",
        self_attention: "no",
        upscale: upscale,
        embeddings_model: null,
        webhook: null,
        track_id: null
    }
}

export const parsePost = (post) => {
    return {
        header: post.header,
        description: post.description,
        text: post.text,
        tags: post.tags,
        nsfwContent: false,
        exclusiveContent: false,
        nft: post.nft,
        data: null
    }
}