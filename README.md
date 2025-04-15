# GameWebSDK

## Overview

This is a guide for game website developers to integrate an ad SDK into their game website. It also includes instructions for game developers on how they would use the SDK in their games. This guide aims to make it easier for both parties to integrate the SDK and manage ads on game websites. This guide is licensed under MIT meaning you have the right to do whatever you want with this code, the rest is up to you.

## SDK Setup

### Editing the code

To start creating your SDK head to src/index.ts and edit the configuration at the top of the file.

#### Configration

```typescript
const config = {
  name: "MySDK", // Your SDK name
  sites: ["https://example.com", "cdn.example.com", "cdn2.example.com"], // Allowed sites (Sitelock will redirect to the first index.)
  logging: true, // Enable/Disable Console Logging
  displayAdTime: 120000, // Minimum time (ms) between display ads
};
```

#### Function Names (Optional)

This starter SDK includes two functions. "GameReady" tells your website that the game is finished loading. You can use this to setup a custom loading screen on your website's game page. "AdBreak" tells your website that it's time for the user to watch an advertisement. There are two types built-in. "display" are ads showed at an interval to ensure website profit. "rewarded" is an advertisement that the game developer manually adds to show an ad when earning a free skin for example.

```typescript
(window as any)[config.name] = {
  GameReady: function () {},
  AdBreak: function (type: "display" | "rewarded", beforeAd: () => void) {},
};
```

#### Compiling

This folder includes a package.json, tsconfig.json, and rollup configuration so you can bundle it for production. Once done upload it to your server for usage. Make sure you adjust the CORS for any website.

#### Usage

Since your SDK is now uploaded you can access it from your website. On your game page set up some logic like this. For the game developer it's different see the [Templates section](#Templates).

```html
<script src="https://cdn.example.com/sdk.js"></script>
<iframe src="https://cdn.example.com/Game/" id="game"></iframe>
<script>
  const frame = document.getElementById("game");
  let loading = true;
  window.addEventListener("message", (e) => {
    if (e.data == "GameReady") {
      loading = false;
    } else if (e.data == "AdBreak") {
      // You will need to setup your ad api third-party here
      AD_API.PLAY_AD().then(() => {
        e.source.window.postMessage("AdBreak Finished", "*");
      });
    }
  });
</script>
```

## Templates

### Supports

- [HTML](#html)
- [Construct 2 and 3](#construct-2-and-3)
- [Unity](#unity)

#### HTML

```html
<script src="https://cdn.example.com/sdk.js"></script>
<button id="skinClaim">Claim Skin (watch ad)</button>
<script>
  setTimeout(() => {
    window.MySDK.GameReady(); // Tell the SDK your game finished loading
    // Start display advertisement interval.
    window.MySDK.AdBreak("display", () => {
      // Pause game functionality.
    });
  }, 1000);

  document.getElementbyId("skinClaim").onclick = function () {
    // Show advertisement to claim reward.
    window.MySDK.AdBreak("rewarded", () => {
      // Pause game functionality.
    });
  };
</script>
```

#### Construct 2 and 3

```javascript
const script = document.createElement("script");
script.src = "https://cdn.example.com/sdk.js";

// After you import the code you use it the same as HTML
```

#### Unity

The unity template is the most complicated. You will have to start by downloading the [project folder](https://github.com/sudo-njr/GameWebSDK/blob/main/templates/unity). Once you've done that you can import your project files and use it like this.

```csharp
# At the top of the file type:
using MySDK;
```

##### Editing this template
Go to `templates/unity`. 