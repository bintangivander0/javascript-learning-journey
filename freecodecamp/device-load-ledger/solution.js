const equipmentLedger = {
  "1": { type: "PC", status: "CheckedOut", borrower: { name: "John Smith", email: "john@acme.org" }, dueDate: "11/30/2025" },
  "2": { type: "Laptop", status: "CheckedIn", borrower: { name: "", email: "" }, dueDate: "" },
  "3": { type: "Laptop", status: "CheckedOut", borrower: { name: "Jane Doe", email: "jane@acme.org" }, dueDate: "10/31/2025" },
  "4": { type: "iPad", status: "CheckedIn", borrower: { name: "", email: "" }, dueDate: "" }
};

function checkoutDevice(ledger, assetTag, borrower) {
  const device = ledger[assetTag];
  if (!device) {
    return {
      ledger: ledger,
      message: `Asset tag ${assetTag} was not found`
    };
  }
  if (device.status === "CheckedOut") {
    return {
      ledger: ledger,
      message: `Asset tag ${assetTag} is already checked out`
    };
  }
  const updatedLedger = {...ledger}
  const updatedDevice = {
    ...device,
    borrower: {
      ...device.borrower
    }
  };
  updatedDevice.status = "CheckedOut";
  updatedDevice.borrower.name = borrower.name;
  updatedDevice.borrower.email = borrower.email;
  updatedLedger[assetTag] = updatedDevice;
  return {
    ledger: updatedLedger,
    message: `Asset tag ${assetTag} checked out to ${borrower.name}`
  };
}

function checkinDevice(ledger, assetTag) {
  const device = ledger[assetTag];
  if (!device) {
    return {
      ledger: ledger,
      message: `Asset tag ${assetTag} was not found`
    };
  }
  const updatedLedger = {...ledger};
  const updatedDevice = {
    ...device,
    borrower: {
      ...device.borrower
    }
  };
  updatedDevice.borrower.name = "";
  updatedDevice.borrower.email = "";
  updatedDevice.dueDate = "";
  updatedDevice.status = "CheckedIn";
  updatedLedger[assetTag] = updatedDevice;
  return {
    ledger: updatedLedger,
    message: `Asset tag ${assetTag} checked in`
  }
}

function parseDate(dateString) {
  return dateString.split("/").map(Number);
}

function dateToNumber(dateString) {
  const [month, day, year] = parseDate(dateString);
  return (year * 10000) + (month * 100) + day;
}

function listOverdueDevices(ledger, today) {
  const devices = Object.values(ledger);
  console.log(devices);

  const overdueDevices = devices.filter((device) => {
    return (
      device.status === "CheckedOut" && dateToNumber(device.dueDate) < dateToNumber(today)
    );
  });

  overdueDevices.sort((a, b) => {
    return dateToNumber(a.dueDate) - dateToNumber(b.dueDate);
  });
  
  return overdueDevices;
}

console.log(listOverdueDevices(equipmentLedger, "12/5/2025"));

function serializeLedger(ledger) {
  return JSON.stringify(ledger);
}

function loadLedger(json) {
  return JSON.parse(json);
} 
