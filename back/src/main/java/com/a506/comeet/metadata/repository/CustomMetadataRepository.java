package com.a506.comeet.metadata.repository;

import java.util.List;

public interface CustomMetadataRepository {
    public List<MetadataDto> findByMemberIdForOneMonth(String memberId);
}
