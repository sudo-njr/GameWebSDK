using System;
using System.Runtime.InteropServices;
using UnityEngine;

namespace MySDK
{
    public static class Instance
    {
        [DllImport("__Internal")]
        private static extern void GameReady();
        [DllImport("__Internal")]
        private static extern void Ad(string type, Action beforeAd, Action callback);

        public static void Ready()
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            GameReady();
#else
            Debug.Log("GameReady");
#endif
        }

        public static void AdBreak(string type, Action beforeAd, Action callback)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            Ad(type, beforeAd, callback);
#else
            Debug.Log($"AdBreak {type}");
#endif
        }
    }
}