package com.a506.comeet.app.metadata.repository;

import com.a506.comeet.app.metadata.entity.Metadata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetadataRepository extends JpaRepository<Metadata, Long>, CustomMetadataRepository {
}
