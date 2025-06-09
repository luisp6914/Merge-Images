//Displaying image 1 
const dropArea1 = document.getElementById("drop-area-1");
const inputFile1 = document.getElementById("input-file-1");
const imageView1 = document.getElementById("image-view-1");

//Tracking files 
let firstImage = null;
let secondImage = null;

inputFile1.addEventListener("change", uploadImage1);

function uploadImage1(){
    const file = inputFile1.files[0];
    if(file){
        firstImage = file;
        let imgLink = URL.createObjectURL(file);
        imageView1.style.backgroundImage = `url(${imgLink})`;
        imageView1.textContent = "";
        imageView1.style.border = 0;
        imageView1.style.backgroundColor = "transparent";
        mergeFiles();
    }
    
}

dropArea1.addEventListener("dragover", function(e){
    e.preventDefault();
});
dropArea1.addEventListener("drop", function(e){
    e.preventDefault();
    inputFile1.files = e.dataTransfer.files;
    uploadImage1();
});


//Display Image 2
const dropArea2 = document.getElementById("drop-area-2");
const inputFile2 = document.getElementById("input-file-2");
const imageView2 = document.getElementById("image-view-2");


inputFile2.addEventListener("change", uploadImage2);

function uploadImage2(){
    const file = inputFile2.files[0];

    if(file){
        secondImage = file;
        let imgLink = URL.createObjectURL(file);
        imageView2.style.backgroundImage = `url(${imgLink})`;
        imageView2.style.border = 0;
        imageView2.textContent = "";
        imageView2.style.backgroundColor = "transparent";

        mergeFiles();
    }
    

}

dropArea2.addEventListener("dragover", function(e){
    e.preventDefault();
});
dropArea2.addEventListener("drop", function(e){
    e.preventDefault();
    inputFile2.files = e.dataTransfer.files;
    uploadImage2();
});


function mergeFiles(){
    if(firstImage === null || secondImage === null ){
        console.log("Still missing one image");
        return;
    }

    console.log("Both images are loaded")
    const img1 = new Image();
    const img2 = new Image();

    img1.onload = () => {
        console.log("Image 1 was loaded")
        img2.onload = () => {
            console.log("Image 2 was loaded")
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = Math.max(img1.width, img2.width);
            canvas.height = img1.height + img2.height;

            ctx.drawImage(img1, 0, 0);
            ctx.drawImage(img2, 0, img1.height);

            displayMergedImage(canvas);
        }
        img2.src = URL.createObjectURL(secondImage);
    };

    img1.src = URL.createObjectURL(firstImage);
    
}


function displayMergedImage(canvas){
    console.log("Displaying merged image");
    //Creating Div
    const outPutDiv = document.createElement("div");
    outPutDiv.id = "canvas-container";

    //Creating heading
    const outPutH2 = document.createElement("h2");
    outPutH2.textContent = "Merged Image";

    //Adding H1 and canvas to new div
    outPutDiv.appendChild(outPutH2);
    outPutDiv.appendChild(canvas);

    document.body.appendChild(outPutDiv)

}





