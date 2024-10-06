using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlanetRotation : MonoBehaviour
{
    // Rotation speed for the planet
    public float rotationSpeed = 10f;

    // Axis of rotation (can be set to Vector3.up, Vector3.forward, or custom axis)
    public Vector3 rotationAxis = Vector3.up;

    void Start(){
        if(Time.timeScale==0){
            Time.timeScale=1;
        }
    }

    void Update()
    {
        // Rotate the planet around the specified axis at the given speed
        transform.Rotate(rotationAxis, rotationSpeed * Time.deltaTime);
        if (Input.GetKeyDown(KeyCode.Space)){
            Debug.Log($"{Time.timeScale}");
        }
    }
}
