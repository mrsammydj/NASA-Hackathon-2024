using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class DistanceIndicator : MonoBehaviour
{
    public Transform earthTransform;
    public Transform playerTransform;
    public TextMeshProUGUI distanceText;

    // Update is called once per frame
    void Update()
    {
        float distanceToTarget = Vector3.Distance(earthTransform.position, playerTransform.position);
            distanceText.text = $"Dist: {distanceToTarget:F2}";
    }
}
