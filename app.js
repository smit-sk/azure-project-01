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

    console.log("NO CORS CODE UPDATED");

    try {
      const response = await axios.post(
        "http://52.228.45.138:80/upload",
        formData,
        {
          mode: "no-cors",
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Allow-Origin": "*",
          },
        }
      );

      console.log("NO CORS CODE UPDATED");

      if (response.status === 200) {
        console.log("block of code 200");

        const fileUrl = response.data.file_url;
        console.log("fileurl=" + fileUrl);
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
      console.log("block of error :  " + error);

      document.getElementById("status").style.color = "red";
      document.getElementById("status").textContent = "Error: " + error.message;
    }
  });
