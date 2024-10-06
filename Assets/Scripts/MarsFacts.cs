using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class MarsFacts : MonoBehaviour
{
    private string[] facts = new string[]
    {
        "I am also known as the Red Planet!",
        "I get my red color from the iron oxide, or rust, on my surface.",
        "I’m the fourth planet from the Sun, right after Earth.",
        "I’m home to the tallest volcano in the solar system, Olympus Mons, which is about 13.6 miles (22 km) high!",
        "I have two moons: Phobos and Deimos. They're small and irregularly shaped.",
        "I’ve got the largest canyon in the solar system, Valles Marineris, which stretches over 2,500 miles (4,000 km).",
        "A day on me is almost the same as on Earth—24 hours and 37 minutes long!",
        "I have seasons like Earth because my axis is tilted at 25 degrees.",
        "My year lasts 687 Earth days, nearly twice as long as yours.",
        "I’m about half the size of Earth.",
        "I’m cold! My average surface temperature is -80°F (-60°C).",
        "I used to have water on my surface—now it's mostly locked in ice or as vapor in my thin atmosphere.",
        "My atmosphere is 100 times thinner than Earth’s and mostly made of carbon dioxide.",
        "I don’t have a global magnetic field like Earth, but I have pockets of magnetism in my crust.",
        "I’m often called the ‘desert planet’ because my surface is dry and rocky.",
        "Humans have sent more than 40 missions to explore me!",
        "The first successful mission to fly by me was NASA’s Mariner 4 in 1965.",
        "The Curiosity Rover has been exploring my surface since 2012.",
        "I’m the most likely planet in the solar system to have once supported life.",
        "I have the largest dust storms in the solar system. They can cover the entire planet and last for weeks!",
        "My gravity is only about 38% of Earth’s, so you’d feel much lighter here.",
        "If you weighed 100 pounds on Earth, you’d weigh only 38 pounds on me.",
        "I’m about 142 million miles (228 million kilometers) away from the Sun.",
        "The temperature on me can drop as low as -195°F (-125°C) at night near the poles.",
        "My atmosphere is so thin that liquid water would evaporate almost instantly.",
        "My surface is covered in giant extinct volcanoes.",
        "I have polar ice caps made of water ice and dry ice (frozen carbon dioxide).",
        "The Phoenix Lander confirmed the presence of water ice beneath my surface in 2008.",
        "My sky looks pink during the day because of dust particles scattering sunlight.",
        "It takes about 6 to 9 months to travel to me from Earth with current technology.",
        "I’ve been visited by rovers, landers, and orbiters, but no humans have stepped foot on me yet.",
        "My surface is covered in impact craters, just like the Moon and Mercury.",
        "I have canyons and valleys that suggest liquid water once flowed across my surface.",
        "One of my moons, Phobos, is slowly getting closer to me and may crash into me in about 50 million years!",
        "I’m named after the Roman god of war because of my red color, which reminded ancient people of blood.",
        "I experience extreme dust storms that can engulf the whole planet for months at a time.",
        "You can see me from Earth without a telescope when I’m at my brightest!",
        "I have vast plains and desert-like landscapes.",
        "Some scientists believe that life might still exist under my surface in the form of microbes.",
        "The first successful rover to land on me was Sojourner, which arrived in 1997.",
        "It’s possible to terraform me to make me more Earth-like, but that’s still just a theory.",
        "My orbit is more elliptical than Earth’s, which means I’m sometimes much closer to the Sun and sometimes much farther away.",
        "I have the longest and deepest canyon system in the solar system—Valles Marineris is over 7 miles (11 km) deep in places.",
        "You could jump three times higher on me than you could on Earth due to my lower gravity!",
        "Scientists are constantly studying me for signs of past water and life.",
        "If you visited me, you’d need a spacesuit because I have no breathable oxygen.",
        "My thin atmosphere doesn't protect me from the Sun's radiation like Earth's does.",
        "Temperatures on me can vary greatly depending on the time of day and location.",
        "I’m a popular candidate for future human colonization missions."
    };

    public TextMeshProUGUI factText;

    public void ShowRandomFact()
    {
        int randomIndex = Random.Range(0, facts.Length);
        factText.text = facts[randomIndex];
    }
}
