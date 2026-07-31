export const checkItem = {
  add(checkItems) {
    checkItems.classList.remove("display-none");

    const checkItem = document.createElement("li"),
      checkbox = document.createElement("input"),
      labelInput = document.createElement("input"),
      deleteButton = document.createElement("button");

    checkItem.classList.add(
      "check-item",
      "flex",
      "align-items-center",
      "standard-gap",
    );
    labelInput.classList.add("check-item-label");
    deleteButton.classList.add("button", "remove-check-item-button");

    checkItem.dataset.ui = "check-item";
    checkbox.type = "checkbox";
    checkbox.name = "isChecked";
    labelInput.type = "text";
    labelInput.name = "checkItem";
    labelInput.required = true;
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "remove-check-item";

    checkItem.append(checkbox, labelInput, deleteButton);

    checkItems.append(checkItem);

    return checkItem;
  },
};
