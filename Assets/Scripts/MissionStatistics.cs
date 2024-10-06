using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class MissionStatistics : MonoBehaviour
{
    public Transform earthTransform;
    public Transform playerTransform;
    public TextMeshProUGUI distanceText;
    //public TextMeshProUGUI speedText;
    public TextMeshProUGUI durationText;
    public TextMeshProUGUI coordinatesText;
    public AudioClip checkpointSound;
    public AudioSource bgm;
    public GameObject panel;

    public TextMeshProUGUI controlText;

    private float startTime;             // Start time of the mission
    //private float speed;                 
    //private Vector3 lastPosition;

    void Start()
    {
        startTime = Time.time;          
        //lastPosition = playerTransform.position; 
    }

    // Update is called once per frame
    void Update()
    {
        // Calculate time elapsed and update duration text
        float timeElapsed = Time.time - startTime;
        durationText.text = $"Mission Duration: {timeElapsed:F2} s";

        // Update spacecraft coordinates
        Vector3 coordinates = playerTransform.position;
        coordinatesText.text = $"(X, Y, Z): ({coordinates.x:F2}, {coordinates.y:F2}, {coordinates.z:F2})";

        // Calculate distance to Earth and update text
        float distanceToTarget = Vector3.Distance(earthTransform.position, playerTransform.position);
        distanceText.text = $"Dist: {distanceToTarget:F2} m";

        // Calculate the distance traveled since the last frame
        // float distance = Vector3.Distance(lastPosition, transform.position);
        // float deltaTime = Time.deltaTime; 
        // speed = distance / deltaTime; 
        // speedText.text = $"Speed: {speed:F2} m/s";

        // if (distanceToTarget<=10.1f){
        //     MusicManager.Instance.PlayMusic(checkpointSound);
        // }

        if (distanceToTarget<=10){
            Debug.Log("checkpoint reached");
            MusicManager.Instance.PlayMusic(checkpointSound, true);
            panel.SetActive(true);
            Time.timeScale = 0f;
            distanceText.text = "Dist: 0.00";
            bgm.Pause();
            Color color = controlText.color;
            color.a = 0;
            controlText.color=color;
        }
    }
}
