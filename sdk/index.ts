const config = {
  name: "MySDK",
  sites: ["https://example.com", "cdn.example.com", "cdn2.example.com"],
  logging: true,
  displayAdTime: 120000,
};

const host = window.location.hostname;

function local() {
  return host == "localhost" || host == "127.0.0.1";
}

// Handles every call to the SDK
function call(message: string) {
  if (window.top) {
    // SiteLock
    if (!config.sites.includes(host) || local()) {
      window.location.href = config.sites[0];
    }

    window.top.postMessage(message, "*");
    if (config.logging) {
      console.log(`${config.name}: ${message}`);
    }
  } else {
    console.error("No Parent Window Detected");
  }
}

let adTime: number;
const fname = this.constructor.name;

(window as any)[config.name] = {
  GameReady: function () {
    adTime = Date.now();
    call(fname);
  },
  AdBreak: function (type: "display" | "rewarded", beforeAd: () => void) {
    return new Promise<void>((resolve) => {
      beforeAd();
      call(fname);

      if (
        (type === "display" &&
          adTime &&
          Date.now() - adTime > config.displayAdTime) ||
        type === "rewarded"
      ) {
        if (document.referrer == config.sites[0]) {
          window.addEventListener("message", (e) => {
            if (e.data == fname + "Finished") {
              adTime = Date.now();
              resolve();
            }
          });
        } else if (local()) {
          // Replicate 1.5s advertisement during development
          setTimeout(() => {
            console.log(fname + "Finished");
            resolve();
          }, 1500);
        }
      }
    });
  },
};
