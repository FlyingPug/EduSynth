import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule, MatLabel } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { UploadedFileModel } from "../../models/uploaded-file-model";
import { environment } from "../../enviroment/enviroment.development";
import { ApiClient } from "../../service/api.service";

@Component({
    selector: "app-image-upload",
    standalone: true,
    imports: [MatIconModule, MatInputModule, MatButtonModule, MatLabel],
    templateUrl: "./image-upload.component.html",
    styleUrl: "./image-upload.component.scss"
})
export class ImageUploadComponent {

    @Input() public label = "Выберите иконку изображения:";

    @Output() public onFileUploaded = new EventEmitter<string>();

    private readonly api = inject(ApiClient);

    public fileName: string = "";

    public async onFileSelected(event: Event): Promise<void> {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const file: File = fileInput?.files[0];

            if (!file) {
                return;
            }

            if (file.size > 10485760) { // ограничение до 10 Мб (в байтах)
                alert("Файл слишком большой. Максимальный размер: 10 Мб");
                return;
            }

            this.fileName = file.name;

            const upload = await this.api.postFile("/private/upload/image", file, "image");

            this.onFileUploaded.emit(upload.uploadedFileURL);

        }
    }

}
