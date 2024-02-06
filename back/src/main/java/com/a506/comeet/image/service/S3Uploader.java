package com.a506.comeet.image.service;

import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public String upload(String memberId, File uploadFile, String filePath) {
        String fileName = filePath + "/" + memberId +  uploadFile.getName(); // S3에 저장된 파일 이름
        String uploadImageUrl = putS3(uploadFile, fileName); // S3로 업로드
        log.info("uploadImageUrl = " + uploadImageUrl);
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    private String putS3(File uploadFile, String fileName) {
        log.info("fileName : {}", fileName);
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead)    // PublicRead 권한으로 업로드 됨
        );
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    public String uploadFiles(String memberId, MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(memberId, multipartFile).get();
//                .orElseThrow(() -> new IllegalArgumentException("Error: MultipartFile -> File로 전환이 실패했습니다."));
        return upload(memberId, uploadFile, dirName);
    }

    private Optional<File> convert(String memberId, MultipartFile file) throws IOException {
        File convertFile =  new File(Objects.requireNonNull(file.getOriginalFilename()));
        log.info("convertFile : {}", convertFile.getName());
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            } catch (IOException e){
                throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR, "IOEXCEPTION");
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("로컬의 파일이 삭제되었습니다.");
        } else {
            log.info("로컬의 파일이 삭제되지 못했습니다.");
        }
    }

    public void delete(String originalProfileImage){
        try{
            log.info("삭제될 originalProfileImage : {}", originalProfileImage);
            String key = originalProfileImage.substring(56); // 폴더/파일.확장자
            log.info("삭제될 profileImage key : {}", key);
            try {
                amazonS3Client.deleteObject(bucket, key);
            } catch (AmazonServiceException e) {
                log.info(e.getErrorMessage());
            }

        } catch (Exception exception) {
            log.info(exception.getMessage());
        }
    }
}
