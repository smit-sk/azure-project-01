document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const projectName = document.getElementById("projectName").value;
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    if (!file) {
      document.getElementById("status").textContent = "Please select a file.";
      return;
    }

    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://52.233.22.115:80/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        document.getElementById("status").style.color = "green";
        document.getElementById("status").textContent =
          "File uploaded successfully!";

        // // Update the file list on the UI
        // const fileList = response.data.files;
        // updateFileList(fileList);
      } else {
        document.getElementById("status").style.color = "red";
        document.getElementById("status").textContent = "File upload failed!";
      }
    } catch (error) {
      document.getElementById("status").style.color = "red";
      document.getElementById("status").textContent = "Error: " + error.message;
    }
  });

// // Function to update file list and add delete button
// function updateFileList(files) {
//   const fileListContainer = document.getElementById("uploadedFilesList");
//   fileListContainer.innerHTML = ""; // Clear any existing entries

//   files.forEach((file) => {
//     const listItem = document.createElement("li");

//     const link = document.createElement("a");
//     link.href = file.url;
//     link.textContent = file.name;
//     link.target = "_blank"; // Open in new tab
//     listItem.appendChild(link);

//     // Add delete button
//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.style.marginLeft = "10px";
//     deleteButton.addEventListener("click", () => deleteFile(file.name));

//     listItem.appendChild(deleteButton);
//     fileListContainer.appendChild(listItem);
//   });
// }

// // Function to handle file deletion
// async function deleteFile(fileName) {
//   try {
//     const response = await axios.delete(
//       `http://192.168.2.103:5050/delete/${fileName}`
//     );

//     if (response.status === 200) {
//       document.getElementById("status").style.color = "green";
//       document.getElementById("status").textContent =
//         "File deleted successfully!";

//       // Update the file list on the UI by removing the deleted file
//       const fileList = response.data.files;
//       updateFileList(fileList); // Re-fetch the updated list from the server
//     } else {
//       document.getElementById("status").style.color = "red";
//       document.getElementById("status").textContent = "File deletion failed!";
//     }
//   } catch (error) {
//     document.getElementById("status").style.color = "red";
//     document.getElementById("status").textContent = "Error: " + error.message;
//   }
// }
