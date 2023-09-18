export const sizePresets: {[key: string]: [number, number]} = {
    twitterStream: [1600, 900],
    // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image
    // https://www.adobe.com/express/discover/sizes/twitter#:~:text=The%20ideal%20image%20size%20for%20Twitter%20Cards%20is%20800px%20by,or%201%3A1%20aspect%20ratio.
    twitterCard: [800, 418] ,
};

export function sizePreset(name: string | null) {
    return sizePresets[name || "twitterCard"];
}
