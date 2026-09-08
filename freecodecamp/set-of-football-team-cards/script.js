const footballTeam = {
  team: "Indonesia",
  year: 2026,
  headCoach: "John Herdman",
  players: [
    {
      name: "Maarten Paes",
      position: "goalkeeper",
      isCaptain: false
    }, {
      name: "Ernando Ari Sutaryadi",
      position: "goalkeeper",
      isCaptain: false
    }, {
      name: "Nadeo Argawinata",
      position: "goalkeeper",
      isCaptain: false
    }, {
      name: "Muhammad Riyandi",
      position: "goalkeeper",
      isCaptain: false
    }, {
      name: "Cahya Supriadi",
      position: "goalkeeper",
      isCaptain: false
    }, {
      name: "Rizky Ridho",
      position: "defender",
      isCaptain: true
    }, {
      name: "Jay Idzes",
      position: "defender",
      isCaptain: false
    }, {
      name: "Justin Hubner",
      position: "defender",
      isCaptain: false
    }, {
      name: "Jordi Amat",
      position: "defender",
      isCaptain: false
    }, {
      name: "Muhammad Ferarri",
      position: "defender",
      isCaptain: false
    }, {
      name: "Elkan Baggott",
      position: "defender",
      isCaptain: false
    }, {
      name: "Kevin Diks",
      position: "defender",
      isCaptain: false
    }, {
      name: "Sandy Walsh",
      position: "defender",
      isCaptain: false
    }, {
      name: "Calvin Verdonk",
      position: "defender",
      isCaptain: false
    }, {
      name: "Nathan Tjoe-A-On",
      position: "defender",
      isCaptain: false
    }, {
      name: "Shayne Pattynama",
      position: "defender",
      isCaptain: false
    }, {
      name: "Pratama Arhan",
      position: "defender",
      isCaptain: false
    }, {
      name: "Dony Tri Pamungkas",
      position: "defender",
      isCaptain: false
    }, {
      name: "Tim Geypens",
      position: "defender",
      isCaptain: false
    }, {
      name: "Wahyu Prasetyo",
      position: "defender",
      isCaptain: false
    }, {
      name: "Brian Fatari",
      position: "defender",
      isCaptain: false
    }, {
      name: "Thom Haye",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Ivar Jenner",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Eliano Reijnders",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Marselino Ferdinan",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Ragnar Oratmangoen",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Marc Klok",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Ricky Kambuaya",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Joey Pelupessy",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Kadek Agung",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Beckham Putra",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Muhammad Rayhan Hannan",
      position: "midfielder",
      isCaptain: false
    }, {
      name: "Ole Romeny",
      position: "forward",
      isCaptain: false
    }, {
      name: "Jens Raven",
      position: "forward",
      isCaptain: false
    }, {
      name: "Rafael Struick",
      position: "forward",
      isCaptain: false
    }, {
      name: "Ramadhan Sananta",
      position: "forward",
      isCaptain: false
    }, {
      name: "Mauro Zijlstra",
      position: "forward",
      isCaptain: false
    }, {
      name: "Hokky Caraka",
      position: "forward",
      isCaptain: false
    }, {
      name: "Mitchell Baker",
      position: "forward",
      isCaptain: false
    }, {
      name: "Egy Maulana Vikri",
      position: "forward",
      isCaptain: false
    }, {
      name: "Witan Sulaeman",
      position: "forward",
      isCaptain: false
    }, {
      name: "Yakob Sayuri",
      position: "forward",
      isCaptain: false
    }, {
      name: "Saddil Ramdani",
      position: "forward",
      isCaptain: false
    }, {
      name: "Rizky Eka Pratama",
      position: "forward",
      isCaptain: false
    }
  ] 
};

const teamElement = document.querySelector("#team");
const yearElement = document.querySelector("#year");
const headCoachElement = document.querySelector("#head-coach");

teamElement.textContent = footballTeam.team;
yearElement.textContent = footballTeam.year;
headCoachElement.textContent = footballTeam.headCoach;

const playerCards = document.querySelector("#player-cards");

function displayPlayers(players) {
  const cards = players.map((player) => {
    return `
      <div class="player-card">
        <h2>
          ${player.isCaptain ? "(Captain) " : ""}${player.name}
        </h2>
        <p>Position: ${player.position}</p>
      </div>
    `;
  });
  playerCards.innerHTML = cards.join("");
}

displayPlayers(footballTeam.players);

const playersDropdown = document.querySelector("#players");

playersDropdown.addEventListener("change", () => {
  const selectedPosition = playersDropdown.value;

  const filteredPlayers = selectedPosition === "all"
    ? footballTeam.players
    : footballTeam.players.filter((player) => {
      return player.position === selectedPosition;
    });
  ;

  displayPlayers(filteredPlayers);
})
