// Portfolio section
function Project(
  title = "",
  brief = "",
  description = "",
  banner = "",
  bannerPosition = "",
  flavour = "unknown",
  year = "20XX") {
  return {
    title: title,
    brief: brief,
    description: description, // HTML
    banner: banner,
    bannerPosition: (bannerPosition == "" ? "center" : bannerPosition),
    flavour: flavour,
    year: year
  };
}

var projectData = [  
  new Project(
    "haskell-outrun",
    'An outrun-like racing game made in Haskell',

    `<p>I made this project as a part of the Haskell course final assignment at Innopolis University. It's an racing game with pseudo-3d graphics made in Haskell. Most inspiration came from <a href="https://web.archive.org/web/20230126045954/http://www.extentofthejam.com/pseudo/" target="_blank">Lou's Article</a> and games like <a href="https://youtu.be/CJKgefRQh1I" target="_blank">Max DownForce</a> and the original Out Run.</p>
    <br>
    <p>Features:</p>
    <p align="left">- Basic functionality for the outrun-like game</p>
    <p align="left">- Functionality to build custom racing tracks</p>
    <p align="left">- Infinite racing tracks</p>
    <p align="left">- Curvy roads and hills</p>
    <p align="left">- Static and dynamic road objects</p>
    <p align="left">- Game metrics: laps, time, and vehicle speed</p>
    <p align="left">- Sprite loading from file</p>
    <p align="left">- Sprite-based font loading</p>
    <p align="left">- Text rendering with custom colour and font</p>
    <br>
    <p>Project source code is available on <a target="_blank" href="https://github.com/danielpancake/haskell-outrun">_github_</a></p>

    <p align="center"><img src="https://raw.githubusercontent.com/danielpancake/haskell-outrun/main/assets/preview.gif" loading="lazy"></p>`,
    
    "outrun", "right",
    "unfinished game", "Jun-Jul 2022"
  ),

  new Project(
    "gmdialogue",
    "A dialogue system for GameMaker Studio 2.3+",

    `<p><span class="highlight">gmdialogue</span> is a dialogue system for GameMaker Studio 2.3+ that uses <a href="https://en.wikipedia.org/wiki/BBCode" target="_blank">BBCode-like</a> syntax to apply effects to the text.</p>
    <br>
    <p>Features:</p>
    <p align="left">- Basic text effects such as waving, shaking, bouncing etc</p>
    <p align="left">- Customizable textbox layout</p>
    <p align="left">- Dialogue questions</p>
    <p align="left">- Nested dialogues</p>
    <p align="left">- Non-linear dialogues</p>
    <p align="left">- Loading from a file</p>
    <p align="left">- ...ability to play "Bad apple" animation</p>
    <br>
    <p>Project along with a documentation is available on <a target="_blank" href="https://github.com/danielpancake/gmdialogue">_github_</a></p>`,

    "dialogue", "right",
    "game assets", "Feb-May 2021"
  ),

  new Project(
    "Animation \"Cheese\"",
    "from SHOP: A Pop Opera",

    `<p>"Cheese" is my take on re-animating the song with the same name from <a href="https://youtu.be/tSkz4vATkQE" target="_blank">"SHOP: A Pop Opera"</a> by <a href="https://www.youtube.com/c/JackStauber" target="_blank">Jack Stauber</a>.</p>
    <br>
    <div class="video-container"><iframe id="ytplayer" type="text/html" src="https://www.youtube.com/embed/341JYVmMF0o" frameborder="0" loading="lazy"></iframe></div>
    <br><br>
    <p>Below you can see most of the assets used in the animation, which were drawn using a mouse and a graphic tablet in Aseprite. A good piece of advice for the future would be to separate mouths from head sprites.</p>
    <img loading="lazy" src="./images/misc/work.webp">
    <p>After finishing the faces, I began filming. I shot at 0.75x of the initial speed to make movement coordination look better.
    <br><br>
    I usually use Vegas Pro to edit videos on my laptop.
    <br><br>
    There, I keyed the background out, tracked the movement of my head, and began composing the frames. For the 3d text animation, I used Paint 3d.</p>`,

    "cheese_pop_opera", "right",
    "animation", "Jun 2021"
  ),

  new Project(
    "gmdungeon",
    "A procedural dungeon generator for GameMaker Studio 2",

    `<p><span class="highlight">gmdungeon</span> is a dungeon template generation asset for GameMaker: Studio 1.4 and GameMaker Studio 2</p>
    <br>
    <p>You can use this asset if you wish to add procedurally generated dungeons to your game. It's pretty easy to use!</p>
    <br>
    <p>Features:</p>
    <p align="left">- Procedural dungeon generation</p>
    <p align="left">- Customizable room icons for the minimap</p>
    <p align="left">- Customizable room types</p>
    <p align="left">- Masks defining dungeon shape</p>
    <img src="https://raw.githubusercontent.com/danielpancake/gmdungeon/master/assets/example3.gif" loading="lazy">

    <p>Project along with a setup guide and examples is available on <a target="_blank" href="https://github.com/danielpancake/gmdungeon">_github_</a></p>`,

    "dungeon", "",
    "game assets", "2020-2021"
  ),

  new Project(
    "ShinyInu",
    "An android gallery app full of shibas",

    `<p><span class="highlight">ShinyInu</span> is an android gallery app that shows random pictures of Shiba Inu from <a target="_blank" href="https://shibe.online">shibe.online</a> webpage.</p>
    <img src="https://raw.githubusercontent.com/DanielPancake/shinyinu/master/assets/preview2.webp" loading="lazy">
    <p>Features:</p>
    <p align="left">- Open-source android application</p>
    <p align="left">- Built-in image viewer</p>
    <p align="left">- Ability to favouritise and save images</p>
    <p align="left">- A good mood after each cute and fluffy Shiba (99.9% guarantee) :)</p>
    <br>
    <p>Download release .apk file from <a target="_blank" href="https://github.com/danielpancake/shinyinu/releases">_github_</a></p>
    <p>ShinyInu's repository is available on <a target="_blank" href="https://github.com/danielpancake/shinyinu">_github_</a></p>`,

    "shiny", "",
    "android app", "Apr-Jun 2020"
  ),

  new Project(
    "Dr Helper",
    "A game for Ludum Dare 42 competition",

    `<p><span class="highlight">Dr Helper</span> is a silly puzzle game about running out of space.</p>
    <br>
    <p>"Do you want to remove a dangerous virus from your computer? Yet you cannot afford expensive software licences? Let us introduce our latest invention, the best free antivirus software made in just two days, Dr Helper! He knows more than 1,000,000 types of malware, 350,000 types of spyware and tons of jokes!</p>
    <br>
    <p>If there is a problem, Dr Helper will help you! Dr Helper will protect you, your friends and even your grandmother from all viruses that infect computers, microwaves, and java-based mobile phones!</p>
    <br>
    <p>Keep the viruses away - get Dr Helper today!"</p>
    <img src="https://m.gjcdn.net/content/700/2043310-p7zsbhjs-v4.webp" loading="lazy">
    <p>In 2018, I entered Ludum Dare 42 competition. It was my first experience in game speed development.</p>
    <br>
    <p>Dr Helper is available on <a target="_blank" href="https://gamejolt.com/games/drhelper/361111">_gamejolt_</a></p>`,

    "drhelper", "",
    "game jam submission", "Aug 2018"
  ),

  new Project(
    "Cubicus DEMO",
    "A weird indie demo",

    `<p>"Someone who looks like the devil himself appears on the computer screen. They say that something is wrong with your system. He wants to help. But what's the catch?.."</p>
    <br>
    <p><span class="highlight">Cubicus DEMO</span> is the first ever game I made. It's absurd and not of the best quality but I like it regardless. Once I complete its development, I'll present it to the world!..</p>
    <br>
    <p>Cubicus DEMO is available on <a target="_blank" href="https://gamejolt.com/games/nocubicus/260121">_gamejolt_</a></p>`,

    "old", "",
    "???", "2017"
  ),

  new Project(
    "Gosh, I love Summer!",
    "A turn-based puzzle game for the local jam",
    `<p>"Gosha loves summer. He also loves his mother. This summer, they went on a vacation to the sunny seashore. The sun was playing on the screen of Gosha's old mp3 player while he was listening to the new album of his favourite musical artist, Dmitry Kvadrat...
    <br><br>
    "GOSHA! Fetch a can of Coke for me, please", his mother asked, disturbing Gosha's tranquillity. It's better not to argue with your mother. So, he better go..."</p>
    <br>
    <p>A winner of the local IGD game jam held at the Innopolis University.</p>
    <br>
    <p>"Gosh, I love Summer!" is available on <a target="_blank" href="https://danielpancake.itch.io/gosh-i-love-summer">_itch.io_</a></p>`,

    "gosha", "right",
    "game jam submission", "Nov 2021"
  ),

  new Project(
    "Epic dungeon game",
    "A grid-based dungeon rpg",

    `<p>Monsters and explosions ahead! It's a game which takes place in the underground world. This game uses the gmdungeon asset under the hood.</p>
    <br>
    <p>Devlog is available on <a target="_blank" href="https://gamejolt.com/games/edg/507835">_gamejolt_</a></p>`,
    
    "edg", "",
    "game project on hold", "2020-[?]"
  ),

  new Project(
    "TEDxYouth at Limassol",
    "⋆ Beyound!",

    `<p>I was asked to design and make a webpage for the TEDxYouth event @ Agiou Andreou.
    <br><br>
    It was the first ever TEDxYouth event in Cyprus, organized by the initiative of the IMS Private School.</p>
    <br>
    <p>Check it out <a target="_blank" href="https://danielpancake.github.io/tedxyouth-agiouandreou">here</a> or on <a target="_blank" href="https://github.com/danielpancake/tedxyouth-agiouandreou">_github_</a></p>`,
    
    "tedxyouth", "right",
    "webpage", "2020"
  ),

  new Project(
    "spongebob-search",
    'A text searching tool for Spongebob episodes',

    `<p><span class="highlight">spongebob-search</span> is CLI for searching through transcripts from the SpongeBob wiki.</p>
    <br>
    <p>You can find it on the <a target="_blank" href="https://github.com/danielpancake/spongebobsearch">_github_</a></p>`,
    
    "sponge", "",
    "command line application", "2020"
  ),

  new Project(
    "Even this webpage",
    "yeah, it's on my github too",

    '<p>The source code of this webpage is available on <a target="_blank" href="https://github.com/danielpancake/danielpancake.github.io">_github_</a></p>',

    "little_website", "right",
    "webpage", "2018-now"
  )
];

// Appending projects to the portfolio
const projects = document.getElementById("projects");
for (let project of projectData) {
  // TODO: make flavour picker under donate button
  // console.log(project.flavour);

  projects.innerHTML += Mustache.render(
    // A real mess, but still better than copying that everytime I add a new project
    '<li class="toggle withBorder projectBanner" style="background: url(images/projects/{{banner}}.webp); background-position: {{bannerPosition}};"><div class="shape"><div></div><p><span class="title">{{title}}</span><br>{{brief}}</p></div></li><div class="inner withBorder description"><p class="flavour">{{flavour}} / {{year}}<p><hr>{{{description}}}</div>',
    project
  );
}
