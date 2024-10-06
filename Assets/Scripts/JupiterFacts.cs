using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class JupiterFacts : MonoBehaviour
{
    private string[] facts = new string[]
    {
        "I am the largest planet in the solar system!",
        "I’m so big that you could fit all the other planets inside me and still have room to spare!",
        "I’m mostly made of hydrogen and helium, just like the Sun.",
        "I have 79 known moons orbiting me, and more may still be discovered.",
        "My four largest moons are called the Galilean moons: Io, Europa, Ganymede, and Callisto.",
        "Ganymede, one of my moons, is the largest moon in the solar system and is even bigger than Mercury.",
        "I spin faster than any other planet, completing a rotation in just under 10 hours.",
        "My Great Red Spot is a giant storm that’s been raging for over 300 years!",
        "My Great Red Spot is so big that three Earths could fit inside it.",
        "I have faint rings, but they’re not as bright or visible as Saturn’s.",
        "My gravity is 2.5 times stronger than Earth's, so you’d weigh more if you stood on me.",
        "I’m the fifth planet from the Sun, orbiting at an average distance of 484 million miles (778 million kilometers).",
        "It takes me about 12 Earth years to complete one orbit around the Sun.",
        "I don’t have a solid surface—you’d sink right into my atmosphere if you tried to land on me!",
        "My atmosphere is filled with swirling clouds and storms, mostly made of hydrogen and helium.",
        "I have lightning in my atmosphere that's 10 times more powerful than Earth’s.",
        "My magnetic field is the strongest in the solar system, about 20,000 times stronger than Earth’s!",
        "I give off more heat than I receive from the Sun due to leftover heat from my formation.",
        "I’m sometimes called a 'failed star' because I have the same ingredients as a star, just not enough mass to ignite fusion.",
        "My rings are made mostly of dust particles kicked up by meteor impacts on my moons.",
        "My day is the shortest of all the planets in the solar system due to my fast rotation.",
        "I’m named after the king of the Roman gods.",
        "Io, one of my moons, has over 400 active volcanoes, making it the most volcanically active body in the solar system.",
        "Europa, another moon of mine, has a vast ocean beneath its icy surface, where life might exist.",
        "My atmosphere has colorful bands caused by strong jet streams moving at hundreds of kilometers per hour.",
        "If you could stand on my cloud tops, the view of the Great Red Spot would be spectacular!",
        "The Galileo spacecraft orbited me for eight years, studying me and my moons up close.",
        "I’m visible from Earth with the naked eye and often one of the brightest objects in the night sky.",
        "I’m so big that you could line up 11 Earths across my diameter!",
        "My mass is 318 times greater than Earth’s, and I contain more than twice the mass of all the other planets combined.",
        "I don’t have seasons like Earth because my axis is only tilted by 3 degrees.",
        "Ammonia and methane clouds give my atmosphere its colorful stripes and swirls.",
        "Juno, a spacecraft currently orbiting me, is studying my atmosphere, magnetic field, and interior structure.",
        "I’ve been visited by more than 9 spacecraft, including Pioneer, Voyager, and Juno.",
        "I have powerful auroras at my poles, caused by my strong magnetic field and interaction with the solar wind.",
        "My rings weren’t discovered until 1979 when Voyager 1 flew by—they’re faint and made of small particles.",
        "My moons are so diverse that each one is like a world of its own, with unique features and environments.",
        "I have intense radiation belts surrounding me, which are dangerous to spacecraft and humans.",
        "I’m about 5 times farther from the Sun than Earth is.",
        "My clouds are arranged in bands that rotate in opposite directions, creating powerful winds.",
        "I’m mostly gas, so you couldn’t walk on me—you’d fall through layers of atmosphere until reaching my dense core.",
        "I experience some of the most violent storms in the solar system, some lasting for centuries.",
        "My moon Ganymede is the only moon in the solar system known to have its own magnetic field.",
        "My core might be made of rock and metal, surrounded by a layer of liquid metallic hydrogen.",
        "I’m the third-brightest object in the night sky, after the Moon and Venus.",
        "I’ve been known since ancient times and was one of the first planets to be observed with a telescope by Galileo in 1610.",
        "It’s thought that I may have helped shape the early solar system by redirecting comets and asteroids.",
        "My gravity helps protect Earth by pulling in or flinging away dangerous asteroids and comets.",
        "My moons Io and Europa are among the most exciting places in the solar system to search for extraterrestrial life."
    };

    public TextMeshProUGUI factText;

    public void ShowRandomFact()
    {
        int randomIndex = Random.Range(0, facts.Length);
        factText.text = facts[randomIndex];
    }
}

