using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class EarthFacts : MonoBehaviour
{
    private string[] facts = new string[]
    {
        "I'm the only planet known to support life!",
        "I’m the third planet from the Sun, and I’m just the right distance to support liquid water.",
        "I’m about 4.5 billion years old.",
        "Around 71% of my surface is covered in water.",
        "I have one moon, which is about one-quarter my size!",
        "My atmosphere is made up of 78% nitrogen and 21% oxygen, with traces of other gases.",
        "My axis is tilted at 23.5 degrees, giving me distinct seasons.",
        "I rotate once every 24 hours, which is why you have day and night.",
        "It takes me 365.25 days to orbit the Sun, which is why we have leap years!",
        "I’m the fifth-largest planet in the solar system.",
        "My gravity keeps the Moon in orbit, and it influences my ocean tides.",
        "My outer layer, or crust, is divided into tectonic plates that float on my molten mantle.",
        "I’m not a perfect sphere—I bulge slightly at the equator and flatten at the poles.",
        "The highest point on me is Mount Everest, which reaches 8,848 meters above sea level.",
        "The deepest point on my surface is the Mariana Trench, which is about 11 kilometers deep.",
        "I’m located in the 'Goldilocks Zone,' where conditions are just right for life.",
        "I’ve had life on me for about 3.5 billion years!",
        "My magnetic field protects me from harmful solar radiation.",
        "I’m the densest planet in the solar system.",
        "I experience thousands of earthquakes each year due to my shifting tectonic plates.",
        "My atmosphere creates beautiful auroras when solar winds interact with my magnetic field.",
        "I’m the only planet with liquid water on my surface right now.",
        "About 97% of my water is in the oceans, and only 3% is fresh water.",
        "My oceans contain 94% of all life on me!",
        "I have a diverse climate system, ranging from polar ice caps to tropical rainforests.",
        "Over 7.8 billion humans call me home.",
        "I’m constantly recycling my surface through the processes of plate tectonics and erosion.",
        "I’m also known as the 'Blue Planet' because of my vast oceans.",
        "My atmosphere scatters sunlight, making my sky appear blue during the day.",
        "The ozone layer in my atmosphere protects life by blocking harmful ultraviolet rays from the Sun.",
        "My surface temperature averages around 14°C (57°F).",
        "I’m home to millions of species of plants, animals, and microorganisms.",
        "I have a natural satellite, the Moon, which has a stabilizing effect on my tilt and climate.",
        "I’ve been hit by many asteroids and comets, but my atmosphere usually burns up smaller ones before they reach the ground.",
        "I’m constantly losing and gaining mass through space dust, meteors, and gases escaping my atmosphere.",
        "My polar ice caps contain about 70% of my fresh water.",
        "The Sun's gravity keeps me in orbit, and I pull on the Moon to keep it in orbit.",
        "My landmasses are constantly moving, albeit very slowly.",
        "Humans have only explored about 5% of my oceans!",
        "My core is as hot as the surface of the Sun, reaching temperatures of up to 6,000°C (10,800°F).",
        "I experience two main types of tides: high tide and low tide, caused by the Moon’s gravitational pull.",
        "I have an atmosphere thick enough to burn up most meteoroids, creating 'shooting stars.'",
        "I experience various natural disasters like volcanoes, hurricanes, and tsunamis due to my dynamic systems.",
        "I’m slowly spinning more slowly over time—days used to be shorter in the past.",
        "I’m about 93 million miles (150 million kilometers) from the Sun.",
        "My highest recorded temperature was 56.7°C (134°F) in Death Valley, California.",
        "My lowest recorded temperature was -89.2°C (-128.6°F) in Antarctica.",
        "Humans first left my surface and stepped on the Moon in 1969.",
        "I have a unique biosphere that supports life in a way no other planet in the solar system can."
    };

    public TextMeshProUGUI factText;

    public void ShowRandomFact()
    {
        int randomIndex = Random.Range(0, facts.Length);
        factText.text = facts[randomIndex];
    }
}
