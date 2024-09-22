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
        "http://smitkhokhariya.online/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const fileUrl = response.data.file_url;

        document.getElementById("status").style.color = "green";
        document.getElementById("status").textContent =
          "File uploaded successfully!";

        // Show the uploaded image
        const uploadedImageContainer = document.getElementById(
          "uploadedImageContainer"
        );
        const uploadedImage = document.getElementById("uploadedImage");
        uploadedImage.src = fileUrl;
        uploadedImageContainer.style.display = "block";
      } else {
        document.getElementById("status").style.color = "red";
        document.getElementById("status").textContent = "File upload failed!";
      }
    } catch (error) {
      document.getElementById("status").style.color = "red";
      document.getElementById("status").textContent = "Error: " + error.message;
    }
  });
