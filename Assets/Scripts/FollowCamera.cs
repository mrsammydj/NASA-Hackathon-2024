using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FollowCamera : MonoBehaviour
{
    public Transform target; // Your spaceship transform
    public Vector3 offset; // Offset between the camera and the target
    public float smoothSpeed = 0.125f; // Smoothness factor for the camera movement

    private void LateUpdate()
    {
        // Calculate the desired position with the offset
        Vector3 desiredPosition = target.position + offset;

        // Smoothly move the camera to the desired position
        Vector3 smoothedPosition = Vector3.SmoothDamp(transform.position, desiredPosition, ref velocity, smoothSpeed);

        // Update the camera position
        transform.position = smoothedPosition;

        // Optionally, make the camera look at the spaceship
        transform.LookAt(target);
    }

    private Vector3 velocity = Vector3.zero; // Helper variable for SmoothDamp
    
}
