export const doApiCall = async (options) => {
    const {url, ...rest} = options;
    const response = await fetch(options.url, {
        ...rest
    });

    return response.json();
}
