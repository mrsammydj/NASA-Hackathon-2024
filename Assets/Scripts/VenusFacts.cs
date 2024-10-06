using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class VenusFacts : MonoBehaviour
{
    private string[] facts = new string[]
    {
        "I am the hottest planet in the solar system!",
        "My surface temperature stays around 465°C, hotter than Mercury, even though I’m farther from the Sun.",
        "I rotate in the opposite direction to most planets—east to west!",
        "A day on me lasts longer than a year. It takes 243 Earth days to spin once, but only 225 Earth days to orbit the Sun.",
        "I have the thickest atmosphere of all the rocky planets, mostly made of carbon dioxide.",
        "My clouds are made of sulfuric acid, not water.",
        "I’m often called Earth's twin because we’re similar in size and structure.",
        "I don’t have any moons or rings.",
        "I'm named after the Roman goddess of love and beauty.",
        "My surface is full of volcanoes, mountains, and vast plains.",
        "I have more volcanoes than any other planet in the solar system!",
        "My surface is young, geologically speaking—less than 300 million years old.",
        "I have no liquid water, but I may have had oceans billions of years ago.",
        "I reflect a lot of sunlight, which is why I’m the second-brightest object in Earth's night sky after the Moon.",
        "My thick clouds trap heat in a runaway greenhouse effect.",
        "I don’t have tectonic plates like Earth, but my surface is still shaped by volcanic activity.",
        "The air pressure on me is 92 times that of Earth—standing on me would feel like being 900 meters underwater!",
        "My atmosphere is mostly carbon dioxide, with a little nitrogen and traces of other gases.",
        "I’m sometimes called the 'morning star' or 'evening star' because you can see me shining just before sunrise or after sunset.",
        "Winds on my surface are slow, but in my upper atmosphere, they can reach up to 360 km/h.",
        "My year is shorter than my day because I orbit the Sun faster than I rotate!",
        "I’m the brightest planet and can even cast shadows on Earth during its night!",
        "I don’t have seasons like Earth because my axial tilt is only 3 degrees.",
        "It rains sulfuric acid in my clouds, but the rain evaporates before it reaches the surface.",
        "I spin incredibly slowly; it takes me 243 Earth days to complete a single rotation.",
        "I’ve been visited by more than 40 spacecraft, but no humans have landed on me yet.",
        "The Soviet Union’s Venera missions were the first to land probes on my surface.",
        "I’m closest to Earth, but my conditions are much harsher.",
        "My clouds make it difficult to see my surface directly from space.",
        "I’m the third-brightest object in the sky after the Sun and Moon.",
        "My atmosphere crushes any spacecraft that tries to land on me due to extreme pressure.",
        "Although I have no moons, I may have once had a moon that crashed back into me.",
        "I am often visible in Earth’s sky for weeks at a time.",
        "My volcanic plains cover 80% of my surface.",
        "My thick clouds make me impossible to see from Earth’s surface.",
        "I may have had plate tectonics in the past, but now I’m mostly shaped by volcanism.",
        "It would take you about 4 hours to fall through my atmosphere to reach the surface.",
        "I’m covered in mountains, with my tallest one, Maxwell Montes, rising 11 kilometers high.",
        "My volcanic activity is likely still ongoing, though no one has seen it directly.",
        "I reflect about 70% of the sunlight that hits me due to my thick clouds.",
        "Unlike Earth, I have no magnetic field to protect me from the Sun's radiation.",
        "The temperature on my surface is almost the same everywhere, day or night, thanks to my thick atmosphere.",
        "I have a lot of lightning storms in my clouds.",
        "The European Space Agency's Venus Express mission studied me from 2006 to 2014.",
        "It’s possible I still have active volcanoes today.",
        "I have pancake-shaped domes on my surface that are unlike anything on Earth.",
        "I’m the only planet named after a female deity.",
        "My atmosphere is so thick that you could fly through it using just wings on your arms!",
        "You could never see the Sun from my surface because of my thick clouds."
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
