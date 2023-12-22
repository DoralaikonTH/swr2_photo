/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}



const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");

// form click event
form.addEventListener("click", () => {
  fileInput.click();
});



// file input change event
fileInput.addEventListener("change", ({ target }) => {
  let file = target.files[0];
  if (file && file.type.startsWith('image/')) {
    let fileName = file.name;
    if (fileName.length >= 12) {
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(file, fileName);
  } else {
    // Use SweetAlert to show a modal instead of the alert
    Swal.fire({
      icon: 'error',
      title: 'การเลือกไฟล์ไม่ถูกต้อง',
      html: 'โปรดเลือกไฟล์ภาพที่ถูกต้อง.',
      customClass: {
        popup: 'swal-mobile-size',
        title: 'swal-mobile-title',
        html: 'swal-mobile-html',
     },
    });
    // You can also update the UI to inform the user about the invalid file selection.
  }
});

// file upload function
async function uploadFile(file, name) {
  const maxFileSizeMB = 10;
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

  if (file.size > maxFileSizeBytes) {
    Swal.fire({
      icon: 'error',
      title: 'ขนาดไฟล์เกินขีดจำกัด',
      html: `ไฟล์ ${name} <br> มีขนาดเกิน ${maxFileSizeMB} MB ที่กำหนด`,
      customClass: {
        popup: 'swal-mobile-size',
        title: 'swal-mobile-title',
        html: 'swal-mobile-html',
     },
    });
    return; // Abort the upload process
  }

  
  const cloudName = 'dfmd2icqt'; // replace with your Cloudinary cloud name
  const unsignedUploadPreset = 'swr2_photo'; // replace with your unsigned upload preset

  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedUploadPreset);

  try {
    let response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      let responseData = await response.json();
      console.log("Upload successful:", responseData);
      updateUI(name, responseData);
    } else {
      console.error("Upload failed:", response.statusText);
      handleUploadFailure(name);
    }
  } catch (error) {
    console.error("Error during upload:", error);
    handleUploadFailure(name);
  }
}


function updateUI(name, responseData) {
  const fileLoaded = 100;
  const fileSize = (responseData.bytes / (1024 * 1024)).toFixed(2) + " MB";

  const progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • อัปโหลดเสร็จสิ้น</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;

  uploadedArea.classList.add("onprogress");
  progressArea.innerHTML = progressHTML;

  const uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • อัปโหลดเสร็จสิ้น</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;

  progressArea.innerHTML = "";
  uploadedArea.classList.remove("onprogress");
  uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
}

function handleUploadFailure(name) {
  const fileLoaded = 0;

  const progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • อัปโหลดล้มเหลว</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;

  uploadedArea.classList.add("onprogress");
  progressArea.innerHTML = progressHTML;
}

// Add a style element to the head with the specified media query styles
function addMediaQueryStyles() {
  const styles = `
    @media (max-width: 344px) {
      .swal-mobile-size {
        width: 100% !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .swal-mobile-title {
        font-size: 25px !important;
      }
      .swal-mobile-html {
        font-size: 20px !important;
      }
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(styles));

  document.head.appendChild(styleElement);
}

// Call the function to add styles when needed
addMediaQueryStyles();

