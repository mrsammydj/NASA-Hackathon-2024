using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class SaturnFacts : MonoBehaviour
{
    private string[] facts = new string[]
    {
        "I am the planet with the most beautiful rings!",
        "I’m the sixth planet from the Sun, and I’m named after the Roman god of agriculture.",
        "I’m the second-largest planet in the solar system, after Jupiter.",
        "My iconic rings are made of ice, dust, and rock particles, and they’re absolutely stunning!",
        "My rings span up to 175,000 miles (282,000 kilometers) across, but they’re only about 30 feet (9 meters) thick.",
        "I have 146 confirmed moons orbiting me, but more could still be discovered!",
        "My largest moon, Titan, is bigger than the planet Mercury.",
        "Titan has a thick atmosphere and lakes of liquid methane on its surface.",
        "I’m mostly made of hydrogen and helium, similar to Jupiter and the Sun.",
        "I’m so light that if you could find a big enough ocean, I’d float in it!",
        "It takes me about 29.5 Earth years to complete one orbit around the Sun.",
        "A day on me is really short—it only takes 10.7 hours for me to complete one rotation.",
        "I’m the least dense planet in the solar system.",
        "My atmosphere has strong winds, reaching speeds of over 1,100 miles per hour (1,800 kilometers per hour).",
        "I’m known for my hexagonal storm at my north pole—a unique six-sided weather pattern!",
        "My core is thought to be made of rock and ice, surrounded by metallic hydrogen.",
        "I’m often called the 'Jewel of the Solar System' because of my dazzling rings.",
        "The Cassini spacecraft studied me and my moons for 13 years before diving into my atmosphere in 2017.",
        "Enceladus, one of my moons, has icy geysers that shoot water vapor and ice particles into space.",
        "My rings are divided into seven main sections, labeled A through G.",
        "I’m about 886 million miles (1.4 billion kilometers) from the Sun.",
        "My rings are young in cosmic terms—scientists think they’re only about 100 to 200 million years old.",
        "I’ve been known since ancient times and can be seen from Earth with the naked eye.",
        "I’m named after the Roman god Saturn, who was also the father of Jupiter, my fellow gas giant.",
        "My gravity is about 1.06 times stronger than Earth’s, so you’d feel a little heavier on me.",
        "Some of my moons, like Enceladus, are thought to have subsurface oceans where life might exist.",
        "I have powerful auroras, just like Earth and Jupiter, caused by interactions between my magnetic field and the solar wind.",
        "My atmosphere is mostly hydrogen and helium, with traces of methane and ammonia.",
        "I have huge storms in my atmosphere, some of which are thousands of miles wide.",
        "I’m so big that you could fit more than 760 Earths inside me!",
        "I have a faint ring system called the Phoebe ring, which is much larger and darker than my main rings.",
        "My fast rotation causes me to bulge at the equator and flatten at the poles.",
        "Even though my rings look solid from afar, they’re actually made up of countless small particles.",
        "My moon Iapetus has a unique two-tone coloration—one side is bright, and the other is dark.",
        "Titan is the only moon in the solar system with a dense atmosphere.",
        "I take nearly 30 Earth years to complete one trip around the Sun, so each season lasts more than seven Earth years!",
        "I experience strong seasonal changes due to the tilt of my axis, just like Earth.",
        "Many of my moons, like Rhea, Dione, and Tethys, are icy worlds.",
        "My rings are constantly changing due to the gravitational pull of my moons.",
        "I was the last planet to be visited by the Voyager spacecraft in the 1980s.",
        "I have intense lightning storms, some of which are 10,000 times stronger than those on Earth!",
        "I’m the flattest planet in the solar system because of my fast rotation.",
        "The particles in my rings range in size from tiny dust grains to objects as large as mountains.",
        "Some scientists believe that my rings were formed when a moon got too close and was torn apart by my gravity.",
        "You’d weigh about the same on me as you do on Earth because my gravity is very similar.",
        "I reflect a lot of sunlight because of my icy rings, which makes me appear very bright from Earth.",
        "My rings are made up of 99.9% water ice, with traces of other materials.",
        "My moon Titan is the second-largest moon in the solar system, only smaller than Jupiter’s moon Ganymede.",
        "I have a complex magnetic field, which protects me and my moons from the solar wind.",
        "I’m a gas giant, so I don’t have a solid surface like Earth—just layers of clouds and gases!"
    };

    public TextMeshProUGUI factText;

    public void ShowRandomFact()
    {
        int randomIndex = Random.Range(0, facts.Length);
        factText.text = facts[randomIndex];
    }
}

