using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class SunFacts : MonoBehaviour
{
    // Array to store the 50 fun facts from the Sun's perspective
    private string[] facts = new string[]
    {
        "I am 4.6 billion years old, and I'm still shining bright!",
        "I make up 99.86% of the mass in our solar system.",
        "I’m a G-type main-sequence star, also known as a yellow dwarf.",
        "At my core, I burn at a sizzling 15 million degrees Celsius!",
        "My light takes about 8 minutes and 20 seconds to reach Earth.",
        "My surface is a toasty 5,500 degrees Celsius.",
        "I’m 109 times wider than Earth. Pretty big, huh?",
        "My gravity is 28 times stronger than Earth's. Hold on tight!",
        "I'm made mostly of hydrogen (75%) and helium (24%).",
        "One day, I’ll become a red giant, then a white dwarf.",
        "I generate my energy through nuclear fusion—fusing hydrogen into helium.",
        "I sometimes release solar flares, sudden bursts of energy from my surface.",
        "My magnetic field is super strong and quite complicated.",
        "I go through an 11-year cycle where my sunspots come and go.",
        "I orbit the center of the Milky Way galaxy.",
        "It takes me about 225 million years to complete one orbit around the galaxy.",
        "I send out a solar wind that flows throughout the solar system.",
        "My outer atmosphere is called the corona, and it's super hot!",
        "You can only see my corona during a total solar eclipse.",
        "My magnetic field extends all the way beyond Pluto.",
        "I produce energy at an incredible rate of 386 billion megawatts.",
        "A day on me is about 25 Earth days at my equator.",
        "I spin faster at my equator than at my poles.",
        "Sunspots are cooler regions on my surface—yes, I do have cool spots!",
        "My light helps plants on Earth grow through photosynthesis.",
        "Solar energy from me powers a lot of things on Earth.",
        "Don’t worry, I have enough fuel to keep burning for another 5 billion years.",
        "I’m classified as a yellow dwarf star, despite my massive size.",
        "My gravity keeps the entire solar system together. I’m the glue!",
        "Many ancient cultures have worshiped me as a powerful deity.",
        "I power Earth’s climate and weather—without me, Earth would be frozen.",
        "Be careful of my ultraviolet (UV) rays! They can cause sunburns.",
        "I’m moving through space at about 828,000 km/h.",
        "Some of my sunspots are even bigger than Earth!",
        "I create huge, bright loops of plasma called solar prominences.",
        "My solar storms can disrupt communication systems on Earth.",
        "When my solar wind hits Earth’s magnetic field, it creates stunning auroras.",
        "I’m the closest star to Earth, just 93 million miles away.",
        "Without me, life on Earth wouldn’t be possible.",
        "I shine my light in all directions, and it travels far!",
        "I’m about 93 million miles (150 million km) from Earth, a perfect distance.",
        "My energy comes from fusing hydrogen atoms together deep inside.",
        "I lose a bit of my mass every time I emit energy.",
        "I’m responsible for the changing seasons on Earth.",
        "Solar eclipses happen when the Moon gets in the way of my light.",
        "I emit solar neutrinos, tiny particles that pass through Earth all the time.",
        "I have several layers, including the photosphere and chromosphere.",
        "I’m halfway through my life cycle, with many billions of years to go.",
        "My brightness does vary a little over time.",
        "Solar sails use my sunlight to propel spacecraft across space."
    };

    // Reference to the UI Text component
    public TextMeshProUGUI factText;
    public AudioClip click;

    // Method to display a random fact
    public void ShowRandomFact()
    {
        // Get a random index and set the UI text to the corresponding fact
        int randomIndex = Random.Range(0, facts.Length);
        factText.text = facts[randomIndex];
        MusicManager.Instance.PlayMusic(click);
    }
}
