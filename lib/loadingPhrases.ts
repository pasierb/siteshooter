const loadingMessages = [
  // Non-Alpaca Messages
  "Summoning pixel fairies...",
  "Chasing digital butterflies for the perfect shot...",
  "Wrangling rogue pixels into place...",
  "Distilling the essence of the Internet, one site at a time...",
  "Teaching cameras to browse the web...",
  "Putting on our best digital attire for the snap...",
  "Asking the web to hold still and say 'cheese'...",
  "Gathering digital stardust for clarity...",
  "Convincing the Internet to pose just right...",
  "Hiring pixel artists for a one-second masterpiece...",
  "Organizing pixels in a conga line...",
  "Taming wild web elements for a moment...",
  "Requesting the digital wind to calm down...",
  "Bribing pixels with extra brightness...",
  "Serenading the website to smile...",
  "Tuning the virtual strings for a clear shot...",
  "Polishing the virtual lens for maximum clarity...",
  "Rehearsing the ultimate screenshot performance...",
  "Directing the digital actors on the web stage...",
  "Shushing noisy pixels for a crisp capture...",
  "Dancing with the site's elements...",
  "Wooing the web to look its best...",
  "Negotiating with stubborn pixels...",
  "Coaxing the colors to shine brighter...",
  "Rolling out the red carpet for the site...",
  "Synchronizing with the site's rhythm...",
  "Perfecting every pixel's posture...",
  "Crafting a digital masterpiece just for you...",
  "Cueing the digital orchestra for the snap...",
  "Hosting a pixel parade for the shot...",
  "Seeking the golden ratio in the digital realm...",
  "Adjusting the pixel mood lighting...",
  "Priming the canvas for web art...",

  // Alpaca-Themed Messages
  "Our alpaca is lining up the perfect shot...",
  "Grooming the alpaca's fur for high-resolution snaps...",
  "Alpaca is on a pixel-grazing adventure...",
  "Adjusting the alpaca's camera, hang tight!",
  "Alpaca says, 'Just a sec, getting that webpage in frame'...",
  "Our alpaca is herding pixels for the ideal capture...",
  "Alpaca is trekking the digital mountains for your screenshot...",
  "Wait up! Alpaca's weaving a screenshot tapestry...",
  "Alpaca's navigating the web jungle for the best view...",
  "Guiding the alpaca through the site maze, capture incoming...",
  "Alpaca's spinning a yarn of pixel tales...",
  "Our alpaca's consulting with the web llama for the shot...",
  "Alpaca's warming up for the web runway...",
  "Setting up the alpaca's digital art studio...",
  "Alpaca's asking pixels to form an orderly queue...",
  "Alpaca's sipping some pixelade, snap in a moment!",
];

export function messagesGenerator() {
  let samples = [...loadingMessages];

  return function nextMessage(): string {
    const idx = Math.floor(Math.random() * samples.length);
    return samples.splice(idx, 1)[0];
  };
}
