using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class NeptuneFacts : MonoBehaviour
{
    private string[] facts = new string[]
    {
        "I am the farthest planet from the Sun in our solar system!",
        "I’m known for my stunning blue color, which comes from the methane in my atmosphere.",
        "I’m the eighth planet from the Sun, orbiting at an average distance of about 2.7 billion miles (4.3 billion kilometers).",
        "It takes me about 165 Earth years to complete one orbit around the Sun.",
        "My day is relatively short for a planet my size—it only takes about 16 hours to rotate once.",
        "I have the strongest winds in the solar system, with speeds reaching up to 1,200 miles per hour (2,000 kilometers per hour)!",
        "My atmosphere is mostly made of hydrogen, helium, and methane, with clouds of ice and ammonia.",
        "I have 14 known moons, with Triton being the largest and most famous.",
        "Triton is unique because it orbits me in the opposite direction of my rotation—a retrograde orbit.",
        "I’m about 17 times the mass of Earth, making me a giant planet.",
        "I’m the only planet in the solar system discovered through mathematical predictions rather than direct observation.",
        "My discovery was confirmed in 1846 by Johann Galle and Heinrich d’Arrest.",
        "I have a faint ring system made of ice particles and dust, but they’re not as prominent as those of Saturn.",
        "My Great Dark Spot was a massive storm similar to Jupiter’s Great Red Spot, but it has since vanished.",
        "I have several smaller storms that can appear and disappear in my atmosphere quite quickly.",
        "My temperature is extremely cold, with an average temperature of around -373°F (-225°C).",
        "I’m often called an 'ice giant' because my composition includes more ice than the gas giants like Jupiter and Saturn.",
        "I have a very active atmosphere with dynamic weather patterns.",
        "The Voyager 2 spacecraft was the only spacecraft to visit me, flying by in 1989 and providing detailed images.",
        "I have a magnetic field that is tilted about 47 degrees from my rotation axis.",
        "I’m about 30 times farther from the Sun than Earth, making me a true cold and distant world.",
        "My blue color is due to the absorption of red light by methane in my atmosphere.",
        "Triton has geysers that shoot nitrogen gas and dust into space, creating a thin atmosphere around it.",
        "I’m named after the Roman god of the sea, reflecting my ocean-like color.",
        "My winds are not just fast; they are incredibly powerful and can change direction suddenly.",
        "I have been known to experience extreme seasonal changes due to my tilted axis.",
        "The atmospheric pressure on me is about 1,000 times greater than that on Earth.",
        "I have a core made of rock and ice, surrounded by a thick layer of water, ammonia, and methane.",
        "I’m more massive than all of the other planets in the solar system combined!",
        "I have a very low density, meaning I'm not as solid as Earth.",
        "My atmosphere has different layers, with varying temperatures and compositions.",
        "I was not observed until 1846, even though I’ve always been there, hiding in the dark depths of space.",
        "I’m considered a relatively small planet in size, but my mass is immense!",
        "My polar regions have been found to be much warmer than the rest of my atmosphere.",
        "I can sometimes appear brighter or darker due to the changing conditions in my atmosphere.",
        "I have some of the most beautiful and unique cloud patterns among the planets.",
        "Some scientists believe there may be a vast ocean beneath my icy surface.",
        "I have only been visited by Voyager 2, making my detailed study limited compared to other planets.",
        "I’m often featured in science fiction as a mysterious, distant world.",
        "My moon Proteus is one of the largest irregular moons in the solar system.",
        "I’m surrounded by a series of faint rings made mostly of ice and dust particles.",
        "My moon, Naiad, is one of the closest moons to me and has a very irregular shape.",
        "The temperature at my cloud tops is extremely cold, but it gets hotter toward my core.",
        "I’m not visible to the naked eye from Earth, but I can be seen with a good telescope.",
        "I’m one of the least understood planets, with many mysteries left to uncover!",
        "My distance from the Sun makes me one of the coldest places in the solar system.",
        "I have a strong gravitational pull, which influences the orbits of my moons.",
        "Some scientists believe my rings might be remnants from moons that were torn apart by my gravity."
    };

    public TextMeshProUGUI factText;

    public void ShowRandomFact()
    {
        int randomIndex = Random.Range(0, facts.Length);
        factText.text = facts[randomIndex];
    }
}
