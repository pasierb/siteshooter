export enum ScreenshotSizePreset {
  browserWindow = "browserWindow",
  twitterStream = "twitterStream",
  twitterCard = "twitterCard",

  iphone12pro = "iphone12pro",
  pixel5 = "pixel5",
}

export const screenshotSizePresets: {
  [key in ScreenshotSizePreset]: { width: number; height: number };
} = {
  // https://www.w3schools.com/browsers/browsers_display.asp
  [ScreenshotSizePreset.browserWindow]: { width: 1366, height: 768 },

  [ScreenshotSizePreset.twitterStream]: { width: 1600, height: 900 },

  // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image
  // https://www.adobe.com/express/discover/sizes/twitter#:~:text=The%20ideal%20image%20size%20for%20Twitter%20Cards%20is%20800px%20by,or%201%3A1%20aspect%20ratio.
  [ScreenshotSizePreset.twitterCard]: { width: 800, height: 418 },

  [ScreenshotSizePreset.iphone12pro]: { width: 390, height: 844 },
  [ScreenshotSizePreset.pixel5]: { width: 393, height: 851 },
};
