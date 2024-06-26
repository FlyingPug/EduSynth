package com.dron.edusynthserver.uploadedFiles.controller;

import com.dron.edusynthserver.config.EduSynthUrl;
import com.dron.edusynthserver.uploadedFiles.dto.UploadedFileDto;
import com.dron.edusynthserver.uploadedFiles.service.UploadedFilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping(EduSynthUrl.UPLOAD)
public class UploadedFilesController
{
    private final UploadedFilesService uploadedFilesService;

    @Autowired
    public UploadedFilesController(UploadedFilesService uploadedFilesService) {
        this.uploadedFilesService = uploadedFilesService;
    }

    @PostMapping("/image")
    public ResponseEntity<UploadedFileDto> uploadFile(@RequestParam("image") MultipartFile file) {
        try {
            String uniqueFileName = uploadedFilesService.generateUniqueFileName(file.getOriginalFilename());
            uploadedFilesService.saveFile(file, uniqueFileName);

            String fileUrl = EduSynthUrl.UPLOAD + uniqueFileName;
            return ResponseEntity.status(HttpStatus.OK).body(new UploadedFileDto(fileUrl));

        } catch (IOException e) {
            throw new InternalError(e.getMessage());
        }
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getResource(@PathVariable String fileName) {
        try {
            Resource file = uploadedFilesService.loadFile(fileName);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
