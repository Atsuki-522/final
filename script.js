function validateInput(name, id, address, weight) {
  const nameRegex = /^[a-zA-Z\s]+$/; // Allow only letters and spaces
  if (!nameRegex.test(name)) return "Invalid recipient name.";
  if (isNaN(id) || id <= 0) return "Invalid package ID.";
  if (!address || /\d/.test(address)) return "Invalid delivery address.";
  if (isNaN(weight) || weight <= 0) return "Invalid weight.";
  return null;
}
function generateTrackingCode(packageId, weight) {
  return (packageId << 4 | weight).toString(2); // Combine packageId and weight
}
function addPackageToTable(package) {
  const tableBody = document.getElementById("packageTable").querySelector("tbody");
  const row = `<tr>
    <td>${package.name}</td>
    <td>${package.id}</td>
    <td>${package.address}</td>
    <td>${package.weight}</td>
    <td>${package.trackingCode}</td>
  </tr>`;
  tableBody.innerHTML += row;
}
document.getElementById("packageForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("recipientName").value;
  const id = parseInt(document.getElementById("packageId").value, 10);
  const address = document.getElementById("deliveryAddress").value;
  const weight = parseFloat(document.getElementById("weight").value);

  const error = validateInput(name, id, address, weight);
  if (error) {
    alert(error);
    return;
  }

  const trackingCode = generateTrackingCode(id, weight);
  addPackageToTable({ name, id, address, weight, trackingCode });
});
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0].weight <= right[0].weight) result.push(left.shift());
    else result.push(right.shift());
  }
  return [...result, ...left, ...right];
}
const sortedPackages = mergeSort(packageArray);
sortedPackages.forEach(addPackageToTable);
