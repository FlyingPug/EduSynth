package com.dron.edusynthserver.UploadedFiles.Service;

import com.dron.edusynthserver.Common.Config.EduSynthUrl;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UploadedFilesService
{
    private static final String UPLOAD_DIR = EduSynthUrl.UPLOAD_FILE;

    public String generateUniqueFileName(String originalFileName) {
        String uniqueFileName = UUID.randomUUID().toString();
        return uniqueFileName + getFileExtension(originalFileName);
    }

    public void saveFile(MultipartFile file, String fileName) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        System.out.println(uploadPath.toAbsolutePath());
        Files.write(Paths.get(UPLOAD_DIR + fileName), file.getBytes());
    }

    public Resource loadFile(String fileName) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            throw new FileNotFoundException("File not found: " + fileName);
        }
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.'));
    }
}
