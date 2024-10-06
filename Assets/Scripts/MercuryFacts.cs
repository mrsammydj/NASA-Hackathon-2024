using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class MercuryFacts : MonoBehaviour
{
    private string[] facts = new string[]
    {
        "I am the smallest planet in the solar system.",
        "I'm also the closest planet to the Sun, but not the hottest!",
        "I have almost no atmosphere, which means I can't trap much heat.",
        "A day on me lasts about 59 Earth days.",
        "I complete one full orbit around the Sun in just 88 Earth days.",
        "Despite my small size, I'm a rocky planet like Earth.",
        "My surface is covered in craters from meteoroid impacts, just like Earth’s Moon.",
        "I'm named after the Roman god of messengers because I move so fast around the Sun.",
        "I don’t have any moons or rings.",
        "Temperatures on my surface can reach up to 430°C during the day and drop to -180°C at night.",
        "I have a weak magnetic field, about 1% as strong as Earth's.",
        "My diameter is about 4,880 kilometers, making me the smallest planet.",
        "I have no atmosphere to protect me from the Sun's radiation.",
        "My core makes up about 85% of my radius.",
        "I have a huge iron core relative to my size, much larger than Earth's core.",
        "A year on me is shorter than a day on Venus!",
        "I experience the largest temperature fluctuations in the solar system.",
        "I spin very slowly, taking 59 Earth days to rotate once on my axis.",
        "I was visited by the Mariner 10 spacecraft in 1974 and 1975.",
        "I’ve been visited by the MESSENGER spacecraft, which orbited me between 2011 and 2015.",
        "My surface is full of cliffs and ridges called 'scarps' formed as I cooled and contracted.",
        "I have a large impact crater called the Caloris Basin, one of the largest in the solar system.",
        "My surface is also marked by long, winding valleys called 'rupes.'",
        "I’m the second densest planet in the solar system after Earth.",
        "Sunrise on me happens every 176 Earth days!",
        "I’m very hard to see from Earth because I’m always so close to the Sun.",
        "Despite being close to the Sun, my sky would appear black due to the lack of atmosphere.",
        "I’m the second fastest planet, moving at 47 kilometers per second.",
        "My surface is similar to the Moon's, with vast plains and cratered highlands.",
        "I have water ice at my poles, hidden in the shadowed craters where sunlight never reaches.",
        "Even though I'm small, my gravity is 38% of Earth’s gravity.",
        "I have an exosphere instead of an atmosphere, made up of atoms blasted off my surface by solar wind.",
        "My orbit is very elliptical, meaning I sometimes get much closer to the Sun than at other times.",
        "I’m the least explored planet, with only two missions having visited me so far.",
        "I don't have seasons because I have almost no axial tilt (only 0.034 degrees).",
        "You would weigh much less on me than on Earth—about 38% of your Earth weight.",
        "My days are so long that if you stood on my surface, you would see the Sun rise, stop, and then set in the same place!",
        "I have a very thin sodium tail, which streams away from me due to the solar wind.",
        "Despite my slow rotation, I have relatively quick sunsets due to my elliptical orbit.",
        "My gravity is not strong enough to hold onto an atmosphere, so I constantly lose particles to space.",
        "My core may still be partially molten, creating the weak magnetic field I have.",
        "I was formed about 4.5 billion years ago, shortly after the formation of the Sun.",
        "I don’t have any tectonic activity today, but I likely did in my early days.",
        "I don’t have plate tectonics, but my surface has been reshaped by cooling and shrinking.",
        "I experience frequent solar storms due to my proximity to the Sun.",
        "Standing on my surface during the day would be incredibly hot, but at night, you’d freeze instantly.",
        "I am often visible just after sunset or just before sunrise, near the horizon.",
        "My surface is mostly gray, and I reflect very little sunlight despite being so close to the Sun.",
        "My surface gravity is strong enough to keep tiny particles from floating away, but not strong enough for an atmosphere.",
        "Although I’m small, I’ve got a big impact on space exploration as a target for future missions."
    };

    public TextMeshProUGUI factText;
    public AudioClip click;

    public void ShowRandomFact()
    {
        int randomIndex = Random.Range(0, facts.Length);
        factText.text = facts[randomIndex];
        MusicManager.Instance.PlayMusic(click);
    }
}
