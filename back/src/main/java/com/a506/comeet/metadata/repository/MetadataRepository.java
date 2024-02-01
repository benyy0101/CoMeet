package com.a506.comeet.metadata.repository;

import com.a506.comeet.metadata.entity.Metadata;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface MetadataRepository extends MongoRepository<Metadata, String>, QuerydslPredicateExecutor<Metadata> {

}
