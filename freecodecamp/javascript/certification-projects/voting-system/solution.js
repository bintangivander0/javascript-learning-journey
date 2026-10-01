const poll = new Map();
poll.set("Indonesia", new Set());
poll.set("Malaysia", new Set());
poll.set("Brunei", new Set());
poll.get("Indonesia").add("voters1");
poll.get("Indonesia").add("voters2");
poll.get("Indonesia").add("voters3");
poll.get("Malaysia").add("voters1");
poll.get("Malaysia").add("voters2");
poll.get("Malaysia").add("voters3");
poll.get("Brunei").add("voters1");
poll.get("Brunei").add("voters2");
poll.get("Brunei").add("voters3");


const addOption = (option) => {
  if (option === "") return `Option cannot be empty.`;
  if (!poll.has(option)) {
    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
  } else {
    return `Option "${option}" already exists.`;
  }
}

const vote = (option, voterId) => {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  } else {
    const thisOption = poll.get(option);
    if (thisOption.has(voterId)) {
      return `Voter ${voterId} has already voted for "${option}".`;
    } else {
      thisOption.add(voterId);
      return `Voter ${voterId} voted for "${option}".`;
    }
  }
}

const displayResults = () => {
  let result = "";
  poll.forEach((voters, country) => {
    result += `${country}: ${voters.size} votes\n`
  });
  return ("Poll Results:\n" + result).trimEnd();
}

console.log(displayResults());
