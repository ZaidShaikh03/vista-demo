export function getHouseNumber(apartmentNum, currentFloor, floornumberdata) {
  // Find the apartment data based on apartmentNum
  // console.log("wing Hellofloornumberdata", floornumberdata);
  const apartment = floornumberdata?.find(
    (apartment) => apartment?.apartmentNum === apartmentNum
  );

  if (!apartment) {
    return `${apartmentNum}`;
  }

  // Get the wing letter from the type (e.g., "winga" => "A")
  const wing = wingType?.replace("wing", "")?.toLowerCase();
  // console.log("wing Hello", wing, apartment?.type, apartment);

  // Format the floor and apartmentNum into 2-digit values
  const floorString = String(currentFloor)?.padStart(2, "0");
  const apartmentNumString = String(apartmentNum)?.padStart(2, "0");

  // Construct and return the house number
  return `${wing?.toUpperCase()}${floorString}${apartmentNumString}`;
}
