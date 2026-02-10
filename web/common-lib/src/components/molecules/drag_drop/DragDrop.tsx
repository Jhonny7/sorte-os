import { UtilService } from "./../../../services/UtilService";
import "./dragdrop.scss";
import { useEffect, useState } from "react";
import { useTheme } from "./../../../context/ThemeContext";

export default function ArsaDragDrop({
    types = ["application/pdf"],
    maxSize = 10,
}: {
    types?: Array<string>;
    maxSize?: number;
}) {

    const { theme } = useTheme();

    const [id, setId] = useState(
        `${new Date().getTime().toString()}-${UtilService.getRandomInt(1, 9999)}`
    );

    const [file, setFile] = useState<any>(null);

    useEffect(() => {
        init();
    }, []);

    function init() {
        const dropZone: any = document.getElementById(id);

        // Create hidden file input
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.multiple = true;
        fileInput.style.display = "none";
        fileInput.addEventListener("change", () => handleFiles(fileInput.files));

        // Append file input to main container
        dropZone.appendChild(fileInput);

        dropZone.addEventListener("dragover", (e) => {
            dropZone.style.opacity = "0.7";
            e.preventDefault();
            dropZone.classList.add("dragged-over");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.style.opacity = "1";
            dropZone.classList.remove("dragged-over");
        });

        dropZone.addEventListener("drop", (e) => {
            dropZone.style.opacity = "1";
            e.preventDefault();
            dropZone.classList.remove("dragged-over");
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        // Trigger file input on click
        dropZone.addEventListener("click", () => {
            fileInput.click();
        });
    }

    function handleFiles(files) {
        let findType: any = types.filter((type) => type == files[0].type);

        let sizeInMB = files[0].size / (1024 * 1024);

        if (findType && findType.length > 0) {
            if (sizeInMB < maxSize) {
                setFile(files[0]);
            } else {
                alert("File denegate size");
            }
        } else {
            alert("File denegate");
            //Alert
        }
    }

    return (
        <section className="dragdrop" id={id}>
            <span
                className="material-icons outlined"
                style={{
                    color: theme.color && theme.color?.length > 0 ? theme.color : '',
                }}
            >
                download
            </span>
            <p className="drag-title">
                Drag and drop your file here, or click to upload a file
            </p>
            {file ? (
                <p>{file.name}</p>
            ) : (
                <p>Upload a .pdf file that's up to {maxSize}MB</p>
            )}
        </section>
    );
}
