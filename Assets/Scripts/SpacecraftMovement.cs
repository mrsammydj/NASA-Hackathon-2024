using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpacecraftMovement : MonoBehaviour
{
    public float moveSpeed = 20f;      // Speed for moving forward/backward
    public float rotationSpeed = 50f;  // Speed for rotating the spacecraft
    public float tiltAmount = 30f;     // Amount of tilt when turning

    private Rigidbody rb;

    // Limits for the pitch angle
    private float maxPitch = 30f; // Maximum tilt up/down in degrees
    private float currentPitch = 0f; // Current pitch angle

    void Start()
    {
        // Get the Rigidbody component
        rb = GetComponent<Rigidbody>();

        // Freeze rotation on Rigidbody so we can control rotation manually
        rb.freezeRotation = true;
    }

    void Update()
    {
        // Get input for movement
        float moveDirection = Input.GetAxis("Vertical");    // W/S or Up/Down Arrow for forward/backward
        float rotateDirection = Input.GetAxis("Horizontal"); // A/D or Left/Right Arrow for rotation

        // Redundant Line
        float adjustedMoveDirection = moveDirection; // Add negative sign before move direction if you need to invert

        // Move the spacecraft forward or backward relative to its current orientation
        Vector3 move = transform.forward * adjustedMoveDirection * moveSpeed * Time.deltaTime;
        rb.MovePosition(rb.position + move);

        // Tilt the spacecraft slightly when rotating (this only affects visuals)
        if (rotateDirection != 0)
        {
            // Calculate pitch based on input and limit the rotation
            float pitchChange = rotateDirection * tiltAmount * Time.deltaTime;
            currentPitch += pitchChange;
            currentPitch = Mathf.Clamp(currentPitch, -maxPitch, maxPitch); // Restrict the pitch angle

            // Apply the pitch (tilt) to the local rotation
            transform.localRotation = Quaternion.Euler(currentPitch, transform.localRotation.eulerAngles.y, transform.localRotation.eulerAngles.z);
        }
    }
}
