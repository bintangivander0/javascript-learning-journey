function truthCheck(collection, pre) {
  return collection.reduce((acc, obj) => {
    const isTruthty = !!obj[pre];
    return acc && isTruthty;
  }, true);
}

truthCheck([{name: "Quincy", role: "Founder", isBot: false}, {name: "Naomi", role: "", isBot: false}, {name: "Camperbot", role: "Bot", isBot: true}], "isBot");
