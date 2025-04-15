mergeInto(LibraryManager.library, {
  GameReady: function () {
    MySDK.GameReady();
  },
  Ad: function (type, beforeAd, callback) {
    MySDK.AdBreak(type, beforeAd()).then(() => callback());
  },
});
