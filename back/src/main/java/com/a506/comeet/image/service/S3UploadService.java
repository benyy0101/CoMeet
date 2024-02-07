package com.a506.comeet.image.service;

import com.a506.comeet.error.errorcode.CommonErrorCode;
import com.a506.comeet.error.exception.RestApiException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3UploadService {

    private final AmazonS3 amazonS3;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String saveFile(MultipartFile multipartFile, String path) throws IOException {
        String originalName = multipartFile.getOriginalFilename();
        String pureFileName = originalName.split("\\.")[0];
        String extension = "." + originalName.split("\\.")[1];
        String filename = pureFileName+LocalDateTime.now() + extension;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, path + filename, multipartFile.getInputStream(), metadata);
        return amazonS3Client.getUrl(bucket, path + filename).toString();
    }

    public void deleteImage(String url, String path)  {
        String key = path + url.split("/")[4];
        log.info("{}", key);
        try{
            amazonS3.deleteObject(bucket, key);
        } catch (AmazonServiceException e){
            throw new RestApiException(CommonErrorCode.INTERNAL_SERVER_ERROR, "파일 삭제 과정에 에러가 발생하였습니다");
        }
    }
}