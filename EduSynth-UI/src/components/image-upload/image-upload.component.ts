import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule, MatLabel } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { HttpClient } from "@angular/common/http";
import { UploadedFileModel } from "../../models/uploaded-file-model";
import { environment } from "../../enviroment/enviroment.development";

@Component({
    selector: "app-image-upload",
    standalone: true,
    imports: [MatIconModule, MatInputModule, MatButtonModule, MatLabel],
    templateUrl: "./image-upload.component.html",
    styleUrl: "./image-upload.component.scss"
})
export class ImageUploadComponent {

    @Input()
    public label = "Выберите иконку изображения:";

    @Output() public onFileUploaded = new EventEmitter<string>();

    public fileName: string = "";
    constructor(private http: HttpClient) {}

    public onFileSelected(event: Event): void {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const file: File = fileInput?.files[0];

            if (file) {

                if (file.size > 10485760) { // ограничение до 10 Мб (в байтах)
                    alert("Файл слишком большой. Максимальный размер: 10 Мб");
                    return;
                }

                this.fileName = file.name;

                const formData = new FormData();

                formData.append("image", file);

                const upload = this.http.post<UploadedFileModel>(environment.apiUrl + "/public/upload/image", formData);

                upload.subscribe((result: UploadedFileModel) => {
                    this.onFileUploaded.emit(result.uploadedFileURL);
                });
            }
        }
    }

}
