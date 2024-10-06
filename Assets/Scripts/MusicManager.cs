using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MusicManager : MonoBehaviour
{
    // Audio source component to play music
    private AudioSource audioSource;
    // Singleton instance
    private static MusicManager instance;

    // Method to access the singleton instance
    public static MusicManager Instance
    {
        get
        {
            if (instance == null)
            {
                // Check if an instance already exists in the scene
                instance = FindObjectOfType<MusicManager>();

                // If no instance exists, create a new GameObject and add MusicManager component
                if (instance == null)
                {
                    GameObject singletonObject = new GameObject("MusicManager");
                    instance = singletonObject.AddComponent<MusicManager>();          
                }
            }
            return instance;
        }
    }


    private void Awake()
    {
        // Ensure the singleton instance persists between scenes
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject); // Ensure this GameObject persists between scene loads
            audioSource = gameObject.AddComponent<AudioSource>(); // Adding AudioSource component
        }
       else if (instance != this)
            {
            // If another MusicManager instance exists, destroy this one
            Destroy(gameObject);
           
        }
    }


    public void PlayMusic(AudioClip clip, bool ignorePause = false)
    {
        if (clip != null && audioSource != null)
        {
            audioSource.clip = clip;
            audioSource.loop = false;
            audioSource.playOnAwake = false;
            audioSource.Play();
            if (ignorePause)
            {
                audioSource.ignoreListenerPause = true;
            }
        }
        else
        {
            Debug.LogWarning("MusicManager: AudioClip or AudioSource is null.");
        }
    }

}