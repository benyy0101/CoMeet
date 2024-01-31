package com.a506.comeet.app.metadata.repository;

import com.a506.comeet.app.metadata.entity.Metadata;

import java.util.List;

public interface CustomMetadataRepository {
    public List<MetadataDto> findByMemberIdForOneMonth(String memberId);
}
