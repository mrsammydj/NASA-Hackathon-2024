using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class UranusFacts : MonoBehaviour
{
    private string[] facts = new string[]
    {
        "I am the seventh planet from the Sun and known for my unique tilt!",
        "I’m often referred to as an 'ice giant' due to my icy composition, which includes water, ammonia, and methane.",
        "I have a beautiful blue color, thanks to the methane in my atmosphere that absorbs red light.",
        "I’m the third largest planet in the solar system, after Jupiter and Saturn.",
        "My rotation is quite unusual—my axis is tilted by about 98 degrees, making me spin on my side!",
        "I’m the coldest planet in the solar system, with average temperatures around -370°F (-224°C).",
        "It takes me about 84 Earth years to complete one orbit around the Sun.",
        "I have 27 known moons, with the largest being Titania and Oberon.",
        "I was discovered in 1781 by astronomer William Herschel, making me the first planet discovered with a telescope.",
        "My day is relatively short for a planet my size, lasting about 17.24 hours.",
        "I have a faint ring system made of dark particles, which are thought to be remnants from my moons.",
        "I’m located about 1.9 billion miles (3 billion kilometers) from the Sun.",
        "I have a magnetic field that is tilted about 59 degrees from my rotational axis.",
        "My atmosphere is composed of hydrogen (about 83%), helium (about 15%), and methane (about 2%).",
        "My methane clouds create a striking blue hue that sets me apart from other planets.",
        "I’m the only planet that rotates in a retrograde direction, meaning I spin opposite to most planets.",
        "I have been visited by only one spacecraft, Voyager 2, which flew by me in 1986.",
        "The Voyager 2 flyby provided our first close-up images of me and my moons.",
        "My moon Miranda has the most unusual surface, featuring a mix of old and young terrains.",
        "I have extreme winds in my atmosphere, reaching speeds of up to 560 miles per hour (900 kilometers per hour).",
        "I’m surrounded by a complex system of rings that are difficult to see from Earth.",
        "I was named after a character from Shakespeare’s play, 'The Tempest.'",
        "Some scientists believe I may have a rocky core surrounded by a thick layer of icy materials.",
        "My rings are believed to be relatively young, formed from the debris of broken moons.",
        "I have an unusual weather pattern, with storms that can appear suddenly and change rapidly.",
        "My magnetic field is quite complex, resembling a distorted bar magnet.",
        "I have been the subject of many scientific studies due to my unique characteristics.",
        "I can only be seen with a telescope, as I’m not visible to the naked eye from Earth.",
        "I have a very low density, which means I’m less solid than the terrestrial planets.",
        "My moon Umbriel is one of the darkest moons in the solar system, with a heavily cratered surface.",
        "I’m often described as a 'faint and distant' planet, being much farther from the Sun than Earth.",
        "I’m one of the least explored planets in our solar system, with many mysteries left to uncover!",
        "The temperatures in my upper atmosphere are extremely cold, but they gradually warm up toward my core.",
        "I have a dynamic atmosphere that changes with seasonal cycles, though each season lasts about 21 Earth years.",
        "My moon Ariel has a surface filled with canyons and many bright, icy terrains.",
        "I experience seasonal changes due to my unique tilt, similar to Earth but on a much larger timescale.",
        "I’m about 14 times the mass of Earth, making me a giant planet.",
        "Some of my moons have intriguing features, like Titania, which has deep canyons and large impact craters.",
        "I’m often regarded as one of the most mysterious planets due to the limited data available about me.",
        "I don’t have a solid surface, so if you tried to land on me, you’d sink into my gaseous atmosphere.",
        "The average distance from Earth to me varies, but it’s about 1.8 billion miles (2.9 billion kilometers).",
        "I have a fascinating collection of moons, each with its own unique characteristics and stories.",
        "The study of my atmosphere helps scientists understand the dynamics of gas giant planets.",
        "I’m located in the outer reaches of the solar system, making me one of the most remote planets.",
        "Some scientists believe I might have an ocean of superheated water beneath my icy outer layer."
    };

    public TextMeshProUGUI factText;

    public void ShowRandomFact()
    {
        int randomIndex = Random.Range(0, facts.Length);
        factText.text = facts[randomIndex];
    }
}
