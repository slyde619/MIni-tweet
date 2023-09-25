const fileInput = document.getElementById("file-input");

const fileInputLabel = document.getElementById("file-input-label");

fileInput.addEventListener("change", () => {
  if (fileInput.value === "") {
    fileInputLabel.innerHTML = "Select file";
  } else {
    const realPathArray = fileInput.value.split("\\");
    fileInputLabel.innerHTML = realPathArray[realPathArray.length - 1];
  }
});
