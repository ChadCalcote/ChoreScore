import editChore from "./editChore.js";

const loadChoreInfo = async (id) => {
  // Fetch one chore from API
  const res = await fetch(`/chores/${id.toString()}`);
  const chore = await res.json();

  // Extract info from response
  const choreId = chore.choreId 
  const name = chore.choreName;
  const due = chore.dueDate;
  const list = chore.list;
  const type = chore.type;
  const note = chore.note;
  const point = chore.point;
  const choreTypeId = chore.choreTypeId;
  const typeId = `type-${choreTypeId}`;

  // Select chore info container and clear existing content
  const choreInfoContainer = document.querySelector(".chore-info__container");
  choreInfoContainer.innerHTML = "";

  // Add div for Name
  const nameDiv = document.createElement("div")
  const nameLabel = document.createElement("div")
  const nameInfo = document.createElement("div")
  nameDiv.classList.add("chore__name");
  nameLabel.classList.add("name__label");
  nameInfo.classList.add("name__info");
  nameLabel.innerHTML = "Name";
  nameInfo.innerHTML = name;
  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInfo);

  // Add div for due date
  const dueDiv = document.createElement("div")
  const dueLabel = document.createElement("div")
  const dueInfo = document.createElement("div")
  dueDiv.classList.add("chore__due");
  dueLabel.classList.add("due__label");
  dueInfo.classList.add("due__info");
  dueLabel.innerHTML = "Due";
  dueInfo.innerHTML = due;
  dueDiv.appendChild(dueLabel);
  dueDiv.appendChild(dueInfo);

  // Add div for list
  const listDiv = document.createElement("div")
  const listLabel = document.createElement("div")
  const listInfo = document.createElement("div")
  listDiv.classList.add("chore__list");
  listLabel.classList.add("list__label");
  listInfo.classList.add("list__info");
  listLabel.innerHTML = "List";
  listInfo.innerHTML = list;
  listDiv.appendChild(listLabel);
  listDiv.appendChild(listInfo);

  // Add div for type
  const typeDiv = document.createElement("div")
  const typeLabel = document.createElement("div")
  const typeInfo = document.createElement("div")
  typeDiv.classList.add("chore__type");
  typeLabel.classList.add("type__label");
  typeInfo.classList.add("type__info");
  typeLabel.innerHTML = "Type";
  typeInfo.innerHTML = type;
  typeDiv.appendChild(typeLabel);
  typeDiv.appendChild(typeInfo);

  // Add div for note
  const noteDiv = document.createElement("div")
  const noteLabel = document.createElement("div")
  const noteInfo = document.createElement("div")
  noteDiv.classList.add("chore__note");
  noteLabel.classList.add("note__label");
  noteInfo.classList.add("note__info");
  noteLabel.innerHTML = "Note";
  noteInfo.innerHTML = note;
  noteDiv.appendChild(noteLabel);
  noteDiv.appendChild(noteInfo);

  // Add div for point
  const pointDiv = document.createElement("div")
  const pointLabel = document.createElement("div")
  const pointInfo = document.createElement("div")
  pointDiv.classList.add("chore__point");
  pointLabel.classList.add("point__label");
  pointInfo.classList.add("point__info");
  pointLabel.innerHTML = "Point";
  pointInfo.innerHTML = point;
  pointDiv.appendChild(pointLabel);
  pointDiv.appendChild(pointInfo);

  // Append all info div to container
  choreInfoContainer.appendChild(nameDiv);
  choreInfoContainer.appendChild(dueDiv);
  choreInfoContainer.appendChild(listDiv);
  choreInfoContainer.appendChild(typeDiv);
  choreInfoContainer.appendChild(noteDiv);
  choreInfoContainer.appendChild(pointDiv);

  // Show Edit button
  document.querySelector(".edit-chore__form").reset();
  document.querySelector(".chore-info__edit-container").classList.remove("hidden")

  editChore(choreId, typeId);
}
export default loadChoreInfo;
